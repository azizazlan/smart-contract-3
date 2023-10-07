import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, utils } from "ethers";
import { format } from "date-fns";

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
    const [resident1, resident2, officer1, officer2, merchant] =
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
      merchant,
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
        .setTokensQuota(
          officer2.address,
          BAG_070KG_RICE,
          oneToken,
          metadataBytes
        );

      // Check event
      const filter = melakaSubsidy.filters.TransferSingle(
        null, //operator,
        null, // from,
        null, // to,
        null, // id
        null // value
      );
      const updatedEvents = await melakaSubsidy.queryFilter(filter);
      // console.log("\r\n");
      // console.log(`TransferSingle event - by mint to approve allowance`);
      // console.log(updatedEvents);

      const nric = 123456789012;
      await melakaId.connect(officer2).mintIdentity(resident1.address, nric);

      // Check Transfer event when call mintIdentity
      // Transfer(address indexed from, address indexed to, uint256 indexed tokenId)
      const filter2 = melakaId.filters.Transfer(
        null, // from,
        null, // to,
        null // tokenId
      );
      const updatedEvents2 = await melakaId.queryFilter(filter2);
      // console.log("\r\n");
      // console.log(`Transfer event - by mintIdentity`);
      // console.log(updatedEvents2);

      // Ensure the user has an identity
      const hasIdentity = await melakaId.nationalIdToAddress(nric);
      // console.log(hasIdentity);
      expect(hasIdentity).to.equal(resident1.address);
      await melakaSubsidy.connect(officer2).setWhitelisted(nric, true);

      const filter3 = melakaSubsidy.filters.WhitelistingEvent(
        null, // id,
        null, // bool status,
        null // timestamp
      );
      const updatedEvents3 = await melakaSubsidy.queryFilter(filter3);
      // console.log("\r\n");
      // console.log(`WhitelistingEvent event - by setWhitelisted`);
      // console.log(updatedEvents3);

      await melakaSubsidy.transferSubsidyTokens(
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

    it("Should emit TransferSubsidyEvent when  transfer subsidy to resident when officer2 has a role", async function () {
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
        .setTokensQuota(
          officer2.address,
          BAG_070KG_RICE,
          oneToken,
          metadataBytes
        );

      const nric = 123456789012;
      await melakaId.connect(officer2).mintIdentity(resident1.address, nric);
      // Ensure the user has an identity
      const hasIdentity = await melakaId.nationalIdToAddress(nric);
      // console.log(hasIdentity);
      expect(hasIdentity).to.equal(resident1.address);
      await melakaSubsidy.connect(officer2).setWhitelisted(nric, true);

      const filter = melakaSubsidy.filters.TransferSubsidyEvent(
        null, // from
        null, // to
        null, // tokenId
        null, // value
        null // timestamp
      );

      await melakaSubsidy.transferSubsidyTokens(
        officer2.address,
        resident1.address,
        0,
        oneToken
      );

      const updatedEvents = await melakaSubsidy.queryFilter(filter);
      const unixTimestamp = updatedEvents[0].args.timestamp;
      const date = new Date(unixTimestamp.toNumber());
      // console.log(format(date, "hh:mm:ss  dd-MM-yyyy"));
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
        .setTokensQuota(
          officer2.address,
          BAG_070KG_RICE,
          oneToken,
          metadataBytes
        );

      // Get the metadata back
      const uri = await melakaSubsidy.uri(BAG_070KG_RICE);
      // console.log(uri);

      const nric = 123456789012;
      await melakaId.connect(officer2).mintIdentity(resident1.address, nric);
      // Ensure the user has an identity
      const hasIdentity = await melakaId.nationalIdToAddress(nric);
      expect(hasIdentity).to.equal(resident1.address);
      await melakaSubsidy.connect(officer2).setWhitelisted(nric, true);

      const twoTokens = BigNumber.from("2");
      await expect(
        melakaSubsidy.transferSubsidyTokens(
          officer2.address,
          resident1.address,
          0,
          twoTokens
        )
      ).to.be.revertedWith("Allowance exceeded");
    });
  });
  describe("Token claim", function () {
    it("Fail to claim when resident nric not correct", async function () {
      const {
        melakaId,
        melakaSubsidy,
        officer1,
        officer2,
        resident1,
        merchant,
      } = await loadFixture(deployContracts);
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
        .setTokensQuota(
          officer2.address,
          BAG_070KG_RICE,
          oneToken,
          metadataBytes
        );
      const residentNric = 123456789012;
      await melakaId
        .connect(officer2)
        .mintIdentity(resident1.address, residentNric);
      await melakaSubsidy.connect(officer2).setWhitelisted(residentNric, true);
      await melakaSubsidy.transferSubsidyTokens(
        officer2.address,
        resident1.address,
        BAG_070KG_RICE,
        oneToken
      );
      const residentTokenBal = await melakaSubsidy.balanceOf(
        resident1.address,
        BAG_070KG_RICE
      );
      expect(residentTokenBal).equals(1);
      const residentIncorrectNric = 123456789013;
      await expect(
        melakaSubsidy
          .connect(resident1)
          .claimTokens(
            residentIncorrectNric,
            merchant.address,
            BAG_070KG_RICE,
            oneToken
          )
      ).to.be.revertedWith("NRIC not whitelisted");
    });
    it("Fail to claim when no token balance", async function () {
      const {
        melakaId,
        melakaSubsidy,
        officer1,
        officer2,
        resident1,
        merchant,
      } = await loadFixture(deployContracts);
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
        .setTokensQuota(
          officer2.address,
          BAG_070KG_RICE,
          oneToken,
          metadataBytes
        );
      const residentNric = 123456789012;
      await melakaId
        .connect(officer2)
        .mintIdentity(resident1.address, residentNric);
      await melakaSubsidy.connect(officer2).setWhitelisted(residentNric, true);

      await expect(
        melakaSubsidy
          .connect(resident1)
          .claimTokens(residentNric, merchant.address, BAG_070KG_RICE, oneToken)
      ).to.be.revertedWith("Insufficient token");
    });

    it("Should able to claim and result resident token balance to zero", async function () {
      const {
        melakaId,
        melakaSubsidy,
        officer1,
        officer2,
        resident1,
        merchant,
      } = await loadFixture(deployContracts);
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
        .setTokensQuota(
          officer2.address,
          BAG_070KG_RICE,
          oneToken,
          metadataBytes
        );
      const residentNric = 123456789012;
      await melakaId
        .connect(officer2)
        .mintIdentity(resident1.address, residentNric);
      await melakaSubsidy.connect(officer2).setWhitelisted(residentNric, true);

      await melakaSubsidy.transferSubsidyTokens(
        officer2.address,
        resident1.address,
        BAG_070KG_RICE,
        oneToken
      );
      const tokenBalBeforeClaim = await melakaSubsidy.balanceOf(
        resident1.address,
        BAG_070KG_RICE
      );
      expect(tokenBalBeforeClaim).equals(1);

      await melakaSubsidy
        .connect(resident1)
        .claimTokens(residentNric, merchant.address, BAG_070KG_RICE, oneToken);

      const filter = melakaSubsidy.filters.ClaimTokensEvent(
        null, // from
        null, // to
        null, // tokenId
        null, // amount
        null // timestamp
      );
      const updatedEvents = await melakaSubsidy.queryFilter(filter);
      for (const event of updatedEvents) {
        const eventToAddress = event.args.to; // Get the "to" address from the event
        expect(eventToAddress).equals(merchant.address);
        const tokenId = event.args.id;
        expect(tokenId).equals(BAG_070KG_RICE);
        const amount = event.args.amount; // Get the "to" address from the event
        expect(amount).equals(1);
      }

      const tokenBalPostClaim = await melakaSubsidy.balanceOf(
        resident1.address,
        BAG_070KG_RICE
      );
      expect(tokenBalPostClaim).equals(0);

      const merchantTokenBal = await melakaSubsidy.balanceOf(
        merchant.address,
        BAG_070KG_RICE
      );
      expect(merchantTokenBal).equals(1);
    });
  });
});
