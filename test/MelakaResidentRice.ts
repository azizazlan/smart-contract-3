import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, utils } from "ethers";

describe("MelakaResident and MelakaRice", function () {
  const MINTER_ROLE: string = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("MINTER_ROLE")
  );
  const GOVERNMENT_OFFICER_ROLE: string = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("GOVERNMENT_OFFICER_ROLE")
  );

  async function deployContracts() {
    const [resident1, resident2, officer1, officer2] =
      await ethers.getSigners();

    // Set the initial supply you want to assign
    const initialSupply = ethers.utils.parseEther("1000000"); // For example, 1,000,000 tokens

    const MelakaRice = await ethers.getContractFactory("MelakaRice");
    const melakaRice = await MelakaRice.connect(officer1).deploy(initialSupply);
    const MelakaResident = await ethers.getContractFactory("MelakaResident");
    const melakaResident = await MelakaResident.connect(officer1).deploy(
      melakaRice.address
    );
    await melakaRice.grantRole(MINTER_ROLE, melakaResident.address);

    return {
      melakaResident,
      melakaRice,
      resident1,
      resident2,
      officer1,
      officer2,
    };
  }

  describe("MelakaRice deployment", function () {
    it("Should have initial total supply", async function () {
      const initialSupply = ethers.utils.parseEther("1000000"); // For example, 1,000,000 tokens
      const { melakaRice } = await loadFixture(deployContracts);
      expect(await melakaRice.totalSupply()).equal(initialSupply);
    });
  });

  describe("MelakaResident deploy stage", function () {
    it("Should have correct name", async function () {
      const { melakaResident } = await loadFixture(deployContracts);
      await expect(await melakaResident.name()).to.equal(
        "Melaka Resident Identifier"
      );
    });
    it("Should have correct symbol", async function () {
      const { melakaResident } = await loadFixture(deployContracts);
      await expect(await melakaResident.symbol()).to.equal("MLKID");
    });
    it("Should have zero total supply at deployment", async function () {
      const { melakaResident } = await loadFixture(deployContracts);
      await expect(await melakaResident.totalSupply()).to.equal(0);
    });
  });

  describe("MelakaResident as Identifier", function () {
    it("Should be false when none is awarded as resident", async function () {
      const { melakaResident, officer2 } = await loadFixture(deployContracts);
      const nric = ethers.utils.formatBytes32String("777766554432");
      await expect(await melakaResident.verifyResident(officer2.address, nric))
        .to.be.false;
    });
    it("Owner officer1 should able to award residential status", async function () {
      const { melakaResident, officer1, officer2 } = await loadFixture(
        deployContracts
      );
      const nric = ethers.utils.formatBytes32String("777766554432");
      await melakaResident
        .connect(officer1)
        .awardResidentialStatus(officer2.address, nric);
      const isResidentAddrOK = await melakaResident.residents(officer2.address);
      const isResidentNricOK = await melakaResident.residentNrics(nric);
      expect(isResidentAddrOK && isResidentNricOK).to.be.true;

      // or use a method
      await expect(await melakaResident.verifyResident(officer2.address, nric))
        .to.be.true;
    });
    it("Non-owner officer2 should NOT be able to award residential status", async function () {
      const { melakaResident, officer2, resident1 } = await loadFixture(
        deployContracts
      );
      const nric = ethers.utils.formatBytes32String("777766554432");
      await expect(
        melakaResident
          .connect(officer2)
          .awardResidentialStatus(resident1.address, nric)
      ).to.be.reverted;
    });
  });

  describe("MelakaResident MINTER_ROLE and SUBSIDY_RECIPIENT roles", function () {
    it("Officer 1 should be the default minter", async function () {
      const { melakaResident, officer1 } = await loadFixture(deployContracts);
      await expect(await melakaResident.hasRole(MINTER_ROLE, officer1.address))
        .to.be.true;
    });
    it("Officer 1 should be able to add resident white list", async function () {
      const { melakaResident, resident1, officer1 } = await loadFixture(
        deployContracts
      );
      await melakaResident.grantRole(GOVERNMENT_OFFICER_ROLE, officer1.address);
      const nric1 = ethers.utils.formatBytes32String("760119097876");
      await melakaResident
        .connect(officer1)
        .addResidentWhitelist(resident1.address, nric1);
      await expect(
        await melakaResident.isResidentWhitelisted(resident1.address)
      ).to.be.true;
    });
    it("Officer 1 should be able to add and remove resident white list", async function () {
      const { melakaResident, officer1, resident1 } = await loadFixture(
        deployContracts
      );
      await melakaResident.grantRole(GOVERNMENT_OFFICER_ROLE, officer1.address);
      const nric1 = ethers.utils.formatBytes32String("760119097876");

      await melakaResident
        .connect(officer1)
        .addResidentWhitelist(resident1.address, nric1);

      // Now remove resident1 from white list
      const transactionRm = await melakaResident
        .connect(officer1)
        .removeResidentWhitelist(resident1.address, nric1);

      await expect(
        await melakaResident.isResidentWhitelisted(resident1.address)
      ).to.be.false;
    });
    it("Should reject when recipient #2 attempts to add a same NRIC", async function () {
      const { melakaResident, officer1, resident1, resident2 } =
        await loadFixture(deployContracts);
      await melakaResident.grantRole(GOVERNMENT_OFFICER_ROLE, officer1.address);
      const nric1 = ethers.utils.formatBytes32String("760119097876");
      await melakaResident
        .connect(officer1)
        .addResidentWhitelist(resident1.address, nric1);
      // Resident #2 attempts to add the duplicated or same NRIC
      await expect(
        melakaResident
          .connect(officer1)
          .addResidentWhitelist(resident2.address, nric1)
      ).to.be.revertedWith("Resident NRIC is already whitelisted");
      await expect(
        await melakaResident.isResidentWhitelisted(resident2.address)
      ).to.be.false;
    });
  });

  // describe("Transfer FT MelakaRice to officer", function () {
  //   it("Should revert when resident has yet in whitelist", async function () {
  //     const { melakaResident, resident1 } = await loadFixture(deployContracts);
  //     await expect(melakaResident.transferFTToResident(resident1.address)).to.be
  //       .reverted;
  //     await expect(
  //       melakaResident.transferFTToResident(resident1.address)
  //     ).to.be.rejectedWith("Resident not in whitelist");
  //   });
  //   it("Officer should receive FT", async function () {
  //     const { melakaResident, melakaRice, officer1, officer2 } =
  //       await loadFixture(deployContracts);
  //     const oneToken = BigNumber.from("1001");
  //     await melakaRice.approve(melakaResident.address, oneToken);
  //     await melakaResident.connect(officer1).awardAsOfficer(officer2.address);
  //     const allowance = await melakaRice.balanceOf(officer2.address);
  //     await expect(allowance).equals(1000);
  //   });
  // });

  describe("Transfer FT MelakaRice to resident", function () {
    it("Non-resident fail to receive FT from authorised officer", async function () {
      const { melakaResident, melakaRice, officer1, resident1 } =
        await loadFixture(deployContracts);

      const oneToken = BigNumber.from("1");
      await melakaRice.approve(melakaResident.address, oneToken);
    });
    it("Resident fail to receive FT from non officer", async function () {
      const { melakaResident, melakaRice, officer2, resident1 } =
        await loadFixture(deployContracts);
      const nric1 = ethers.utils.formatBytes32String("760119097876");
      await melakaResident.addResidentWhitelist(resident1.address, nric1);

      const oneToken = BigNumber.from("1");
      await expect(
        melakaRice
          .connect(officer2)
          .transferFrom(officer2.address, resident1.address, oneToken)
      ).to.be.reverted;
    });

    it("Resident should receive FT from officer1", async function () {
      const { melakaResident, melakaRice, officer1, officer2, resident1 } =
        await loadFixture(deployContracts);
      const nric1 = ethers.utils.formatBytes32String("760119097876");
      await melakaResident.addResidentWhitelist(resident1.address, nric1);
      const oneToken = BigNumber.from("1");
      await melakaRice.approve(officer1.address, oneToken);

      await melakaRice
        .connect(officer1)
        .transferFrom(officer1.address, resident1.address, oneToken);
      await expect(await melakaRice.balanceOf(resident1.address)).equals(
        oneToken
      );
    });

    it("Resident should receive FT from another officer2", async function () {
      const { melakaResident, melakaRice, officer1, officer2, resident1 } =
        await loadFixture(deployContracts);
      // const nric1 = ethers.utils.formatBytes32String("760119097876");
      // await melakaResident.addResidentWhitelist(resident1.address, nric1);

      const allowedTokens = BigNumber.from("10000");
      await melakaRice
        .connect(officer1)
        .approve(officer2.address, allowedTokens);

      const allowances = await melakaRice.allowance(
        officer1.address,
        officer2.address
      );
      // console.log(allowances);

      const oneToken = BigNumber.from("1");
      await melakaRice
        .connect(officer2)
        .transferFrom(officer1.address, resident1.address, oneToken);

      const resBal = await melakaRice.balanceOf(resident1.address);
      await expect(resBal).equals(oneToken);
    });
  });

  describe("Verify resident", function () {
    it("Should return true if added to whitelist", async function () {
      const { melakaResident, officer2, resident2 } = await loadFixture(
        deployContracts
      );
      await melakaResident.grantRole(GOVERNMENT_OFFICER_ROLE, officer2.address);
      const nric2 = ethers.utils.formatBytes32String("760119097822");

      await melakaResident
        .connect(officer2)
        .awardResidentialStatus(resident2.address, nric2);

      await melakaResident
        .connect(officer2)
        .addResidentWhitelist(resident2.address, nric2);

      await expect(await melakaResident.whitelistedResidents(resident2.address))
        .to.be.true;
      await expect(await melakaResident.whitelistedResidentNrics(nric2)).to.be
        .true;
      await expect(await melakaResident.residents(resident2.address)).to.be
        .true;
      await expect(await melakaResident.residentNrics(nric2)).to.be.true;

      await expect(
        await melakaResident.verifyWhitelistedResident(resident2.address, nric2)
      ).to.be.true;
    });
    it("Should return false if not added to whitelist", async function () {
      const { melakaResident, officer1, resident1 } = await loadFixture(
        deployContracts
      );
      await melakaResident.grantRole(GOVERNMENT_OFFICER_ROLE, officer1.address);
      const nric1 = ethers.utils.formatBytes32String("760119097876");
      await expect(
        await melakaResident.verifyWhitelistedResident(resident1.address, nric1)
      ).to.be.false;
    });
    it("Should return false if NRIC is incorrect", async function () {
      const { melakaResident, officer1, resident1 } = await loadFixture(
        deployContracts
      );
      await melakaResident.grantRole(GOVERNMENT_OFFICER_ROLE, officer1.address);
      const nric1 = ethers.utils.formatBytes32String("760119097876");
      await melakaResident.addResidentWhitelist(resident1.address, nric1);
      const falseNric = ethers.utils.formatBytes32String("770119097876");
      await expect(
        await melakaResident.verifyWhitelistedResident(
          resident1.address,
          falseNric
        )
      ).to.be.false;
    });
    it("Should return false if NRIC is correct but wrong resident", async function () {
      const { melakaResident, officer1, resident1, resident2 } =
        await loadFixture(deployContracts);
      await melakaResident.grantRole(GOVERNMENT_OFFICER_ROLE, officer1.address);
      const nric1 = ethers.utils.formatBytes32String("760119097876");
      await melakaResident.addResidentWhitelist(resident1.address, nric1);
      await expect(
        await melakaResident.verifyWhitelistedResident(resident2.address, nric1)
      ).to.be.false;
    });
  });
});
