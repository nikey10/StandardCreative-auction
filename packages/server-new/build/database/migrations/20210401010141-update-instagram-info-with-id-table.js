"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.changeColumn('Users', 'instagramUserId', {
                type: 'UUID USING CAST("instagramUserId" as UUID)'
              });

            case 2:
              _context.next = 4;
              return queryInterface.removeColumn('Users', 'instagramUsername');

            case 4:
              _context.next = 6;
              return queryInterface.removeColumn('Users', 'instagramAvatar');

            case 6:
              _context.next = 8;
              return queryInterface.removeColumn('Users', 'instaBio');

            case 8:
              _context.next = 10;
              return queryInterface.removeColumn('Users', 'follows');

            case 10:
              _context.next = 12;
              return queryInterface.removeColumn('Users', 'followings');

            case 12:
              _context.next = 14;
              return queryInterface.removeColumn('Users', 'posts');

            case 14:
              _context.next = 16;
              return queryInterface.removeColumn('Users', 'instaCategory');

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function up(_x, _x2) {
      return _up.apply(this, arguments);
    }

    return up;
  }(),
  down: function () {
    var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return queryInterface.changeColumn('Users', 'instagramUserId', {
                type: 'VARCHAR(255) USING CAST("instagramUserId" as VARCHAR(255))'
              });

            case 2:
              _context2.next = 4;
              return queryInterface.addColumn('Users', 'instagramUsername', {
                type: Sequelize.STRING,
                allowNull: true
              });

            case 4:
              _context2.next = 6;
              return queryInterface.addColumn('Users', 'instagramAvatar', {
                type: Sequelize.STRING,
                allowNull: true
              });

            case 6:
              _context2.next = 8;
              return queryInterface.addColumn('Users', 'instaBio', {
                type: Sequelize.STRING,
                allowNull: true
              });

            case 8:
              _context2.next = 10;
              return queryInterface.addColumn('Users', 'follows', {
                type: Sequelize.INTEGER,
                allowNull: true
              });

            case 10:
              _context2.next = 12;
              return queryInterface.addColumn('Users', 'followings', {
                type: Sequelize.INTEGER,
                allowNull: true
              });

            case 12:
              _context2.next = 14;
              return queryInterface.addColumn('Users', 'posts', {
                type: Sequelize.INTEGER,
                allowNull: true
              });

            case 14:
              _context2.next = 16;
              return queryInterface.addColumn('Users', 'instaCategory', {
                type: Sequelize.STRING,
                allowNull: true
              });

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function down(_x3, _x4) {
      return _down.apply(this, arguments);
    }

    return down;
  }()
};