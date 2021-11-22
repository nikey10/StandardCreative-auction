"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.privateRoutes = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers");

var _offer = require("../controllers/offer.controller");

var privateRoutes = _express["default"].Router();

exports.privateRoutes = privateRoutes;
privateRoutes.post('/update-profile', (0, _controllers.userController)().validate('update-profile'), (0, _controllers.userController)().updateProfile);
privateRoutes.get('/get-profile', (0, _controllers.userController)().getProfile); // all instagram APIs

privateRoutes.post('/user/connect-instagram', (0, _controllers.instagramController)().validate('getUsername'), (0, _controllers.instagramController)().getUsername);
privateRoutes.post('/instagram/posts', (0, _controllers.instagramController)().getPosts);
privateRoutes.post('/instagram/logout', (0, _controllers.instagramController)().logout); // nft APIs

privateRoutes.post('/nft', (0, _controllers.nftController)().validate('create-nft'), (0, _controllers.nftController)().createNFT);
privateRoutes.post('/execute/seemless', (0, _controllers.nftController)().executeTransaction);
privateRoutes.post('/execute/auction', (0, _controllers.nftController)().executeAuction);
privateRoutes.get('/allnft', (0, _controllers.nftController)().getAllNFT); //Offer API

privateRoutes.post('/offer', (0, _offer.offerController)().validate('create-offer'), (0, _offer.offerController)().createOffer);
privateRoutes.post('/accept-offer', (0, _offer.offerController)().validate('buy-offer'), (0, _offer.offerController)().finishOffer);
privateRoutes.post('/cancel-offer', (0, _offer.offerController)().cancelOffer);