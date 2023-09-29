import { Alert, AlertTitle, Box, Divider, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import WarningIcon from '@mui/icons-material/Warning';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { Link } from 'react-router-dom';
import truncateEthAddr from '../../utils/truncateEthAddr';

const melaka_resident_contract_addr = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;
const melaka_rice_contract_addr = import.meta.env.VITE_APP_ADDR_MLK_RICE;

type InfoTabProps = {
  chainId: string;
  publicKey: string;
  balance: string;
  isGomenOfficer: boolean;
};

function Label(props: { label: string }) {
  return (
    <Typography
      color="primary"
      component="span"
      variant="body2"
      sx={{ fontFamily: 'Oswald' }}
    >
      {props.label}
    </Typography>
  );
}

function RedLabel(props: { label: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <WarningIcon
        sx={{ fontSize: 15, marginTop: 0.4, marginRight: 0.5 }}
        color="error"
      />
      <Typography
        color="error"
        component="span"
        variant="body2"
        sx={{ fontFamily: 'Oswald' }}
      >
        {props.label}
      </Typography>
    </Box>
  );
}

function Value(props: { value: string }) {
  return (
    <Typography component="span" variant="body1">
      {props.value}
    </Typography>
  );
}

export default function InfoTab(props: InfoTabProps) {
  const { chainId, publicKey, balance, isGomenOfficer } = props;
  return (
    <List sx={{ width: '100%' }} disablePadding>
      <ListItem key={0} disablePadding>
        <ListItemText
          primary={<Label label="NetworkId" />}
          secondary={<Value value={chainId} />}
        />
      </ListItem>
      <Jazzicon diameter={55} seed={jsNumberForAddress(publicKey)} />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {isGomenOfficer ? (
          <ListItem key={1} disablePadding>
            <ListItemText
              primary={<Label label="Public key" />}
              secondary={<Value value={publicKey} />}
            />
          </ListItem>
        ) : (
          <ListItem key={1} disablePadding>
            <ListItemText
              primary={<RedLabel label="Public key is not an officer" />}
              secondary={<Value value={publicKey || 'NA'} />}
            />
          </ListItem>
        )}
        <Link
          to="/admin/account"
          style={{
            fontFamily: 'Oswald',
            textDecoration: 'none',
            fontSize: '11pt',
            color: 'navy',
          }}
        >
          Change account
        </Link>
      </Box>
      <Box sx={{ height: '17px' }} />
      <ListItem key={2} disablePadding>
        <ListItemText
          primary={<Label label="Ether balance" />}
          secondary={<Value value={balance} />}
        />
      </ListItem>
      {isGomenOfficer ? (
        <div>
          <ListItem key={3} disablePadding>
            <ListItemText
              primary={<Label label="MelakaResident address" />}
              secondary={<Value value={melaka_resident_contract_addr} />}
            />
          </ListItem>
          <ListItem key={4} disablePadding>
            <ListItemText
              primary={<Label label="MelakaRice address" />}
              secondary={<Value value={melaka_rice_contract_addr} />}
            />
          </ListItem>
        </div>
      ) : (
        <div>
          <Divider />
          <Alert sx={{ marginTop: 1 }} severity="warning" icon={false}>
            <b>WARNING! </b>Ensure that the public key{' '}
            <b>
              <code>{truncateEthAddr(publicKey)}</code>
            </b>{' '}
            above was the deployer and initial owner of the smart contracts.
            Resolve this before proceeding.
          </Alert>
          <Alert
            severity="info"
            variant="outlined"
            icon={false}
            sx={{ marginTop: 1 }}
          >
            <AlertTitle sx={{ fontWeight: 'bold' }}>Solution steps</AlertTitle>
            <Typography component="span" variant="body2" color="primary">
              <ol>
                <li>Ensure the endpoint rpc is active.</li>
                <li>Ensure the Metamask is connected to this web page.</li>
                <li>
                  Ensure the selected account have some ETH balance and note
                  down <code>private key</code>.
                </li>
                <li>
                  In the <code>scripts/deploy.ts</code> and edit the{' '}
                  <code>METAMASK_PRIVATE_KEY</code> value with the{' '}
                  <code>private key</code> above.
                </li>
                <li>
                  Then run deploy script: <br />
                  <code>
                    npx hardhat run --network localhost scripts/deploy.ts
                  </code>
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
        </div>
      )}
    </List>
  );
}
