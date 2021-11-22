import express from 'express';
import {
  userController,
  auctionController,
  transactionController,
  addnftController,
} from '../controllers';

const publicRoutes = express.Router();

publicRoutes.post('/signup', userController().validate('signup'), userController().signUp);
publicRoutes.post('/login', userController().validate('login'), userController().login);

publicRoutes.post('/create-auction', auctionController().createAuction);
publicRoutes.post('/create-transaction', transactionController().createTransaction);
publicRoutes.post('/update-auction', auctionController().updateAuction);
publicRoutes.post('/get-auction', auctionController().getAuction);
publicRoutes.post('/get-auctions', auctionController().getAuctions);
publicRoutes.post('/get-auctions-status', auctionController().getAuctionsByStatus);
publicRoutes.post('/get-winner', transactionController().getWinner);
publicRoutes.post('/get-transactions-auctionid', transactionController().getTransactionsById);
publicRoutes.post('/addnft', addnftController().createAddNFT);
publicRoutes.post('/getnftdata', addnftController().getNFTData);
publicRoutes.post('/get-onenft', addnftController().getOneNFT);

export { publicRoutes };
