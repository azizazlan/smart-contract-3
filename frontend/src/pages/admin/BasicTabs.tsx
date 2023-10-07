import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import InfoTab from './InfoTab';
import ResidentTab from './ResidentIdTab';
import RoleAssignmentTab from './RoleAssignmentTab';
import { useAdminDispatch, useAdminSelector } from '../../services/hook';
import { AdminState } from '../../services/store';
import metamaskInfo from '../../services/admin/thunks/metamaskInfo';
import contractInfo from '../../services/admin/thunks/contractInfo';
import { resetSubmission } from '../../services/admin/reducer';
import CheckTab from './CheckTab';
import AllowanceTab from './AllowanceTab';
import initialize from '../../services/admin/thunks/initialize';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ paddingLeft: '65px', paddingRight: '65px' }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ marginTop: 1 }}>{children}</Box>}
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
  const dispatch = useAdminDispatch();
  const { networkId, publicKey, privateKey, etherBal, hasMinterRole } =
    useAdminSelector((state: AdminState) => state.admin);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!privateKey) {
      console.log('private key is null');
      dispatch(initialize());
      return;
    }
    dispatch(metamaskInfo({ privateKey }));
    dispatch(contractInfo({ privateKey }));
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    dispatch(resetSubmission());
    setValue(newValue);
  };

  if (!hasMinterRole) {
    return (
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Tabs
            sx={{ marginLeft: '65px' }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Admin info" {...a11yProps(0)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <InfoTab
            chainId={networkId || ''}
            publicKey={publicKey || ''}
            etherBal={etherBal || ''}
            hasMinterRole={hasMinterRole}
          />
        </CustomTabPanel>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs
          sx={{ marginLeft: '65px' }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Admin info" {...a11yProps(0)} />
          <Tab label="Resident ID" {...a11yProps(1)} />
          <Tab label="Minter Role" {...a11yProps(2)} />
          <Tab label="Allowance" {...a11yProps(3)} />
          <Tab label="Check" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <InfoTab
          chainId={networkId || ''}
          publicKey={publicKey || ''}
          etherBal={etherBal || ''}
          hasMinterRole={hasMinterRole}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ResidentTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <RoleAssignmentTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <AllowanceTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <CheckTab />
      </CustomTabPanel>
    </Box>
  );
}
