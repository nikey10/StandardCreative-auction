const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Addnft extends Model {
  }
  Addnft.init(
    {
      contractAddress: DataTypes.STRING,
      tokenId: DataTypes.STRING,
      route: DataTypes.STRING,
      displayName: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Addnft',
      freezeTableName: true,
      timestamps: false,
      indexes: [
        {
          fields: ['tokenId'],
        },
      ],
    }
  );
  return Addnft;
};