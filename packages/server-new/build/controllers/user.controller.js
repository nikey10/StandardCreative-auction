"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressValidator = require("express-validator");

var _models = require("../database/models");

var _services = require("../services");

var _utils = require("../utils");

var _errors = require("../constants/errors");

var _validations = require("../validations");

var _instagram = _interopRequireDefault(require("../utils/instagram"));

var _moment = _interopRequireDefault(require("moment"));

var _sequelize = require("sequelize");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var userController = function userController() {
  var signUp = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var _req$body, username, email, password, fullName, oldUser, error, _error, user, userObj;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              // throw an error when validation failed
              (0, _expressValidator.validationResult)(req)["throw"]();
              _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, fullName = _req$body.fullName;
              _context.next = 5;
              return _models.User.findOne({
                where: {
                  email: email
                }
              });

            case 5:
              oldUser = _context.sent;

              if (!oldUser) {
                _context.next = 10;
                break;
              }

              error = new Error(_errors.errorMessages.EMAIL_IN_USE);
              error.status = _errors.errorCodes.INPUT_VALIDATION_FAILED;
              throw error;

            case 10:
              _context.next = 12;
              return _models.User.findOne({
                where: {
                  username: username
                }
              });

            case 12:
              oldUser = _context.sent;

              if (!oldUser) {
                _context.next = 17;
                break;
              }

              _error = new Error(_errors.errorMessages.USERNAME_IN_USE);
              _error.status = _errors.errorCodes.INPUT_VALIDATION_FAILED;
              throw _error;

            case 17:
              _context.next = 19;
              return _models.User.create({
                username: username,
                email: email,
                fullName: fullName,
                encryptedPassword: password
              });

            case 19:
              user = _context.sent;
              _context.next = 22;
              return (0, _services.authService)().addTokensToUser(user);

            case 22:
              userObj = _context.sent;
              delete userObj.encryptedPassword;
              res.status(200).json({
                success: true,
                data: userObj
              });
              _context.next = 30;
              break;

            case 27:
              _context.prev = 27;
              _context.t0 = _context["catch"](0);
              next(_context.t0);

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 27]]);
    }));

    return function signUp(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  var loginInstagram = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
      var _req$body2, code, redirect_uri, accessTokenResult, usernameResult, username, _yield$instagramClien, success, data, error, user, instagramUser, _userObj, userObj;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              (0, _expressValidator.validationResult)(req)["throw"]();
              _req$body2 = req.body, code = _req$body2.code, redirect_uri = _req$body2.redirect_uri;
              _context2.next = 5;
              return _instagram["default"].getAccessToken(code, redirect_uri);

            case 5:
              accessTokenResult = _context2.sent;

              if (!accessTokenResult.success) {
                _context2.next = 59;
                break;
              }

              // if user login status, save instagram token to user record
              console.log(accessTokenResult);
              _context2.next = 10;
              return _instagram["default"].getUsername(accessTokenResult.data.access_token);

            case 10:
              usernameResult = _context2.sent;

              if (!usernameResult.success) {
                _context2.next = 56;
                break;
              }

              username = usernameResult.data.username;
              _context2.next = 15;
              return _instagram["default"].getUserInfoRapid(username);

            case 15:
              _yield$instagramClien = _context2.sent;
              success = _yield$instagramClien.success;
              data = _yield$instagramClien.data;
              error = _yield$instagramClien.error;

              if (!success) {
                _context2.next = 53;
                break;
              }

              _context2.next = 22;
              return _models.InstagramUser.findOne({
                where: {
                  username: data.username
                }
              });

            case 22:
              instagramUser = _context2.sent;

              if (!instagramUser) {
                _context2.next = 40;
                break;
              }

              _context2.next = 26;
              return _models.User.findOne({
                where: {
                  instagramUserId: instagramUser.id
                },
                include: [{
                  model: _models.InstagramUser,
                  required: false,
                  as: 'instagramUser'
                }]
              });

            case 26:
              user = _context2.sent;

              if (!user) {
                _context2.next = 35;
                break;
              }

              _context2.next = 30;
              return (0, _services.authService)().addTokensToUser(user);

            case 30:
              _userObj = _context2.sent;
              delete _userObj.encryptedPassword;
              res.status(200).json({
                success: true,
                data: _userObj
              });
              _context2.next = 38;
              break;

            case 35:
              _context2.next = 37;
              return _models.User.create({
                username: data.username,
                instagramUserId: instagramUser.id
              });

            case 37:
              user = _context2.sent;

            case 38:
              _context2.next = 46;
              break;

            case 40:
              _context2.next = 42;
              return _models.InstagramUser.create({
                username: data.username,
                fullName: data.full_name,
                avatar: data.profile_pic_url,
                bio: data.biography,
                follows: data.edge_follow.count,
                followings: data.edge_followed_by.count,
                posts: data.edge_owner_to_timeline_media.count
              });

            case 42:
              instagramUser = _context2.sent;
              _context2.next = 45;
              return _models.User.create({
                username: data.username,
                instagramUserId: instagramUser.id
              });

            case 45:
              user = _context2.sent;

            case 46:
              _context2.next = 48;
              return (0, _services.authService)().addTokensToUser(user);

            case 48:
              userObj = _context2.sent;
              delete userObj.encryptedPassword;
              res.status(200).json({
                success: true,
                data: userObj
              });
              _context2.next = 54;
              break;

            case 53:
              res.status(500).json({
                success: false,
                error: error
              });

            case 54:
              _context2.next = 57;
              break;

            case 56:
              res.status(500).json(usernameResult);

            case 57:
              _context2.next = 60;
              break;

            case 59:
              res.status(500).json(accessTokenResult);

            case 60:
              _context2.next = 65;
              break;

            case 62:
              _context2.prev = 62;
              _context2.t0 = _context2["catch"](0);
              next(_context2.t0);

            case 65:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 62]]);
    }));

    return function loginInstagram(_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }();

  var login = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
      var _req$body3, email, password, user, err, decryptedPassword, _err, userObj;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              // throw an error when validation failed
              (0, _expressValidator.validationResult)(req)["throw"]();
              _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;
              _context3.next = 5;
              return _models.User.findOne({
                where: {
                  email: email
                },
                include: [{
                  model: _models.InstagramUser,
                  required: false,
                  as: 'instagramUser'
                }]
              });

            case 5:
              user = _context3.sent;
              console.log("user login: ", user);

              if (user) {
                _context3.next = 11;
                break;
              }

              err = new Error(_errors.errorMessages.INCORRECT_EMAIL);
              err.status = _errors.errorCodes.AUTH_FAILED;
              throw err;

            case 11:
              decryptedPassword = (0, _utils.decryptRSA)(password);
              console.log("login decrypted password: ", decryptedPassword);

              if (!(decryptedPassword !== (0, _utils.decryptRSA)(user.encryptedPassword))) {
                _context3.next = 17;
                break;
              }

              _err = new Error(_errors.errorMessages.INCORRECT_PASSWORD);
              _err.status = _errors.errorCodes.AUTH_FAILED;
              throw _err;

            case 17:
              _context3.next = 19;
              return (0, _services.authService)().addTokensToUser(user);

            case 19:
              userObj = _context3.sent;
              delete userObj.encryptedPassword;
              res.status(200).json({
                success: true,
                data: userObj
              });
              _context3.next = 27;
              break;

            case 24:
              _context3.prev = 24;
              _context3.t0 = _context3["catch"](0);
              next(_context3.t0);

            case 27:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 24]]);
    }));

    return function login(_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }();

  var loginUsername = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
      var _req$body4, username, accessToken, user, err, userObj;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              // throw an error when validation failed
              (0, _expressValidator.validationResult)(req)["throw"]();
              _req$body4 = req.body, username = _req$body4.username, accessToken = _req$body4.accessToken;
              _context4.next = 5;
              return _models.User.findOne({
                where: {
                  username: username
                }
              });

            case 5:
              user = _context4.sent;
              console.log("user login: ", user);

              if (user) {
                _context4.next = 11;
                break;
              }

              err = new Error(_errors.errorMessages.INCORRECT_USERNAME);
              err.status = _errors.errorCodes.AUTH_FAILED;
              throw err;

            case 11:
              if (!accessToken) {
                _context4.next = 15;
                break;
              }

              user.instaAccessToken = accessToken;
              _context4.next = 15;
              return user.save();

            case 15:
              _context4.next = 17;
              return (0, _services.authService)().addTokensToUser(user);

            case 17:
              userObj = _context4.sent;
              delete userObj.encryptedPassword;
              res.status(200).json({
                success: true,
                data: userObj
              });
              _context4.next = 25;
              break;

            case 22:
              _context4.prev = 22;
              _context4.t0 = _context4["catch"](0);
              next(_context4.t0);

            case 25:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 22]]);
    }));

    return function loginUsername(_x10, _x11, _x12) {
      return _ref4.apply(this, arguments);
    };
  }();

  var refreshAccess = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var refreshToken, data;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              // throw an error when validation failed
              (0, _expressValidator.validationResult)(req)["throw"]();
              refreshToken = req.body.refreshToken;
              _context5.next = 5;
              return (0, _services.authService)().issueFromRefreshToken(refreshToken);

            case 5:
              data = _context5.sent;
              res.status(200).json({
                success: true,
                data: data
              });
              _context5.next = 12;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              res.status(401).json({
                error: _objectSpread({
                  code: 401
                }, _context5.t0),
                success: false
              });

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 9]]);
    }));

    return function refreshAccess(_x13, _x14) {
      return _ref5.apply(this, arguments);
    };
  }();

  var updateProfile = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
      var userId, _req$body5, fullName, email, password, user, error, oldUser, _error2;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              // throw an error when validation failed
              (0, _expressValidator.validationResult)(req)["throw"]();
              userId = req.token.userId;
              _req$body5 = req.body, fullName = _req$body5.fullName, email = _req$body5.email, password = _req$body5.password; // save user account details

              _context6.next = 6;
              return _models.User.findOne({
                where: {
                  id: userId
                }
              });

            case 6:
              user = _context6.sent;

              if (user) {
                _context6.next = 11;
                break;
              }

              error = new Error(_errors.errorMessages.INVALID_CREDENTIALS);
              error.status = _errors.errorCodes.AUTH_FAILED;
              throw error;

            case 11:
              if (fullName) user.fullName = fullName;

              if (!email) {
                _context6.next = 21;
                break;
              }

              _context6.next = 15;
              return _models.User.findOne({
                where: {
                  email: email
                }
              });

            case 15:
              oldUser = _context6.sent;

              if (!(oldUser && oldUser.id !== user.id)) {
                _context6.next = 20;
                break;
              }

              _error2 = new Error(_errors.errorMessages.EMAIL_IN_USE);
              _error2.status = _errors.errorCodes.BAD_REQUEST;
              throw _error2;

            case 20:
              user.email = email;

            case 21:
              if (password) user.encryptedPassword = password;
              _context6.next = 24;
              return user.save();

            case 24:
              res.status(200).json({
                success: true
              });
              _context6.next = 30;
              break;

            case 27:
              _context6.prev = 27;
              _context6.t0 = _context6["catch"](0);
              next(_context6.t0);

            case 30:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 27]]);
    }));

    return function updateProfile(_x15, _x16, _x17) {
      return _ref6.apply(this, arguments);
    };
  }();

  var getProfile = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
      var userId, user;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              // throw an error when validation failed
              (0, _expressValidator.validationResult)(req)["throw"]();
              userId = req.token.userId; // save user account details

              _context7.next = 5;
              return _models.User.findOne({
                where: {
                  id: userId
                },
                attributes: {
                  exclude: ['encryptedPassword']
                },
                include: [{
                  model: _models.InstagramUser,
                  as: 'instagramUser',
                  required: false
                }]
              });

            case 5:
              user = _context7.sent;
              res.status(200).json({
                success: true,
                data: user
              });
              _context7.next = 12;
              break;

            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](0);
              next(_context7.t0);

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 9]]);
    }));

    return function getProfile(_x18, _x19, _x20) {
      return _ref7.apply(this, arguments);
    };
  }();

  var getProfileByUserId = /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
      var userId, user;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              userId = req.params.userId;
              _context8.next = 4;
              return _models.User.findOne({
                where: {
                  id: userId
                },
                attributes: {
                  exclude: ['encryptedPassword']
                },
                include: [{
                  model: _models.InstagramUser,
                  as: 'instagramUser'
                }]
              });

            case 4:
              user = _context8.sent;
              res.status(200).send({
                success: true,
                data: {
                  user: user
                }
              });
              _context8.next = 11;
              break;

            case 8:
              _context8.prev = 8;
              _context8.t0 = _context8["catch"](0);
              next(_context8.t0);

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 8]]);
    }));

    return function getProfileByUserId(_x21, _x22, _x23) {
      return _ref8.apply(this, arguments);
    };
  }();

  var requestForgotPassword = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
      var email, user, err;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              (0, _expressValidator.validationResult)(req)["throw"]();
              email = req.body.email;
              _context9.next = 5;
              return _models.User.findOne({
                where: {
                  email: email
                }
              });

            case 5:
              user = _context9.sent;

              if (user) {
                _context9.next = 10;
                break;
              }

              err = new Error(_errors.errorMessages.USER_NOT_FOUND);
              err.status = _errors.errorCodes.NOT_FOUND;
              throw err;

            case 10:
              (0, _services.authService)().sendForgotPasswordEmail(user);
              res.status(200).json({
                success: true
              });
              _context9.next = 17;
              break;

            case 14:
              _context9.prev = 14;
              _context9.t0 = _context9["catch"](0);
              next(_context9.t0);

            case 17:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 14]]);
    }));

    return function requestForgotPassword(_x24, _x25, _x26) {
      return _ref9.apply(this, arguments);
    };
  }();

  var submitForgotPassword = /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
      var _req$body6, password, token, decode, user, err;

      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              // throw an error when validation failed
              (0, _expressValidator.validationResult)(req)["throw"]();
              _req$body6 = req.body, password = _req$body6.password, token = _req$body6.token;
              decode = (0, _services.authService)().verify(token);
              _context10.next = 6;
              return _models.User.findOne({
                where: {
                  email: decode.email
                }
              });

            case 6:
              user = _context10.sent;

              if (user) {
                _context10.next = 11;
                break;
              }

              err = new Error(_errors.errorMessages.USER_NOT_FOUND);
              err.status = _errors.errorCodes.NOT_FOUND;
              throw err;

            case 11:
              user.encryptedPassword = password;
              _context10.next = 14;
              return user.save();

            case 14:
              res.status(200).json({
                success: true
              });
              _context10.next = 20;
              break;

            case 17:
              _context10.prev = 17;
              _context10.t0 = _context10["catch"](0);
              next(_context10.t0);

            case 20:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 17]]);
    }));

    return function submitForgotPassword(_x27, _x28, _x29) {
      return _ref10.apply(this, arguments);
    };
  }(); // TODO: update it for admin panel


  var deleteUser = /*#__PURE__*/function () {
    var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
      var id, result;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              id = req.params.id;
              _context11.prev = 1;
              _context11.next = 4;
              return _models.User.destroy({
                where: {
                  id: id
                }
              });

            case 4:
              result = _context11.sent;
              res.status(200).json({
                result: result
              });
              _context11.next = 11;
              break;

            case 8:
              _context11.prev = 8;
              _context11.t0 = _context11["catch"](1);
              next(_context11.t0);

            case 11:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[1, 8]]);
    }));

    return function deleteUser(_x30, _x31, _x32) {
      return _ref11.apply(this, arguments);
    };
  }();

  var validate = function validate(method) {
    switch (method) {
      case 'signup':
        {
          return [(0, _expressValidator.body)('username', _errors.errorMessages.USERNAME_REQUIRED).exists(), (0, _expressValidator.body)('email').exists().withMessage(_errors.errorMessages.EMAIL_REQUIRED).isEmail(), (0, _expressValidator.body)('password').exists().withMessage(_errors.errorMessages.PASSWORD_REQUIRED).custom((0, _validations.userValidation)().checkPassword), (0, _expressValidator.body)('passwordConfirmation').exists().withMessage(_errors.errorMessages.PW_CONFIRMATION_REQUIRED).custom(function (value, _ref12) {
            var req = _ref12.req;
            return (0, _validations.userValidation)().checkPasswordConfirmation(req.body.password, value);
          })];
        }

      case 'get-instagram-username':
        {
          return [(0, _expressValidator.body)('accessToken', _errors.errorMessages.ACCESSTOKEN_REQUIRED).exists()];
        }

      case 'login':
        {
          return [(0, _expressValidator.body)('email').exists().withMessage(_errors.errorMessages.EMAIL_REQUIRED).isEmail().withMessage(_errors.errorMessages.EMAIL_INVALID), (0, _expressValidator.body)('password').exists().withMessage(_errors.errorMessages.PASSWORD_REQUIRED)];
        }

      case 'login-instagram':
        {
          return [(0, _expressValidator.body)('code').exists().withMessage(_errors.errorMessages.CODE_REQUIRED), (0, _expressValidator.body)('redirect_uri').exists().withMessage(_errors.errorMessages.REDIRECT_URI_REQUIRED)];
        }

      case 'login-username':
        {
          return [(0, _expressValidator.body)('username', _errors.errorMessages.USERNAME_REQUIRED).exists()];
        }

      case 'refresh-access':
        {
          return [(0, _expressValidator.body)('refreshToken').exists().withMessage(_errors.errorMessages.REFRESH_TOKEN_REQUIRED)];
        }

      case 'update-profile':
        {
          return [(0, _expressValidator.body)('phone').optional().custom((0, _validations.userValidation)().checkPhoneNumber), (0, _expressValidator.body)('addConnectedEmails.*').optional().isEmail().withMessage(_errors.errorMessages.PERSONAL_EMAIL_INVALID)];
        }

      case 'request-forgot-password':
        {
          return [(0, _expressValidator.body)('email').exists().withMessage(_errors.errorMessages.EMAIL_REQUIRED).isEmail().withMessage(_errors.errorMessages.EMAIL_INVALID)];
        }

      case 'submit-forgot-password':
        {
          return [(0, _expressValidator.body)('password').exists().withMessage(_errors.errorMessages.PASSWORD_REQUIRED).custom((0, _validations.userValidation)().checkPassword), (0, _expressValidator.body)('passwordConfirmation').exists().withMessage(_errors.errorMessages.PW_CONFIRMATION_REQUIRED).custom(function (value, _ref13) {
            var req = _ref13.req;
            return (0, _validations.userValidation)().checkPasswordConfirmation(req.body.password, value);
          })];
        }

      default:
        return null;
    }
  };

  return {
    signUp: signUp,
    login: login,
    loginInstagram: loginInstagram,
    refreshAccess: refreshAccess,
    updateProfile: updateProfile,
    getProfile: getProfile,
    getProfileByUserId: getProfileByUserId,
    requestForgotPassword: requestForgotPassword,
    submitForgotPassword: submitForgotPassword,
    deleteUser: deleteUser,
    validate: validate,
    loginUsername: loginUsername
  };
};

exports.userController = userController;