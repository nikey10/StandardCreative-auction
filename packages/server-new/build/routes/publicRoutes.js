"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers");

var _offer = require("../controllers/offer.controller");

var publicRoutes = _express["default"].Router();

exports.publicRoutes = publicRoutes;
publicRoutes.post('/signup', (0, _controllers.userController)().validate('signup'), (0, _controllers.userController)().signUp);
publicRoutes.post('/login', (0, _controllers.userController)().validate('login'), (0, _controllers.userController)().login);
publicRoutes.post('/login-instagram', (0, _controllers.userController)().validate('login-instagram'), (0, _controllers.userController)().loginInstagram);
publicRoutes.post('/request-forgot-password', (0, _controllers.userController)().validate('request-forgot-password'), (0, _controllers.userController)().requestForgotPassword);
publicRoutes.post('/submit-forgot-password', (0, _controllers.userController)().validate('submit-forgot-password'), (0, _controllers.userController)().submitForgotPassword);
publicRoutes.post('/refresh-access', (0, _controllers.userController)().validate('refresh-access'), (0, _controllers.userController)().refreshAccess);
publicRoutes.post('/login-username', (0, _controllers.userController)().validate('login-username'), (0, _controllers.userController)().loginUsername);
publicRoutes.post('/user/offers/:userId', (0, _offer.offerController)().getOfferByUserId);
publicRoutes.post('/user/auctions/:userId', (0, _offer.offerController)().getAuctionsByUserId);
publicRoutes.post('/user/nfts/:userId', (0, _offer.offerController)().getNFTByUserId);
publicRoutes.get('/user/:userId', (0, _controllers.userController)().getProfileByUserId); // nft APIs

publicRoutes.get('/nft/:tokenId', (0, _controllers.nftController)().validate('get-one-nft'), (0, _controllers.nftController)().getOneNFT);
publicRoutes.get('/get-post/:url', (0, _controllers.instagramController)().getPost);
publicRoutes.get('/insta-test', (0, _controllers.instagramController)().getTest); //Offer APIs

publicRoutes.get('/offer/:id', (0, _offer.offerController)().validate('get-offer-by-id'), (0, _offer.offerController)().getOfferById);
publicRoutes.get('/offers/:page/:size/:isSold', (0, _offer.offerController)().validate('get-offer-by-pagination'), (0, _offer.offerController)().getOfferPagniationByStatus);