import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { format } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import rice from '../../../assets/bag-rice.png';
import wheat from '../../../assets/bag-wheatflour.png';
import { Box, Divider, Typography } from '@mui/material';
import truncateEthAddr from '../../../utils/truncateEthAddr';

export default function TxHistory() {
  return (
    <List
      sx={{ width: '100%', backgroundColor: 'background.paper' }}
      subheader={
        <Typography
          color="primary"
          sx={{ fontFamily: 'Oswald', backgroundColor: '#f5f6fa', padding: 1 }}
        >
          Transactions history
        </Typography>
      }
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <img src={rice} style={{ width: '32px' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Rice (10 tokens)"
          secondary={`${format(
            new Date(),
            'hh:mm:ss dd-MM-yyyy'
          )} from ${truncateEthAddr(
            '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
          )}`}
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <img src={wheat} style={{ width: '32px' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Wheat Flour (2 tokens)"
          secondary={`${format(
            new Date(),
            'hh:mm:ss dd-MM-yyyy'
          )} from ${truncateEthAddr(
            '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
          )}`}
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <img src={rice} style={{ width: '32px' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Rice (1 token)"
          secondary={`${format(
            new Date(),
            'hh:mm:ss dd-MM-yyyy'
          )} from ${truncateEthAddr(
            '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
          )}`}
        />
      </ListItem>
    </List>
  );
}
