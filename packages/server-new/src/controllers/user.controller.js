import { body, validationResult } from 'express-validator';

import { User, NFT, sequelize } from '../database/models';
import { authService } from '../services';
import { decryptRSA, encryptRSA } from '../utils';
import { errorCodes, errorMessages } from '../constants/errors';
import { userValidation } from '../validations';
import instagramClient from '../utils/instagram';
import moment from 'moment';
import { QueryTypes, Op } from 'sequelize';
// import cacheService from '../services/cache.service';

export const userController = () => {
  const signUp = async (req, res, next) => {
    try {
      // throw an error when validation failed
      validationResult(req).throw();

      // let { username, email, password, fullName } = req.body;
      let { email, password } = req.body;
      let encryptedPassword = encryptRSA(password);

      email = email.toLowerCase();
      let oldUser = await User.findOne({ where: { email } });
      if (oldUser) {
        const error = new Error(errorMessages.EMAIL_IN_USE);
        error.status = errorCodes.INPUT_VALIDATION_FAILED;
        throw error;
      }

      const user = await User.create({
        email: email,
        password: encryptedPassword
      });

      // const userObj = await authService().addTokensToUser(user);
      // delete userObj.encryptedPassword;
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  };

  const login = async (req, res, next) => {
    try {
      // throw an error when validation failed
      validationResult(req).throw();

      let { email, password } = req.body;
      email = email.toLowerCase();

      const user = await User.findOne({
        where: { email },
      });

      console.log('user login: ', user);

      if (!user) {
        const err = new Error(errorMessages.INCORRECT_EMAIL);
        err.status = errorCodes.AUTH_FAILED;
        throw err;
      }

      if (password !== decryptRSA(user.password)) {
        const err = new Error(errorMessages.INCORRECT_PASSWORD);
        err.status = errorCodes.AUTH_FAILED;
        throw err;
      }
      const accessToken = authService().issue({ userId: user.id });
      const refreshToken = await authService().generateRefreshToken({ userId: user.id });
      const userObj = user.toJSON();
      delete userObj.password;
      userObj.accessToken = accessToken;
      userObj.refreshToken = refreshToken.token;
      res.status(200).json({ success: true, data: userObj });
    } catch (err) {
      next(err);
    }
  };

  const loginUsername = async (req, res, next) => {
    try {
      // throw an error when validation failed
      validationResult(req).throw();

      const { username, accessToken } = req.body;
      const user = await User.findOne({
        where: { username },
      });

      console.log('user login: ', user);

      if (!user) {
        const err = new Error(errorMessages.INCORRECT_USERNAME);
        err.status = errorCodes.AUTH_FAILED;
        throw err;
      }

      if (accessToken) {
        user.instaAccessToken = accessToken;
        await user.save();
      }

      const userObj = await authService().addTokensToUser(user);
      delete userObj.encryptedPassword;
      res.status(200).json({ success: true, data: userObj });
    } catch (err) {
      next(err);
    }
  };
  const refreshAccess = async (req, res) => {
    try {
      // throw an error when validation failed
      validationResult(req).throw();

      const { refreshToken } = req.body;
      const data = await authService().issueFromRefreshToken(refreshToken);
      res.status(200).json({ success: true, data });
    } catch (err) {
      res.status(401).json({ error: { code: 401, ...err }, success: false });
    }
  };

  const updateProfile = async (req, res, next) => {
    try {
      // throw an error when validation failed
      validationResult(req).throw();

      const { userId } = req.token;
      const { fullName, email, password } = req.body;

      // save user account details
      let user = await User.findOne({
        where: { id: userId },
      });
      if (!user) {
        const error = new Error(errorMessages.INVALID_CREDENTIALS);
        error.status = errorCodes.AUTH_FAILED;
        throw error;
      }

      if (fullName) user.fullName = fullName;
      if (email) {
        const oldUser = await User.findOne({ where: { email } });
        if (oldUser && oldUser.id !== user.id) {
          const error = new Error(errorMessages.EMAIL_IN_USE);
          error.status = errorCodes.BAD_REQUEST;
          throw error;
        }
        user.email = email;
      }
      if (password) user.encryptedPassword = password;
      await user.save();

      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  };





  const requestForgotPassword = async (req, res, next) => {
    try {
      validationResult(req).throw();
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        const err = new Error(errorMessages.USER_NOT_FOUND);
        err.status = errorCodes.NOT_FOUND;
        throw err;
      }
      authService().sendForgotPasswordEmail(user);
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  const submitForgotPassword = async (req, res, next) => {
    try {
      // throw an error when validation failed
      validationResult(req).throw();

      const { password, token } = req.body;

      const decode = authService().verify(token);
      const user = await User.findOne({ where: { email: decode.email } });
      if (!user) {
        const err = new Error(errorMessages.USER_NOT_FOUND);
        err.status = errorCodes.NOT_FOUND;
        throw err;
      }

      user.encryptedPassword = password;
      await user.save();

      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  // TODO: update it for admin panel
  const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await User.destroy({ where: { id } });

      res.status(200).json({ result });
    } catch (err) {
      next(err);
    }
  };

  const validate = (method) => {
    switch (method) {
      case 'signup': {
        return [
          body('email').exists().withMessage(errorMessages.EMAIL_REQUIRED).isEmail(),
        ];
      }
      case 'login': {
        return [
          body('email')
            .exists()
            .withMessage(errorMessages.EMAIL_REQUIRED)
            .isEmail()
            .withMessage(errorMessages.EMAIL_INVALID),
          body('password').exists().withMessage(errorMessages.PASSWORD_REQUIRED),
        ];
      }
      case 'login-username': {
        return [body('username', errorMessages.USERNAME_REQUIRED).exists()];
      }
      case 'refresh-access': {
        return [body('refreshToken').exists().withMessage(errorMessages.REFRESH_TOKEN_REQUIRED)];
      }
      case 'update-profile': {
        return [
          body('phone').optional().custom(userValidation().checkPhoneNumber),
          body('addConnectedEmails.*').optional().isEmail().withMessage(errorMessages.PERSONAL_EMAIL_INVALID),
        ];
      }
      case 'request-forgot-password': {
        return [
          body('email')
            .exists()
            .withMessage(errorMessages.EMAIL_REQUIRED)
            .isEmail()
            .withMessage(errorMessages.EMAIL_INVALID),
        ];
      }
      case 'submit-forgot-password': {
        return [
          body('password').exists().withMessage(errorMessages.PASSWORD_REQUIRED).custom(userValidation().checkPassword),
          body('passwordConfirmation')
            .exists()
            .withMessage(errorMessages.PW_CONFIRMATION_REQUIRED)
            .custom((value, { req }) => userValidation().checkPasswordConfirmation(req.body.password, value)),
        ];
      }
      default:
        return null;
    }
  };

  const updateUser = async (req, res, next) => {

    try {
      const userInfo = req.body;

      const access_token = req.header('authorization');
      // const header_token = userInfo.authorization;
      console.log(access_token);
      const decode = authService().verify(access_token);
      const user = await User.findOne({ where: { id: decode.userId } });

      const data = await User.update(
        {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          phoneNumber: userInfo.phoneNumber,
          publicName: userInfo.publicName
        },
        {
          where: { id: user.id }
        }
      );
      const updatedData = await User.findOne(
        {
          where: { id: user.id }
        }
      );
      if (res.status(200).json({ success: true, updatedData })) {
      }
    } catch (err) {
      console.log(err);
    }

  };
  const cacheMiddleware = {
    getProfile: (req, res, next) => {
      const { userId } = req.token;
      res.express_redis_cache_name = `profile-${userId}`;
      res.contentType('application/json');
      next();
    },
    deleteProfile: (req, res, next) => {
      const { userId } = req.token;
      // cacheService.del(`profile-${userId}`);
      next();
    },
    getProfileByUserName: (req, res, next) => {
      const { username } = req.body;
      res.express_redis_cache_name = `profileByUsername-${username}`;
      next();
    },
    deleteProfileByUserName: (req, res, next) => {
      const { username } = req.body;
      // cacheService.delete(`profileByUsername-${username}`);
      next();
    },
  };

  return {
    signUp,
    login,
    updateUser,
    refreshAccess,
    updateProfile,
    requestForgotPassword,
    submitForgotPassword,
    deleteUser,
    validate,
    loginUsername,
    cacheMiddleware,
  };
};
