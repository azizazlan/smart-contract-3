import { Box, ListItemAvatar, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { Link } from 'react-router-dom';
import truncateEthAddr from '../../utils/truncateEthAddr';
import NonOwnerAlert from './NonOwnerAlert';

const melaka_resident_contract_addr = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;
const melaka_rice_contract_addr = import.meta.env.VITE_APP_ADDR_MLK_RICE;

type InfoTabProps = {
  chainId: string;
  publicKey: string;
  etherBal: string;
  isGomenOfficer: boolean;
  riceTokenBal: string;
  riceTokenTotalSupply: string;
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

function Value(props: { value: string }) {
  return (
    <Typography component="span" variant="body1">
      {props.value}
    </Typography>
  );
}

export default function InfoTab(props: InfoTabProps) {
  const {
    publicKey,
    etherBal,
    isGomenOfficer,
    riceTokenTotalSupply,
    riceTokenBal,
  } = props;
  return (
    <List sx={{ width: '100%', marginTop: 3 }} disablePadding>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <ListItem key={1} disablePadding sx={{ maxWidth: '215px' }}>
          <ListItemAvatar sx={{ marginRight: 1 }}>
            <Jazzicon diameter={55} seed={jsNumberForAddress(publicKey)} />
          </ListItemAvatar>
          <ListItemText
            primary={<Label label="Public key" />}
            secondary={<Value value={truncateEthAddr(publicKey)} />}
          />
        </ListItem>
        <ListItem key={2} disablePadding sx={{ maxWidth: '255px' }}>
          <ListItemText
            primary={<Label label="Ether balance" />}
            secondary={<Value value={etherBal} />}
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
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <ListItem key={4} disablePadding sx={{ maxWidth: '215px' }}>
              <ListItemText
                primary={<Label label="MelakaRice owner at" />}
                secondary={
                  <Value value={truncateEthAddr(melaka_rice_contract_addr)} />
                }
              />
            </ListItem>
            <ListItem key={'4_1'} disablePadding sx={{ maxWidth: '255px' }}>
              <ListItemText
                primary={<Label label="Total supply" />}
                secondary={<Value value={riceTokenTotalSupply} />}
              />
            </ListItem>
            <ListItem key={'4_2'} disablePadding sx={{ maxWidth: '255px' }}>
              <ListItemText
                primary={<Label label="Balance" />}
                secondary={<Value value={riceTokenBal} />}
              />
            </ListItem>
          </Box>
        </div>
      ) : (
        <NonOwnerAlert publicKey={publicKey} />
      )}
    </List>
  );
}
