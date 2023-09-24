import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const melaka_resident_contract_addr = import.meta.env
  .VITE_APP_ADDR_MLK_RESIDENT;
const melaka_rice_contract_addr = import.meta.env.VITE_APP_ADDR_MLK_RICE;

type InfoTabProps = {
  chainId: string;
  publicKey: string;
  balance: string;
};

function Label(props: { label: string }) {
  return (
    <Typography color="primary" variant="body2" sx={{ fontFamily: 'Oswald' }}>
      {props.label}
    </Typography>
  );
}

function Value(props: { value: string }) {
  return <Typography variant="body1">{props.value}</Typography>;
}

export default function InfoTab(props: InfoTabProps) {
  const { chainId, publicKey, balance } = props;
  return (
    <List sx={{ width: '100%' }} disablePadding>
      <ListItem disablePadding>
        <ListItemText
          primary={<Label label="NetworkId" />}
          secondary={<Value value={chainId} />}
        />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText
          primary={<Label label="Public key" />}
          secondary={<Value value={publicKey} />}
        />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText
          primary={<Label label="Ether balance" />}
          secondary={<Value value={balance} />}
        />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText
          primary={<Label label="MelakaResident address" />}
          secondary={<Value value={melaka_resident_contract_addr} />}
        />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText
          primary={<Label label="MelakaRice address" />}
          secondary={<Value value={melaka_rice_contract_addr} />}
        />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText
          primary={<Label label="Number of IDs" />}
          secondary={<Value value="0" />}
        />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText
          primary={<Label label="Number of residents" />}
          secondary={<Value value="0" />}
        />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText
          primary={<Label label="Number of tokens transferred" />}
          secondary={<Value value="0" />}
        />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText
          primary={<Label label="Number of state officers" />}
          secondary={<Value value="0" />}
        />
      </ListItem>
    </List>
  );
}
