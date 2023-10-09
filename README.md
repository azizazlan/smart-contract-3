# Smart contract part 3

## NFT and FT

MelakaResidentId is NFT smart contract (ERC721), and MelakaSubsidy is hybrid smart contract (ERC1155). MelakaResidentId smart contract allows state official to award resident id to resident.

MelakaSubsidy smart contract represent subsidy items which can be bag of rice, wheat flour and etc. State official can transfer MelakaSubsidy tokens to residents.

Only goverment official granted as GOVERNMENT_OFFICER_ROLE role can add and remove resident from whitelist. Public or anyone can verify that claimant is a resident.

## Frontend

```shell
npx hardhat test test/MelakaResidentSubsidy.ts
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
