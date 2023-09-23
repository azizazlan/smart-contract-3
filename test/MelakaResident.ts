import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MelakaResident and MelakaRice", function () {
  const MINTER_ROLE: string = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("MINTER_ROLE")
  );
  const GOVERNMENT_OFFICER_ROLE: string = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("GOVERNMENT_OFFICER_ROLE")
  );
  const SUBSIDY_RECIPIENT: string = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("SUBSIDY_RECIPIENT")
  );

  async function deployContracts() {
    const [resident1, resident2, officer1, officer2] =
      await ethers.getSigners();
    const MelakaRice = await ethers.getContractFactory("MelakaRice");
    const melakaRice = await MelakaRice.connect(officer1).deploy();
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
        await melakaResident.hasRole(SUBSIDY_RECIPIENT, resident1.address)
      ).to.be.true;
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
      // Test if RoleGranted got emitted
      const transactionAdd = await melakaResident
        .connect(officer1)
        .addResidentWhitelist(resident1.address, nric1);
      await transactionAdd.wait();
      const receiptAdd = await ethers.provider.getTransactionReceipt(
        transactionAdd.hash
      );
      const eventsAdd = melakaResident.interface.parseLog(receiptAdd.logs[0]);
      expect(eventsAdd.name).to.equal("RoleGranted");
      expect(eventsAdd.args[0]).to.equal(SUBSIDY_RECIPIENT);
      await expect(
        await melakaResident.hasRole(SUBSIDY_RECIPIENT, resident1.address)
      ).to.be.true;
      // Now remove resident1 from white list
      const transactionRm = await melakaResident
        .connect(officer1)
        .removeResidentWhitelist(resident1.address, nric1);
      await transactionRm.wait();
      const receiptRm = await ethers.provider.getTransactionReceipt(
        transactionRm.hash
      );
      const eventsRm = melakaResident.interface.parseLog(receiptRm.logs[0]);
      expect(eventsRm.name).to.equal("RoleRevoked");
      expect(eventsRm.args[0]).to.equal(SUBSIDY_RECIPIENT);
      await expect(
        await melakaResident.hasRole(SUBSIDY_RECIPIENT, resident1.address)
      ).to.be.false;
      await expect(
        await melakaResident.isResidentWhitelisted(resident1.address)
      ).to.be.false;
    });
    it("Resident not add in whitelist should have no subsidy role", async function () {
      const { melakaResident, resident1 } = await loadFixture(deployContracts);
      await expect(
        await melakaResident.hasRole(SUBSIDY_RECIPIENT, resident1.address)
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

  describe("Transfer FT MelakaRice to residents", function () {
    it("Should revert when resident has yet in whitelist", async function () {
      const { melakaResident, resident1 } = await loadFixture(deployContracts);
      await expect(melakaResident.transferFTToResident(resident1.address)).to.be
        .reverted;
      await expect(
        melakaResident.transferFTToResident(resident1.address)
      ).to.be.rejectedWith("Resident not in whitelist");
    });
    it("Recipient should receive FT", async function () {
      const { melakaResident, melakaRice, officer1, officer2, resident1 } =
        await loadFixture(deployContracts);
      await melakaRice.grantRole(MINTER_ROLE, melakaResident.address);
      await melakaResident.grantRole(GOVERNMENT_OFFICER_ROLE, officer1.address);
      const nric1 = ethers.utils.formatBytes32String("760119097876");
      await melakaResident
        .connect(officer1)
        .addResidentWhitelist(resident1.address, nric1);
      const initialAllowance = ethers.utils.parseUnits("100", 18); // Initial allowance
      // Grant the MINTER_ROLE to an address other than melakaResident
      await melakaRice.grantRole(MINTER_ROLE, officer2.address);
      // Set the initial allowance for melakaResident
      await melakaRice.approve(melakaResident.address, initialAllowance);
      // Attempt to transfer tokens from melakaResident to resident1
      await melakaResident.transferFTToResident(resident1.address);
      // Check the balance of the resident
      const residentBalance = await melakaRice.balanceOf(resident1.address);
      expect(residentBalance).to.equal(1);
    });
  });

  describe("Verify resident", function () {
    it("Should return true if added to whitelist", async function () {
      const { melakaResident, officer1, resident1 } = await loadFixture(
        deployContracts
      );
      await melakaResident.grantRole(GOVERNMENT_OFFICER_ROLE, officer1.address);
      const nric1 = ethers.utils.formatBytes32String("760119097876");
      await melakaResident.addResidentWhitelist(resident1.address, nric1);
      await expect(
        await melakaResident.verifyWhitelistedResident(resident1.address, nric1)
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
