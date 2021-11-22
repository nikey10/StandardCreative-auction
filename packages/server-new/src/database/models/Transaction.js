import moment from 'moment';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
  }
  Transaction.init(
    {
      auctionId: DataTypes.INTEGER,
      bidAmount: DataTypes.FLOAT,
      bidder: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('createdAt')).valueOf();
        }
      },
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('updatedAt')).valueOf();
        }
      }
    },
    {
      sequelize,
      modelName: 'Transaction',
      freezeTableName: true,
      indexes: [
        {
          fields: ['auctionId'],
        },
      ],
    }
  );
  return Transaction;
};
