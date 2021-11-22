const { ethers, upgrades } = require("hardhat");

async function main() {
	const baseInstance = await ethers.getContractFactory("StandardCreativeNFT");
	const baseContract = await baseInstance.deploy();
	console.log("StandardCreativeNFT Contract is deployed to:", baseContract.address);
}

main();