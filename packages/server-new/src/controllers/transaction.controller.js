import { Auction } from '../database/models';
import { Transaction } from '../database/models';
var Sequelize = require('sequelize');


export const transactionController = () => {

  const createTransaction = async (req, res, next) => {
    const {
      auctionId,
      bidAmount,
      bidder
    } = req.body;

    try {
      const data = await Transaction.create(
        {
          auctionId: auctionId,
          bidAmount: bidAmount,
          bidder: bidder
        },
      );
      if (res.status(200).json({ success: true, data })) {
        res.send(data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const getWinner = async (req, res, next) => {
    const auctionId = req.body.auctionId;
    const auctionId_exist = await Transaction.findOne({
      where: { auctionId: auctionId }
    }
    );
    if (!auctionId_exist) {
      res.send(`Auction ID ${auctionId} doesn't exist in transaction.`);
    }
    try {
      const maxAmount = await Transaction.findOne({
        attributes: [[Sequelize.fn('max', Sequelize.col('bidAmount')), 'amount']],
        raw: true,
        where: { auctionId: auctionId }
      });

      const maxInAuction = maxAmount.amount;

      const winner = await Transaction.findOne({
        where: {
          auctionId: auctionId,
          bidAmount: maxInAuction
        }
      });
      const winner_wallet = winner.bidder;

      if (res.status(200).json({ success: true, winner: winner_wallet })) {
        res.send(winner_wallet);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTransactionsById = async (req, res, next) => {
    const auctionId = req.body.auctionId;
    const auctionId_exist = await Transaction.findOne({
      where: { auctionId: auctionId }
    }
    );
    if (!auctionId_exist) {
      res.send(`Auction ID ${auctionId} doesn't exist in transaction.`);
    }
    try {
      const data = await Transaction.findAll({
        where: {
          auctionId: auctionId
        }
      });
      if (res.status(200).json({ success: true, data })) {
        res.send(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { createTransaction, getWinner, getTransactionsById };
};
