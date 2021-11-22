"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AUCTION_ABI = exports.AUCTION_ADDRESS = void 0;
var AUCTION_ADDRESS = "0x53A8EA6D94C368Cc31Ee2b004401615954d5a8bd";
exports.AUCTION_ADDRESS = AUCTION_ADDRESS;
var AUCTION_ABI = [{
  "inputs": [{
    "internalType": "contract MarketTradingAccessControls",
    "name": "_accessControls",
    "type": "address"
  }, {
    "internalType": "contract IMarketTradingNFT",
    "name": "_marketTradingNft",
    "type": "address"
  }, {
    "internalType": "address payable",
    "name": "_platformFeeRecipient",
    "type": "address"
  }],
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }, {
    "indexed": false,
    "internalType": "address",
    "name": "seller",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "string",
    "name": "tokenUri",
    "type": "string"
  }, {
    "indexed": false,
    "internalType": "string",
    "name": "edition",
    "type": "string"
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "winner",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "winningBid",
    "type": "uint256"
  }],
  "name": "AuctionResulted",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "string",
    "name": "igUrl",
    "type": "string"
  }, {
    "indexed": false,
    "internalType": "string",
    "name": "edition",
    "type": "string"
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "bidder",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "bid",
    "type": "uint256"
  }],
  "name": "BidPlaced",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "bidder",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "bid",
    "type": "uint256"
  }],
  "name": "BidRefunded",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "string",
    "name": "igUrl",
    "type": "string"
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "bidder",
    "type": "address"
  }, {
    "indexed": false,
    "internalType": "uint256",
    "name": "bid",
    "type": "uint256"
  }],
  "name": "BidWithdrawn",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [],
  "name": "NFTAuctionContractDeployed",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "bool",
    "name": "isPaused",
    "type": "bool"
  }],
  "name": "PauseToggled",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "accessControls",
    "type": "address"
  }],
  "name": "UpdateAccessControls",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "uint256",
    "name": "minBidIncrement",
    "type": "uint256"
  }],
  "name": "UpdateMinBidIncrement",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "uint256",
    "name": "platformFee",
    "type": "uint256"
  }],
  "name": "UpdatePlatformFee",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address payable",
    "name": "platformFeeRecipient",
    "type": "address"
  }],
  "name": "UpdatePlatformFeeRecipient",
  "type": "event"
}, {
  "inputs": [],
  "name": "accessControls",
  "outputs": [{
    "internalType": "contract MarketTradingAccessControls",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "string",
    "name": "",
    "type": "string"
  }],
  "name": "auctionsFinished",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "bidLockTime",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "string",
    "name": "_igUrl",
    "type": "string"
  }],
  "name": "getHighestBidder",
  "outputs": [{
    "internalType": "address payable",
    "name": "_bidder",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "_bid",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "_lastBidTime",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "string",
    "name": "",
    "type": "string"
  }],
  "name": "highestBids",
  "outputs": [{
    "internalType": "address payable",
    "name": "bidder",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "bid",
    "type": "uint256"
  }, {
    "internalType": "uint256",
    "name": "lastBidTime",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "isPaused",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "marketTradingNft",
  "outputs": [{
    "internalType": "contract IMarketTradingNFT",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "minBidIncrement",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "string",
    "name": "_igUrl",
    "type": "string"
  }],
  "name": "placeBid",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [],
  "name": "platformFee",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "platformFeeRecipient",
  "outputs": [{
    "internalType": "address payable",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "string",
    "name": "_igUrl",
    "type": "string"
  }, {
    "internalType": "address",
    "name": "_seller",
    "type": "address"
  }],
  "name": "resultAuction",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "toggleIsPaused",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "contract MarketTradingAccessControls",
    "name": "_accessControls",
    "type": "address"
  }],
  "name": "updateAccessControls",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_minBidIncrement",
    "type": "uint256"
  }],
  "name": "updateMinBidIncrement",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "uint256",
    "name": "_platformFee",
    "type": "uint256"
  }],
  "name": "updatePlatformFee",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "address payable",
    "name": "_platformFeeRecipient",
    "type": "address"
  }],
  "name": "updatePlatformFeeRecipient",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "internalType": "string",
    "name": "_igUrl",
    "type": "string"
  }],
  "name": "withdrawBid",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];
exports.AUCTION_ABI = AUCTION_ABI;