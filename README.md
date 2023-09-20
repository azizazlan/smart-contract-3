# Smart contract part 3

MelakaResident is NFT smart contract (ERC721), and MelakaRice is FT smart contract (ERC20). The NFT smart contract allows government official to add (Melaka) resident to a whitelist and transfer FT to resident. Transfer FT to a resident not on the whitelist will fail.

Only goverment official granted as GOVERNMENT_OFFICER_ROLE role can add and remove resident from whitelist. Public or anyone can verify that claimant is a resident.

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
