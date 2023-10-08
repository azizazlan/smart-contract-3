import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { format } from 'date-fns';
import rice from '../../../assets/bag-rice.png';
import wheat from '../../../assets/bag-wheatflour.png';
import { Box, Divider, ListItemButton, Typography } from '@mui/material';
import { useResidentSelector } from '../../../services/hook';
import { ResidentState } from '../../../services/store';
import { TOKEN_NAMES } from '../../../services/subsidyType';

type SecondaryListComponentProps = {
  text: string;
  flow: number;
};

function SecondaryListComponent(props: SecondaryListComponentProps) {
  const { text, flow } = props;
  return (
    <span
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <span style={{ flexGrow: 1 }}>{text}</span>
      {flow === 0 ? (
        <ArrowDropUpIcon fontSize="large" color="error" />
      ) : (
        <ArrowDropDownIcon fontSize="large" color="success" />
      )}
    </span>
  );
}

export default function TxHistory() {
  const navigate = useNavigate();
  const { transactions } = useResidentSelector(
    (state: ResidentState) => state.resident
  );

  const handleClickList = ({ tokenId }: { tokenId: string }) => {
    navigate(`/signedresident/claim/${tokenId}`);
  };

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
        <Box component="span" key={index}>
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => handleClickList({ tokenId: `${tx.tokenId}` })}
            >
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: '#dfe6e9' }}>
                  <img
                    src={tx.tokenId === 0 ? rice : wheat}
                    style={{ width: '32px' }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography
                      sx={{ flexGrow: 1, fontSize: '12pt' }}
                      color="primary"
                    >
                      {TOKEN_NAMES[tx.tokenId]}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'Oswald',
                        marginLeft: 1,
                        fontSize: '9pt',
                        fontWeight: 'bold',
                      }}
                      color={tx.flow === 1 ? 'primary' : 'error'}
                    >
                      {tx.flow === 1 ? 'RECEIVED' : 'CLAIMED'}
                    </Typography>
                  </Box>
                }
                secondary={
                  <SecondaryListComponent
                    flow={tx.flow}
                    text={format(tx.timestamp, 'E MMM dd/MM/yyyy hh:mm:ss a')}
                  />
                }
              />
            </ListItemButton>
          </ListItem>
          <Divider />
        </Box>
      ))}
    </List>
  );
}
