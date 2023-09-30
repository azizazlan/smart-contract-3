import { Box, Alert, AlertTitle, Typography } from '@mui/material';
import truncateEthAddr from '../../utils/truncateEthAddr';

type NonOwnerAlertProps = {
  publicKey: string;
};

// Display alert panel when public key is not an owner
export default function NonOwnerAlert(props: NonOwnerAlertProps) {
  const { publicKey } = props;
  return (
    <Box>
      <Alert sx={{ marginTop: 1 }} severity="warning" icon={false}>
        <b>WARNING! </b>Ensure that the public key{' '}
        <b>
          <code>{truncateEthAddr(publicKey)}</code>
        </b>{' '}
        above was the deployer and initial owner of contracts.
      </Alert>
      <Alert
        severity="info"
        variant="outlined"
        icon={false}
        sx={{ marginTop: 1 }}
      >
        <AlertTitle sx={{ fontWeight: 'bold' }}>A. Solution</AlertTitle>
        <Typography component="span" variant="body2" color="primary">
          <ol>
            <li>
              Ensure the Metamask is connected to an active RPC and this web
              page.
            </li>
            <li>
              On this page, click{' '}
              <span style={{ fontFamily: 'Oswald' }}>
                <b>Change account</b>
              </span>
              {'...'}
              and try to key other private key.
            </li>
            <li>
              Reload this page. If still fail, try Solution <b>B</b> below.
            </li>
          </ol>
        </Typography>
      </Alert>
      <Alert
        severity="info"
        variant="outlined"
        icon={false}
        sx={{ marginTop: 1 }}
      >
        <AlertTitle sx={{ fontWeight: 'bold' }}>B. Solution</AlertTitle>
        <Typography component="span" variant="body2" color="primary">
          <ol>
            <li>
              Ensure the Metamask is connected to an active RPC and this web
              page.
            </li>
            <li>
              Ensure the selected account have some ETH balance and note down{' '}
              <code>private key</code>.
            </li>
            <li>
              In the <code>scripts/deploy.ts</code> and edit the{' '}
              <code>METAMASK_PRIVATE_KEY</code> value with the{' '}
              <code>private key</code> above.
            </li>
            <li>
              Then run deploy script: <br />
              <code>npx hardhat run --network localhost scripts/deploy.ts</code>
            </li>
            <li>
              Note down the contract addresses. For example:
              <br />
              <code>
                MelakaRice deployed to :
                0x850EC3780CeDfdb116E38B009d0bf7a1ef1b8b38
              </code>
              <br />
              <code>
                MelakaResident deployed to :
                0x1ACcBD355245AbA93CE46D33ab1D0152CE33Fd00
              </code>
            </li>
            <li>
              Edit the <code>frontend/.env</code> file as the followings:
              <br />
              <code>
                VITE_APP_ADDR_MLK_RICE=0x850EC3780CeDfdb116E38B009d0bf7a1ef1b8b38
              </code>
              <br />
              <code>
                VITE_APP_ADDR_MLK_RESIDENT=0x1ACcBD355245AbA93CE46D33ab1D0152CE33Fd00
              </code>
            </li>
            <li>
              Re-build the frontend: <code>npm run build</code>
            </li>
            <li>Reload this page.</li>
          </ol>
        </Typography>
      </Alert>
    </Box>
  );
}
