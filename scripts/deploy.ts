import { ethers } from "hardhat";
import { Wallet } from "ethers";

const RPC_URL = "http://127.0.0.1:8545";
const METAMASK_PRIVATE_KEY =
  "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const metaMaskWallet = new Wallet(METAMASK_PRIVATE_KEY, provider);

  const MelakaRice = await ethers.getContractFactory("MelakaRice");
  const melakaRice = await MelakaRice.connect(metaMaskWallet).deploy();

  const MelakaResident = await ethers.getContractFactory("MelakaResident");
  const melakaResident = await MelakaResident.connect(metaMaskWallet).deploy(
    melakaRice.address
  );

  console.log(`MelakaRice deployed to     : ${melakaRice.address}`);
  console.log(`MelakaResident deployed to : ${melakaResident.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
