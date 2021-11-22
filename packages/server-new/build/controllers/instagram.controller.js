"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instagramController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressValidator = require("express-validator");

var _models = require("../database/models");

var _errors = require("../constants/errors");

var _instagram = _interopRequireDefault(require("../utils/instagram"));

var instagramController = function instagramController() {
  /**
    * @name getUsername
    *  get Username from instagram by using access token
    * @param {*} req 
    * @param {*} res 
    * @param {*} next 
    */
  var getUsername = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var _req$body, code, redirect_uri, accessTokenResult, usernameResult, username, _yield$instagramClien, success, data, error, userId, user, instagramUser;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, code = _req$body.code, redirect_uri = _req$body.redirect_uri;
              _context.prev = 1;
              _context.next = 4;
              return _instagram["default"].getAccessToken(code, redirect_uri);

            case 4:
              accessTokenResult = _context.sent;

              if (!accessTokenResult.success) {
                _context.next = 49;
                break;
              }

              // if user login status, save instagram token to user record
              console.log(accessTokenResult);
              _context.next = 9;
              return _instagram["default"].getUsername(accessTokenResult.data.access_token);

            case 9:
              usernameResult = _context.sent;

              if (!usernameResult.success) {
                _context.next = 46;
                break;
              }

              username = usernameResult.data.username;
              _context.next = 14;
              return _instagram["default"].getUserInfoRapid(username);

            case 14:
              _yield$instagramClien = _context.sent;
              success = _yield$instagramClien.success;
              data = _yield$instagramClien.data;
              error = _yield$instagramClien.error;

              if (!success) {
                _context.next = 43;
                break;
              }

              userId = req.token.userId;
              _context.next = 22;
              return _models.User.findOne({
                where: {
                  id: userId
                }
              });

            case 22:
              user = _context.sent;

              if (!user.instagramUserId) {
                _context.next = 37;
                break;
              }

              _context.next = 26;
              return _models.InstagramUser.findOne({
                where: {
                  id: user.instagramUserId
                }
              });

            case 26:
              instagramUser = _context.sent;
              instagramUser.username = data.username;
              instagramUser.avatar = data.profile_pic_url;
              instagramUser.bio = data.biography;
              instagramUser.follows = data.edge_follow.count;
              instagramUser.followings = data.edge_followed_by.count;
              instagramUser.posts = data.edge_owner_to_timeline_media.count;
              _context.next = 35;
              return instagramUser.save();

            case 35:
              _context.next = 40;
              break;

            case 37:
              _context.next = 39;
              return _models.InstagramUser.create({
                username: data.username,
                avatar: data.profile_pic_url,
                bio: data.biography,
                follows: data.edge_follow.count,
                followings: data.edge_followed_by.count,
                posts: data.edge_owner_to_timeline_media.count
              });

            case 39:
              instagramUser = _context.sent;

            case 40:
              res.status(200).json({
                success: true,
                data: {
                  username: user.username,
                  fullName: user.fullName,
                  instagramUser: instagramUser
                }
              });
              _context.next = 44;
              break;

            case 43:
              res.status(500).json({
                success: false,
                error: error
              });

            case 44:
              _context.next = 47;
              break;

            case 46:
              res.status(500).json(usernameResult);

            case 47:
              _context.next = 50;
              break;

            case 49:
              res.status(500).json(accessTokenResult);

            case 50:
              _context.next = 55;
              break;

            case 52:
              _context.prev = 52;
              _context.t0 = _context["catch"](1);
              next(_context.t0);

            case 55:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 52]]);
    }));

    return function getUsername(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  var getPosts = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
      var _req$body2, userId, after, result;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // throw an error when validation failed
              (0, _expressValidator.validationResult)(req)["throw"]();
              _req$body2 = req.body, userId = _req$body2.userId, after = _req$body2.after;
              _context2.prev = 2;
              _context2.next = 5;
              return _instagram["default"].getUserPosts(userId, after);

            case 5:
              result = _context2.sent;

              if (result.success) {
                res.status(200).json(result);
              } else {
                res.status(500).json(result);
              }

              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](2);
              next(_context2.t0);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 9]]);
    }));

    return function getPosts(_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getTest = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
      var result;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _instagram["default"].getPostByUrl();

            case 3:
              result = _context3.sent;

              if (result.success) {
                res.status(200).json(result);
              } else {
                res.status(500).json(result);
              }

              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              next(_context3.t0);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));

    return function getTest(_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }();

  var getPost = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
      var url, post, offers, auction, result, data, _post, userInfo;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              url = req.params.url;
              _context4.next = 4;
              return _models.Post.findOne({
                where: {
                  url: url
                },
                include: [{
                  model: _models.InstagramUser,
                  required: true,
                  as: 'instagramUser'
                }]
              });

            case 4:
              post = _context4.sent;

              if (!post) {
                _context4.next = 19;
                break;
              }

              _context4.next = 8;
              return _models.Auction.findOne({
                where: {
                  postId: post.id
                },
                include: [{
                  model: _models.Post,
                  as: 'post',
                  include: [{
                    model: _models.InstagramUser,
                    as: 'instagramUser'
                  }]
                }, {
                  model: _models.User,
                  as: 'winner',
                  include: [{
                    model: _models.InstagramUser,
                    as: 'instagramUser'
                  }]
                }]
              });

            case 8:
              auction = _context4.sent;

              if (!auction) {
                _context4.next = 16;
                break;
              }

              _context4.next = 12;
              return _models.Offer.findAll({
                where: {
                  auctionId: auction.id
                },
                include: [{
                  model: _models.User,
                  as: 'buyer',
                  include: {
                    model: _models.InstagramUser,
                    as: 'instagramUser'
                  }
                }]
              });

            case 12:
              offers = _context4.sent;

              if (offers) {
                res.status(200).send({
                  success: true,
                  data: {
                    auction: auction,
                    offers: offers,
                    post: post
                  }
                });
              }

              _context4.next = 17;
              break;

            case 16:
              res.status(200).json({
                success: true,
                data: {
                  post: post
                }
              });

            case 17:
              _context4.next = 36;
              break;

            case 19:
              _context4.next = 21;
              return _instagram["default"].getPostByUrl(url);

            case 21:
              result = _context4.sent;

              if (!result.success) {
                _context4.next = 35;
                break;
              }

              data = result.data;
              _post = {
                url: url,
                title: data.edge_media_to_caption.edges[0].node.text,
                comments: data.edge_media_preview_comment.count,
                likes: data.edge_media_preview_like.count
              };

              if (data.is_video) {
                _post.source = data.video_url;
              } else {
                _post.source = data.display_url;
              }

              _context4.next = 28;
              return _instagram["default"].getUserInfoRapid(data.owner.username);

            case 28:
              userInfo = _context4.sent;
              _post.instagramUser = {
                username: userInfo.data.username,
                fullName: userInfo.data.full_name,
                avatar: userInfo.data.profile_pic_url,
                bio: userInfo.data.biography,
                follows: userInfo.data.edge_follow.count,
                followings: userInfo.data.edge_followed_by.count,
                posts: userInfo.data.edge_owner_to_timeline_media.count
              }; //--- create new instagram user with user info if not exist

              _context4.next = 32;
              return _models.InstagramUser.findOrCreate({
                where: {
                  username: userInfo.data.username
                },
                "default": _post.instagramUser
              });

            case 32:
              res.status(200).json({
                success: true,
                data: {
                  post: _post
                }
              });
              _context4.next = 36;
              break;

            case 35:
              res.status(500).json(result);

            case 36:
              _context4.next = 41;
              break;

            case 38:
              _context4.prev = 38;
              _context4.t0 = _context4["catch"](0);
              next(_context4.t0);

            case 41:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 38]]);
    }));

    return function getPost(_x10, _x11, _x12) {
      return _ref4.apply(this, arguments);
    };
  }();

  var logout = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
      var userId, user;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              userId = req.token.userId;
              _context5.prev = 1;
              _context5.next = 4;
              return _models.User.findOne({
                where: {
                  userId: userId
                }
              });

            case 4:
              user = _context5.sent;
              user.instagramUsername = '';
              user.instagramAvatar = '';
              user.instagramUserId = '';
              user.instaBio = '';
              user.followings = 0;
              user.follows = 0;
              user.posts = 0;
              user.instaCategory = '';
              _context5.next = 15;
              return user.save();

            case 15:
              res.status(200).json({
                success: true
              });
              _context5.next = 21;
              break;

            case 18:
              _context5.prev = 18;
              _context5.t0 = _context5["catch"](1);
              next(_context5.t0);

            case 21:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 18]]);
    }));

    return function logout(_x13, _x14, _x15) {
      return _ref5.apply(this, arguments);
    };
  }();

  var validate = function validate(method) {
    switch (method) {
      case 'getUsername':
        {
          return [(0, _expressValidator.body)('accessToken', _errors.errorMessages.ACCESSTOKEN_REQUIRED).exists()];
        }

      default:
        return null;
    }
  };

  return {
    getUsername: getUsername,
    getPosts: getPosts,
    getPost: getPost,
    logout: logout,
    getTest: getTest,
    validate: validate
  };
};

exports.instagramController = instagramController;