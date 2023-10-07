import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import rice from '../../../assets/bag-rice.png';
import wheat from '../../../assets/bag-wheatflour.png';
import { Box, Divider, Typography } from '@mui/material';
import { useResidentSelector } from '../../../services/hook';
import { ResidentState } from '../../../services/store';

export default function TxHistory() {
  const { transactions } = useResidentSelector(
    (state: ResidentState) => state.resident
  );
  return (
    <List
      sx={{ width: '100%', backgroundColor: 'background.paper' }}
      subheader={
        <Typography
          color="primary"
          sx={{
            fontFamily: 'Oswald',
            backgroundColor: '#f5f6fa',
            padding: 1,
            paddingLeft: 2,
          }}
        >
          Transactions history
        </Typography>
      }
    >
      {transactions.map((tx, index) => (
        <Box key={index}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: '#dfe6e9' }}>
                  <img
                    src={tx.tokenId === 0 ? rice : wheat}
                    style={{ width: '32px' }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={tx.primary} secondary={tx.secondary} />
            </ListItem>
            {tx.flow === 0 ? (
              <ArrowDropUpIcon fontSize="large" color="error" />
            ) : (
              <ArrowDropDownIcon fontSize="large" color="success" />
            )}
          </Box>
          <Divider />
        </Box>
      ))}
    </List>
  );
}
