"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var _require = require('sequelize'),
    Model = _require.Model;

module.exports = function (sequelize, DataTypes) {
  var InstagramUser = /*#__PURE__*/function (_Model) {
    (0, _inherits2["default"])(InstagramUser, _Model);

    var _super = _createSuper(InstagramUser);

    function InstagramUser() {
      (0, _classCallCheck2["default"])(this, InstagramUser);
      return _super.apply(this, arguments);
    }

    return InstagramUser;
  }(Model);

  InstagramUser.init({
    username: DataTypes.STRING,
    fullName: DataTypes.STRING,
    avatar: DataTypes.STRING,
    bio: DataTypes.STRING,
    followings: DataTypes.NUMBER,
    follows: DataTypes.NUMBER,
    posts: DataTypes.NUMBER
  }, {
    sequelize: sequelize,
    modelName: 'InstagramUser',
    paranoid: true,
    timestamp: true,
    indexes: [{
      unique: true,
      fields: ['userId'],
      where: {
        deletedAt: null
      }
    }],
    hooks: {}
  });
  return InstagramUser;
};