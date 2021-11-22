const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.RefreshToken, {
        foreignKey: "userId",
        as: "refreshTokens",
        onDelete: "CASCADE"
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          fields: ['email'],
        },
      ],
    }
  );
  return User;
};
