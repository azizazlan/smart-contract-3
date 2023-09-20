import { ethers } from "hardhat";

async function main() {
  const MelakaRice = await ethers.getContractFactory("MelakaRice");
  const melakaRice = await MelakaRice.deploy();
  const MelakaResident = await ethers.getContractFactory("MelakaResident");
  const melakaResident = await MelakaResident.deploy(melakaRice.address);

  console.log(`MelakaRice deployed to     : ${melakaRice.address}`);
  console.log(`MelakaResident deployed to : ${melakaResident.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
