"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offerController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressValidator = require("express-validator");

var _errors = require("../constants/errors");

var _models = require("../database/models");

var _web = _interopRequireDefault(require("web3"));

var _auction = require("../constants/auction");

var _general = require("../constants/general");

var offerController = function offerController() {
  /**
    * @name createOffer
    *  create Offer record with postId and userId
    * @param {*} req 
    * @param {*} res 
    * @param {*} next 
    */
  var createOffer = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var _req$body, title, url, source, likes, comments, instagramUser, price, transactionHash, userId, auction, post, newInstagramUser, offer;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, title = _req$body.title, url = _req$body.url, source = _req$body.source, likes = _req$body.likes, comments = _req$body.comments, instagramUser = _req$body.instagramUser, price = _req$body.price, transactionHash = _req$body.transactionHash;
              userId = req.token.userId;
              auction = null;
              _context.prev = 3;
              _context.next = 6;
              return _models.Post.findOne({
                where: {
                  url: url
                }
              });

            case 6:
              post = _context.sent;

              if (post) {
                _context.next = 14;
                break;
              }

              _context.next = 10;
              return _models.InstagramUser.findOrCreate({
                where: {
                  username: instagramUser.username
                },
                defaults: instagramUser
              });

            case 10:
              newInstagramUser = _context.sent;
              _context.next = 13;
              return _models.Post.create({
                title: title,
                url: url,
                source: source,
                likes: likes,
                comments: comments,
                instagramUserId: newInstagramUser[0].id
              });

            case 13:
              post = _context.sent;

            case 14:
              _context.next = 16;
              return _models.Auction.findOrCreate({
                where: {
                  postId: post.id
                },
                defaults: {
                  postId: post.id,
                  isFinished: false
                }
              });

            case 16:
              auction = _context.sent;
              _context.next = 19;
              return _models.Offer.findOrCreate({
                where: {
                  buyerId: userId,
                  auctionId: auction[0].id
                },
                defaults: {
                  buyerId: userId,
                  price: price,
                  auctionId: auction[0].id,
                  status: _general.OFFER_CREATE,
                  transactionHash: transactionHash
                }
              });

            case 19:
              offer = _context.sent;
              res.status(200).json({
                success: true,
                data: {
                  id: offer[0].id,
                  auctionId: auction[0].id,
                  price: price,
                  transactionHash: transactionHash,
                  status: _general.OFFER_CREATE,
                  post: req.body
                }
              });
              _context.next = 26;
              break;

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](3);
              next(_context.t0);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 23]]);
    }));

    return function createOffer(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  var cancelOffer = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
      var _req$body2, url, transactionHash, userId, auction, offer, cancelledOffer, error, _error;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, url = _req$body2.url, transactionHash = _req$body2.transactionHash;
              userId = req.token.userId;
              _context2.prev = 2;
              _context2.next = 5;
              return _models.Auction.findOne({
                include: [{
                  model: _models.Post,
                  as: 'post',
                  where: {
                    url: url
                  }
                }]
              });

            case 5:
              auction = _context2.sent;

              if (!auction) {
                _context2.next = 22;
                break;
              }

              _context2.next = 9;
              return _models.Offer.findOne({
                where: {
                  auctionId: auction.id,
                  buyerId: userId,
                  cancelled: false
                }
              });

            case 9:
              offer = _context2.sent;

              if (!offer) {
                _context2.next = 17;
                break;
              }

              _context2.next = 13;
              return _models.Offer.create({
                price: offer.price,
                auctionId: offer.auctionId,
                buyerId: userId,
                status: _general.OFFER_CANCEL,
                transactionHash: transactionHash
              });

            case 13:
              cancelledOffer = _context2.sent;
              res.status(200).send({
                success: true,
                data: cancelledOffer
              });
              _context2.next = 20;
              break;

            case 17:
              error = new Error(_errors.errorMessages.INVALID_OFFER_ID);
              error.status = _errors.errorCodes.INPUT_VALIDATION_FAILED;
              throw error;

            case 20:
              _context2.next = 25;
              break;

            case 22:
              _error = new Error(_errors.errorMessages.INVALID_URL);
              _error.status = _errors.errorCodes.INPUT_VALIDATION_FAILED;
              throw _error;

            case 25:
              _context2.next = 30;
              break;

            case 27:
              _context2.prev = 27;
              _context2.t0 = _context2["catch"](2);
              next(_context2.t0);

            case 30:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 27]]);
    }));

    return function cancelOffer(_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getOfferById = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
      var id, offer, auction, offers, error;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = req.params.id;
              _context3.prev = 1;
              _context3.next = 4;
              return _models.Offer.findOne({
                where: {
                  id: id
                }
              });

            case 4:
              offer = _context3.sent;

              if (!offer) {
                _context3.next = 15;
                break;
              }

              _context3.next = 8;
              return _models.Auction.findOne({
                where: {
                  id: offer.auctionId
                },
                include: [{
                  model: _models.Post,
                  as: 'post',
                  include: [{
                    model: _models.InstagramUser,
                    as: 'instagramUser'
                  }]
                }]
              });

            case 8:
              auction = _context3.sent;
              _context3.next = 11;
              return _models.Offer.findAll({
                where: {
                  auctionId: offer.auctionId
                }
              });

            case 11:
              offers = _context3.sent;
              res.status(200).json({
                success: true,
                data: {
                  auction: auction,
                  offers: offers
                }
              });
              _context3.next = 18;
              break;

            case 15:
              error = new Error(_errors.errorMessages.INVALID_OFFER_ID);
              error.status = _errors.errorCodes.INPUT_VALIDATION_FAILED;
              throw error;

            case 18:
              _context3.next = 23;
              break;

            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](1);
              next(_context3.t0);

            case 23:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 20]]);
    }));

    return function getOfferById(_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }();

  var getOfferPagniationByStatus = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
      var _req$params, page, size, isSold, auctions;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _req$params = req.params, page = _req$params.page, size = _req$params.size, isSold = _req$params.isSold;
              _context4.next = 4;
              return _models.Auction.findAll({
                where: {
                  isFinished: isSold
                },
                limit: size,
                offset: page * size,
                include: [{
                  model: _models.Offer,
                  as: 'offers',
                  include: [{
                    model: _models.User,
                    as: 'buyer',
                    include: [{
                      model: _models.InstagramUser,
                      as: 'instagramUser',
                      required: false
                    }]
                  }]
                }, {
                  model: _models.Post,
                  as: 'post',
                  include: [{
                    model: _models.InstagramUser,
                    as: 'instagramUser'
                  }]
                }]
              });

            case 4:
              auctions = _context4.sent;
              res.status(200).json({
                success: true,
                data: auctions
              });
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              next(_context4.t0);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 8]]);
    }));

    return function getOfferPagniationByStatus(_x10, _x11, _x12) {
      return _ref4.apply(this, arguments);
    };
  }();

  var finishOffer = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
      var _req$body3, url, seller, web3, auctionContract, receipt, auction, winnerPrice, winnerBid;

      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _req$body3 = req.body, url = _req$body3.url, seller = _req$body3.seller;
              web3 = new _web["default"](new _web["default"].providers.HttpProvider('https://rinkeby.infura.io/v3/eb0ba49fd3b34cfea534acfdd536c160'));
              _context5.prev = 2;
              auctionContract = new web3.eth.Contract(_auction.AUCTION_ABI, _auction.AUCTION_ADDRESS);
              _context5.next = 6;
              return auctionContract.methods.resultAuction(url, seller).send({
                from: _auction.AUCTION_ADDRESS
              });

            case 6:
              receipt = _context5.sent;

              if (!receipt.events) {
                _context5.next = 26;
                break;
              }

              _context5.next = 10;
              return _models.Auction.findOne({
                where: {
                  isFinished: false
                },
                include: [{
                  model: _models.Post,
                  as: 'post',
                  where: {
                    url: url
                  }
                }]
              });

            case 10:
              auction = _context5.sent;
              _context5.next = 13;
              return _models.Offer.max('price', {
                where: {
                  status: _general.OFFER_CREATE,
                  auctionId: auction.id
                }
              });

            case 13:
              winnerPrice = _context5.sent;
              _context5.next = 16;
              return _models.Offer.findOne({
                where: {
                  price: winnerPrice,
                  status: _general.OFFER_CREATE
                }
              });

            case 16:
              winnerBid = _context5.sent;
              auction.winnerBid = winnerBid.buyerId;
              auction.winnerPrice = winnerPrice;
              auction.isFinished = true;
              auction.transactionHash = receipt.transactionHash;
              _context5.next = 23;
              return auction.save();

            case 23:
              res.status(200).send({
                success: true,
                data: auction
              });
              _context5.next = 27;
              break;

            case 26:
              res.status(400).send({
                success: false
              });

            case 27:
              _context5.next = 32;
              break;

            case 29:
              _context5.prev = 29;
              _context5.t0 = _context5["catch"](2);
              next(_context5.t0);

            case 32:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[2, 29]]);
    }));

    return function finishOffer(_x13, _x14, _x15) {
      return _ref5.apply(this, arguments);
    };
  }();

  var getOfferByUserId = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
      var userId, offers;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              userId = req.params.userId;
              _context6.prev = 1;
              _context6.next = 4;
              return _models.Offer.findAll({
                where: {
                  buyerId: userId
                },
                include: [{
                  model: _models.Post,
                  as: 'post'
                }]
              });

            case 4:
              offers = _context6.sent;
              res.status(200).send({
                success: true,
                data: offers
              });
              _context6.next = 11;
              break;

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](1);
              next(_context6.t0);

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[1, 8]]);
    }));

    return function getOfferByUserId(_x16, _x17, _x18) {
      return _ref6.apply(this, arguments);
    };
  }();

  var getNFTByUserId = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
      var userId, auctions;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              userId = req.params.userId;
              _context7.prev = 1;
              _context7.next = 4;
              return _models.Auction.findAll({
                where: {
                  winnerId: userId,
                  isFinished: true
                },
                include: [{
                  model: _models.Post,
                  as: 'post'
                }]
              });

            case 4:
              auctions = _context7.sent;
              res.status(200).send({
                success: true,
                data: auctions
              });
              _context7.next = 11;
              break;

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](1);
              next(_context7.t0);

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[1, 8]]);
    }));

    return function getNFTByUserId(_x19, _x20, _x21) {
      return _ref7.apply(this, arguments);
    };
  }();

  var getAuctionsByUserId = /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
      var userId, user, username, auctions;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              userId = req.params.userId;
              _context8.prev = 1;
              _context8.next = 4;
              return _models.User.findOne({
                where: {
                  id: userId
                },
                include: [{
                  model: _models.InstagramUser,
                  as: 'instagramUser'
                }]
              });

            case 4:
              user = _context8.sent;

              if (!user.instagramUser) {
                _context8.next = 13;
                break;
              }

              username = user.instagramUser.username;
              _context8.next = 9;
              return _models.Auction.findAll({
                where: {
                  isFinished: false
                },
                include: [{
                  model: _models.Post,
                  as: 'post',
                  include: [{
                    model: instagramUser,
                    as: 'instagramUser',
                    where: {
                      username: username
                    }
                  }]
                }]
              });

            case 9:
              auctions = _context8.sent;
              res.status(200).send({
                success: true,
                data: auctions
              });
              _context8.next = 14;
              break;

            case 13:
              res.status(400).send({
                success: false,
                data: []
              });

            case 14:
              _context8.next = 19;
              break;

            case 16:
              _context8.prev = 16;
              _context8.t0 = _context8["catch"](1);
              next(_context8.t0);

            case 19:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[1, 16]]);
    }));

    return function getAuctionsByUserId(_x22, _x23, _x24) {
      return _ref8.apply(this, arguments);
    };
  }();

  var validate = function validate(method) {
    switch (method) {
      case 'create-offer':
        {
          return [(0, _expressValidator.body)('title', _errors.errorMessages.NO_TITLE).exists(), (0, _expressValidator.body)('url', _errors.errorMessages.NO_URL).exists(), (0, _expressValidator.body)('source', _errors.errorMessages.NO_SOURCE).exists(), (0, _expressValidator.body)('likes', _errors.errorMessages.NO_LIKES).exists(), (0, _expressValidator.body)('comments', _errors.errorMessages.NO_COMMENTS).exists(), (0, _expressValidator.body)('price', _errors.errorMessages.NO_PRICE).exists()];
        }

      case 'get-offer-by-id':
        {
          return [(0, _expressValidator.param)('id', _errors.errorMessages.NO_ID).exists()];
        }

      case 'get-offer-by-pagination':
        {
          return [(0, _expressValidator.body)('page', _errors.errorMessages.NO_PAGE).exists(), (0, _expressValidator.body)('size', _errors.errorMessages.NO_PAGESIZE).exists(), (0, _expressValidator.body)('isSold', _errors.errorMessages.NO_STATUS).exists()];
        }

      case 'buy-offer':
        {
          return [(0, _expressValidator.body)('url', _errors.errorMessages.NO_ID).exists()];
        }

      default:
        return null;
    }
  };

  return {
    createOffer: createOffer,
    cancelOffer: cancelOffer,
    getOfferById: getOfferById,
    getOfferPagniationByStatus: getOfferPagniationByStatus,
    finishOffer: finishOffer,
    getOfferByUserId: getOfferByUserId,
    getAuctionsByUserId: getAuctionsByUserId,
    getNFTByUserId: getNFTByUserId,
    validate: validate
  };
};

exports.offerController = offerController;