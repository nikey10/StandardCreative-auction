import moment from 'moment';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
  }
  Tags.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Tags',
      freezeTableName: true,
      timestamps: false,
      indexes: [
        {
          fields: ['name'],
        },
      ],
    }
  );
  return Tags;
};
