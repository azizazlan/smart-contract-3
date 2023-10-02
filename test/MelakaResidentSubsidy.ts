import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, utils } from "ethers";

describe("MelakaSubsidy", function () {
  const MINTER_ROLE: string = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("MINTER_ROLE")
  );
  const GOVERNMENT_OFFICER_ROLE: string = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("GOVERNMENT_OFFICER_ROLE")
  );

  const BAG_070KG_RICE = 0;
  const BAG_001KG_WHEATFLOUR = 1;

  async function deployContracts() {
    const [resident1, resident2, officer1, officer2] =
      await ethers.getSigners();

    const MelakaResidentId = await ethers.getContractFactory(
      "MelakaResidentId"
    );
    const melakaId = await MelakaResidentId.connect(officer1).deploy();

    const MelakaSubsidy = await ethers.getContractFactory("MelakaSubsidy");
    const melakaSubsidy = await MelakaSubsidy.connect(officer1).deploy();

    return {
      melakaId,
      melakaSubsidy,
      resident1,
      resident2,
      officer1,
      officer2,
    };
  }

  describe("Officer 2 transactions", function () {
    it("Should able to transfer subsidy to resident when officer2 has a role", async function () {
      const { melakaId, melakaSubsidy, officer1, officer2, resident1 } =
        await loadFixture(deployContracts);

      // grant role
      await melakaId.connect(officer1).grantRole(MINTER_ROLE, officer2.address);
      await melakaSubsidy
        .connect(officer1)
        .grantRole(MINTER_ROLE, officer2.address);
      // approve and mint one token
      const oneToken = BigNumber.from("1");
      const metadataBytes = ethers.utils.toUtf8Bytes("MetadataRiceBatch2023");
      await melakaSubsidy.connect(officer1).approve(officer2.address, oneToken);
      await melakaSubsidy
        .connect(officer1)
        .mint(officer2.address, BAG_070KG_RICE, oneToken, metadataBytes);

      const nric = 123456789012;
      await melakaId.connect(officer2).mintIdentity(resident1.address, nric);
      // Ensure the user has an identity
      const hasIdentity = await melakaId.nationalIdToAddress(nric);
      expect(hasIdentity).to.equal(resident1.address);
      await melakaSubsidy.connect(officer2).setWhitelisted(nric, true);

      await melakaSubsidy.transferTokens(
        officer2.address,
        resident1.address,
        0,
        oneToken
      );
      const resBal = await melakaSubsidy.balanceOf(
        resident1.address,
        BAG_070KG_RICE
      );
      expect(resBal).equals(oneToken);
    });

    it("Should fail to transfer to resident when officer2 exceeded allowance", async function () {
      const { melakaId, melakaSubsidy, officer1, officer2, resident1 } =
        await loadFixture(deployContracts);

      // grant role
      await melakaId.connect(officer1).grantRole(MINTER_ROLE, officer2.address);
      await melakaSubsidy
        .connect(officer1)
        .grantRole(MINTER_ROLE, officer2.address);
      // approve and mint one token
      const oneToken = BigNumber.from("1");
      const metadataBytes = ethers.utils.toUtf8Bytes("MetadataRiceBatch2023");
      await melakaSubsidy.connect(officer1).approve(officer2.address, oneToken);
      await melakaSubsidy
        .connect(officer1)
        .mint(officer2.address, BAG_070KG_RICE, oneToken, metadataBytes);

      const nric = 123456789012;
      await melakaId.connect(officer2).mintIdentity(resident1.address, nric);
      // Ensure the user has an identity
      const hasIdentity = await melakaId.nationalIdToAddress(nric);
      expect(hasIdentity).to.equal(resident1.address);
      await melakaSubsidy.connect(officer2).setWhitelisted(nric, true);

      const twoTokens = BigNumber.from("2");
      await expect(
        melakaSubsidy.transferTokens(
          officer2.address,
          resident1.address,
          0,
          twoTokens
        )
      ).to.be.revertedWith("Allowance exceeded");
    });
  });
});
