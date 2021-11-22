import jwt from 'jsonwebtoken';
import moment from 'moment';

import { RefreshToken } from '../database/models';
import { errorCodes, errorMessages } from '../constants/errors';
import { jwtEncryption, jwtExpiration, refreshEncryption, refreshExpiration, noReplySender, webURL } from '../settings';
import { emailService } from './email.service';
import { generateEmailTemplate } from '../utils/ejsHelper';

export const authService = () => {
  const issue = (payload) =>
    jwt.sign(payload, jwtEncryption, { algorithm: 'HS256', expiresIn: parseInt(jwtExpiration, 0) });

  const verify = (token, cb) => jwt.verify(token, jwtEncryption, { algorithm: ['HS256'] }, cb);

  const generateRefreshToken = async (payload) => {
    const { userId } = payload;
    const previousTokenObj = await RefreshToken.findOne({ where: { userId } });
    if (previousTokenObj) {
      // remove previous refreshToken
      previousTokenObj.destroy();
    }

    const token = jwt.sign(payload, refreshEncryption, {
      algorithm: 'HS256',
      expiresIn: parseInt(refreshExpiration, 0),
    });

    const expiresAt = moment().add(refreshExpiration, 'seconds').toDate();
    const refreshTokenObj = {
      userId,
      token,
      expiresAt,
    };

    return RefreshToken.create(refreshTokenObj);
  };

  const issueFromRefreshToken = async (refreshToken, cb) => {
    const { userId } = jwt.verify(refreshToken, refreshEncryption, { algorithm: ['HS256'] }, cb);
    const previousTokenObj = await RefreshToken.findOne({ where: { userId } });
    if (previousTokenObj) {
      const accessToken = issue({ userId });
      // renew refresh token
      const refreshTokenObj = await generateRefreshToken({ userId });
      return { accessToken, refreshToken: refreshTokenObj.token };
    }
    const err = new Error(errorMessages.INVALID_REFRESH_TOKEN);
    err.code = errorCodes.INVALID_REFRESH_TOKEN;
    throw err;
  };

  const addTokensToUser = async (user) => {
    // Generate an access token
    const accessToken = issue({ userId: user.id });
    // Generate refresh token
    const refreshTokenObj = await generateRefreshToken({ userId: user.id });

    const userObj = user.toJSON();
    userObj.accessToken = accessToken;
    userObj.refreshToken = refreshTokenObj.token;
    return userObj;
  };

  const sendForgotPasswordEmail = async (user) => {
    const verifyToken = issue({email: user.email});
    const forgotPasswordURL = `${webURL}/forgot-password/${verifyToken}`;
    const data = {
      email: user.email,
      forgotPasswordURL: forgotPasswordURL
    }
    const result = await generateEmailTemplate('forgotPassword.ejs', data);
    if (result.status) {
      const msg = {
        to: user.email,
        from: process.env.SENDGRID_FROM,
        subject: 'Reset Password',
        html: result.message
      };
      emailService().sendEmail(msg);
    } else {
      const err = new Error(errorMessages.UNKNOWN_ERROR);
      err.status = errorCodes.UNKNOWN_ERROR;
      throw err;
    }
  };

  return { 
    issue, 
    issueFromRefreshToken, 
    verify, 
    generateRefreshToken, 
    addTokensToUser,
    sendForgotPasswordEmail,
  };
};
