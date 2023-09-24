import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import detectEthereumProvider from '@metamask/detect-provider';
import { utils } from 'ethers';
import InfoTab from './InfoTab';
import ResidentTab from './ResidentTab';
import OfficerTab from './OfficerTab';
import { useAdminDispatch, useAdminSelector } from '../../services/hook';
import { AdminState } from '../../services/store';
import metamaskInfo from '../../services/admin/thunks/metamaskInfo';

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
  const { networkId, publicKey, etherBal } = useAdminSelector(
    (state: AdminState) => state.admin
  );
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    dispatch(metamaskInfo());
  }, []);

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
          <Tab label="Info" {...a11yProps(0)} />
          <Tab label="Resident" {...a11yProps(1)} />
          <Tab label="Officer" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <InfoTab
          chainId={networkId || ''}
          publicKey={publicKey || ''}
          balance={etherBal || ''}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ResidentTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <OfficerTab />
      </CustomTabPanel>
    </Box>
  );
}
