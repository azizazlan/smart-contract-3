import { Box, Divider, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import WarningIcon from '@mui/icons-material/Warning';
import { Link } from 'react-router-dom';

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
            secondary={<Value value={publicKey} />}
          />
        </ListItem>
      )}
      <Link to="/admin/account">
        <Typography sx={{ fontFamily: 'Oswald' }} variant="caption">
          Change account
        </Typography>
      </Link>
      <Box sx={{ height: '17px' }} />
      <ListItem key={2} disablePadding>
        <ListItemText
          primary={<Label label="Ether balance" />}
          secondary={<Value value={balance} />}
        />
      </ListItem>
      {isGomenOfficer ? (
        <ListItem key={3} disablePadding>
          <ListItemText
            primary={<Label label="MelakaResident address. Officer Role" />}
            secondary={<Value value={melaka_resident_contract_addr} />}
          />
        </ListItem>
      ) : (
        <ListItem key={3} disablePadding>
          <ListItemText
            primary={
              <RedLabel label="MelakaResident address. Not an officer" />
            }
            secondary={<Value value={melaka_resident_contract_addr} />}
          />
        </ListItem>
      )}
      <ListItem key={4} disablePadding>
        <ListItemText
          primary={<Label label="MelakaRice address" />}
          secondary={<Value value={melaka_rice_contract_addr} />}
        />
      </ListItem>
    </List>
  );
}
