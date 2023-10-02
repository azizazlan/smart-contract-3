import { ethers } from "hardhat";
import { Wallet } from "ethers";

const RPC_URL = "http://127.0.0.1:8545";
const METAMASK_PRIVATE_KEY =
  "df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";

// async function main() {
//   const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
//   const metaMaskWallet = new Wallet(METAMASK_PRIVATE_KEY, provider);

//   const initialSupply = ethers.utils.parseEther("1000000"); // Set the expected initial supply

//   const MelakaRice = await ethers.getContractFactory("MelakaRice");
//   const melakaRice = await MelakaRice.connect(metaMaskWallet).deploy(
//     initialSupply
//   );

//   const MelakaResident = await ethers.getContractFactory("MelakaResident");
//   const melakaResident = await MelakaResident.connect(metaMaskWallet).deploy(
//     melakaRice.address
//   );

//   console.log(`MelakaRice deployed to     : ${melakaRice.address}`);
//   console.log(`MelakaResident deployed to : ${melakaResident.address}`);
// }

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const metaMaskWallet = new Wallet(METAMASK_PRIVATE_KEY, provider);

  const MelakaResidentId = await ethers.getContractFactory("MelakaResidentId");
  const melakaResidentId = await MelakaResidentId.connect(
    metaMaskWallet
  ).deploy();

  const MelakaSubsidy = await ethers.getContractFactory("MelakaSubsidy");
  const melakaSubsidy = await MelakaSubsidy.connect(metaMaskWallet).deploy();

  console.log(`MelakaResidentId deployed to : ${melakaResidentId.address}`);
  console.log(`MelakaSubsidy deployed to    : ${melakaSubsidy.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
