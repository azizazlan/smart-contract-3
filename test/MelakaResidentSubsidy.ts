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

      // Check event
      const filter = melakaSubsidy.filters.TransferSingle(
        null, //operator,
        null, // from,
        null, // to,
        null, // id
        null // value
      );
      const updatedEvents = await melakaSubsidy.queryFilter(filter);
      console.log("\r\n");
      console.log(`TransferSingle event - by mint to approve allowance`);
      console.log(updatedEvents);

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
      console.log("\r\n");
      console.log(`Transfer event - by mintIdentity`);
      console.log(updatedEvents2);

      // Ensure the user has an identity
      const hasIdentity = await melakaId.nationalIdToAddress(nric);
      console.log(hasIdentity);
      expect(hasIdentity).to.equal(resident1.address);
      await melakaSubsidy.connect(officer2).setWhitelisted(nric, true);

      const filter3 = melakaSubsidy.filters.WhitelistingEvent(
        null, // id,
        null, // bool status,
        null // timestamp
      );
      const updatedEvents3 = await melakaSubsidy.queryFilter(filter3);
      console.log("\r\n");
      console.log(`WhitelistingEvent event - by setWhitelisted`);
      console.log(updatedEvents3);

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
        .mint(officer2.address, BAG_070KG_RICE, oneToken, metadataBytes);

      const nric = 123456789012;
      await melakaId.connect(officer2).mintIdentity(resident1.address, nric);
      // Ensure the user has an identity
      const hasIdentity = await melakaId.nationalIdToAddress(nric);
      console.log(hasIdentity);
      expect(hasIdentity).to.equal(resident1.address);
      await melakaSubsidy.connect(officer2).setWhitelisted(nric, true);

      const filter = melakaSubsidy.filters.TransferSubsidyEvent(
        null, // from
        null, // to
        null, // tokenId
        null, // value
        null // timestamp
      );

      await melakaSubsidy.transferTokens(
        officer2.address,
        resident1.address,
        0,
        oneToken
      );

      const updatedEvents = await melakaSubsidy.queryFilter(filter);
      const unixTimestamp = updatedEvents[0].args.timestamp;
      const date = new Date(unixTimestamp.toNumber());
      console.log(format(date, "hh:mm:ss  dd-MM-yyyy"));
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

      // Get the metadata back
      const uri = await melakaSubsidy.uri(BAG_070KG_RICE);
      console.log(uri);

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
