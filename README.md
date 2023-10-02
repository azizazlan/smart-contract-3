# Smart contract part 3

## NFT and FT

MelakaResident is NFT smart contract (ERC721), and MelakaRice is FT smart contract (ERC20). The NFT smart contract allows government official to add (Melaka) resident to a whitelist and transfer FT to resident. Transfer FT to a resident not on the whitelist will fail.

Only goverment official granted as GOVERNMENT_OFFICER_ROLE role can add and remove resident from whitelist. Public or anyone can verify that claimant is a resident.

## Frontend

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

        <FormControl fullWidth margin="dense">
          <InputLabel id="allowance-label">
            Number of allowance tokens
          </InputLabel>
          <Controller
            name="allowances"
            control={control}
            render={({ field }) => (
              <Select
                fullWidth
                labelId="allowance-label"
                id="allowance"
                label="Number of allowance tokens"
                {...field}
              >
                <MenuItem value={1000} selected>
                  1,000
                </MenuItem>
                <MenuItem value={10000}>10,000</MenuItem>
                <MenuItem value={100000}>100,000</MenuItem>
              </Select>
            )}
          />
          {errors.allowances ? (
            <FormHelperText error>{errors.allowances?.message}</FormHelperText>
          ) : (
            <FormHelperText>
              Number of allowance MelakaSubsidy rice and wheat flour tokens to
              approve
            </FormHelperText>
          )}
        </FormControl>
