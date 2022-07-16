// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const utils = hre.ethers.utils;
const { merkleTree } = require("./old/merkletree_util")
require("dotenv").config();

const TIME_START_MYSTREY = parseInt(new Date(2022, 7, 26, 0, 0, 0).getTime() / 1000) - 10
const TIME_UNCOVER_MYSTREY = TIME_START_MYSTREY + 24 * 60 * 60 * 20

const BigNumber = ethers.BigNumber

// deploy resources
async function deploy() {
  const root = merkleTree.getRoot()
  
  const SphinxCat = await hre.ethers.getContractFactory("SphinxCat");

  console.log(`Begin to deploy begin=${TIME_START_MYSTREY} uncover=${TIME_UNCOVER_MYSTREY}, root=${root}`)
  const cat = await SphinxCat.deploy(BigNumber.from(TIME_START_MYSTREY), BigNumber.from(TIME_UNCOVER_MYSTREY), root);

  await cat.deployed();

  // // mint 10 个做测试
  // const [owner, account] = ethers.getSigners()
  // mintNFT(owner, cat);

  console.log(`SphinxCat is deployed successfully [${cat.address}]`);

  return cat
}

async function main() {
  await deploy()
}


// module.exports.deploy = deploy;

// We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
