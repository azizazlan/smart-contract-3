import { Box, ListItemAvatar, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { Link } from 'react-router-dom';
import truncateEthAddr from '../../utils/truncateEthAddr';
import NonOwnerAlert from './NonOwnerAlert';

const melaka_resident_contract_addr = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENTID;
const melaka_rice_contract_addr = import.meta.env.VITE_APP_ADDR_MLK_SUBSIDY;

type InfoTabProps = {
  chainId: string;
  publicKey: string;
  etherBal: string;
  hasMinterRole: boolean;
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
  const { publicKey, etherBal, hasMinterRole } = props;
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
      {hasMinterRole ? (
        <div>
          <ListItem key={3} disablePadding>
            <ListItemText
              primary={<Label label="MelakaResidentId" />}
              secondary={
                <Value value={truncateEthAddr(melaka_resident_contract_addr)} />
              }
            />
          </ListItem>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <ListItem key={4} disablePadding sx={{ maxWidth: '215px' }}>
              <ListItemText
                primary={<Label label="MelakaSubsidy" />}
                secondary={
                  <Value value={truncateEthAddr(melaka_rice_contract_addr)} />
                }
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
