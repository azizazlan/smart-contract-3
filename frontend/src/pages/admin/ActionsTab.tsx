import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ marginTop: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Award resident"
            iconPosition="start"
            icon={<Diversity3Icon />}
            {...a11yProps(0)}
          />
          <Tab
            label="Role assignment"
            iconPosition="start"
            icon={<AccountCircleIcon />}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          id="outlined-basic"
          label="Public key"
          variant="outlined"
          helperText="Resident public key. Eg: 0xd4C94252d9a182FBEd2b0576F07778470F2h2835"
        />
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 3 }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" color="secondary">
            revoke
          </Button>
          <Divider sx={{ minWidth: 5 }} />
          <Button variant="contained" sx={{ backgroundColor: '#1B1464' }}>
            award as melaka resident
          </Button>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          id="outlined-basic"
          label="Public key"
          variant="outlined"
          helperText="Officer public key."
        />
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 3 }}>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" color="secondary">
            revoke
          </Button>
          <Divider sx={{ minWidth: 5 }} />
          <Button variant="contained" sx={{ backgroundColor: '#40739e' }}>
            assign as government official
          </Button>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
