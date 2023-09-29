import {
  Alert,
  AlertTitle,
  Box,
  Divider,
  ListItemAvatar,
  Typography,
} from '@mui/material';
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
  const { publicKey, balance, isGomenOfficer } = props;
  return (
    <List sx={{ width: '100%' }} disablePadding>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <ListItem key={1} disablePadding sx={{ maxWidth: '195px' }}>
          <ListItemAvatar sx={{ marginRight: 1 }}>
            <Jazzicon diameter={55} seed={jsNumberForAddress(publicKey)} />
          </ListItemAvatar>
          <ListItemText
            primary={<Label label="Public key" />}
            secondary={<Value value={truncateEthAddr(publicKey)} />}
          />
        </ListItem>
        <ListItem key={2} disablePadding sx={{ maxWidth: '215px' }}>
          <ListItemText
            primary={<Label label="Ether balance" />}
            secondary={<Value value={balance} />}
          />
        </ListItem>
        <Link
          to="/admin/account"
          style={{
            fontFamily: 'Oswald',
            textDecoration: 'none',
            fontSize: '10pt',
            color: 'navy',
            paddingTop: 7,
          }}
        >
          Change account ...
        </Link>
      </Box>
      <Box sx={{ height: '17px' }} />
      {isGomenOfficer ? (
        <div>
          <ListItem key={3} disablePadding>
            <ListItemText
              primary={<Label label="MelakaResident owner at" />}
              secondary={
                <Value value={truncateEthAddr(melaka_resident_contract_addr)} />
              }
            />
          </ListItem>
          <ListItem key={4} disablePadding>
            <ListItemText
              primary={<Label label="MelakaRice owner at" />}
              secondary={
                <Value value={truncateEthAddr(melaka_rice_contract_addr)} />
              }
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
