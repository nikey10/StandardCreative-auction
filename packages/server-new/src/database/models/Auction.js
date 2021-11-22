import moment from 'moment';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Auction extends Model {
  }
  Auction.init(
    {
      auctionId: DataTypes.INTEGER,
      nftContract: DataTypes.STRING,
      creatorAddress: DataTypes.STRING,
      creatorShare: DataTypes.FLOAT,
      openEditionPrice: DataTypes.FLOAT,
      minBidIncrement: DataTypes.FLOAT,
      duration: DataTypes.INTEGER,
      durationIncrement: DataTypes.INTEGER,
      status: DataTypes.STRING,
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
      modelName: 'Auction',
      freezeTableName: true,
      indexes: [
        {
          fields: ['auctionId'],
        },
      ],
    }
  );
  return Auction;
};
