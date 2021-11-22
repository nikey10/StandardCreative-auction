"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var _require = require('sequelize'),
    Model = _require.Model;

module.exports = function (sequelize, DataTypes) {
  var Auction = /*#__PURE__*/function (_Model) {
    (0, _inherits2["default"])(Auction, _Model);

    var _super = _createSuper(Auction);

    function Auction() {
      (0, _classCallCheck2["default"])(this, Auction);
      return _super.apply(this, arguments);
    }

    (0, _createClass2["default"])(Auction, null, [{
      key: "associate",
      value: function associate(models) {
        Auction.belongsTo(models.Post, {
          foreignKey: 'postId',
          as: 'post',
          onDelete: 'CASCADE'
        });
        Auction.belongsTo(models.User, {
          foreignKey: 'winnerId',
          as: 'winner',
          onDelete: 'CASCADE'
        });
        Auction.hasMany(models.Offer, {
          foreignKey: 'auctionId',
          as: 'offers',
          onDelete: 'CASCADE'
        });
      }
    }]);
    return Auction;
  }(Model);

  Auction.init({
    postId: DataTypes.UUID,
    isFinished: DataTypes.BOOLEAN,
    winnerId: DataTypes.UUID,
    winnerPrice: DataTypes.FLOAT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize: sequelize,
    modelName: 'Auction',
    paranoid: true,
    timestamp: true,
    indexes: [{
      unique: true,
      fields: [],
      where: {
        deletedAt: null
      }
    }],
    hooks: {}
  });
  return Auction;
};