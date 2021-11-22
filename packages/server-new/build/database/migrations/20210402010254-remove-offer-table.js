"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.dropTable('Offers');

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function up(_x) {
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
              return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

            case 2:
              _context2.next = 4;
              return queryInterface.createTable('Offers', {
                id: {
                  allowNull: false,
                  primaryKey: true,
                  type: Sequelize.UUID,
                  defaultValue: Sequelize.literal('uuid_generate_v4()')
                },
                userId: {
                  type: Sequelize.UUID
                },
                price: {
                  allowNull: false,
                  type: Sequelize.FLOAT
                },
                postId: {
                  type: Sequelize.UUID
                },
                isSold: {
                  type: Sequelize.BOOLEAN
                },
                buyerId: {
                  type: Sequelize.UUID
                },
                transactionHash: {
                  type: Sequelize.STRING,
                  unique: true
                },
                createdAt: {
                  allowNull: false,
                  type: Sequelize.DATE
                },
                buyAt: {
                  type: Sequelize.DATE
                },
                deletedAt: {
                  type: Sequelize.DATE
                }
              });

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function down(_x2, _x3) {
      return _down.apply(this, arguments);
    }

    return down;
  }()
};