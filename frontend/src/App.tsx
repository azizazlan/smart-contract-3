import { Routes, Route } from 'react-router-dom';
import Landing from './pages/resident/landing/Landing';
import Layout from './layouts/Default';
import { default as OfficialLayout } from './layouts/official/Default';
import { default as AppbarLayout } from './layouts/resident/AppbarLayout';
import { default as OfficialAppbarLayout } from './layouts/official/AppbarLayout';
import { default as AdminLayout } from './layouts/admin/Default';
import Signup from './pages/resident/account/Signup';
import { default as OfficialSignup } from './pages/official/account/Signup';
import Restore from './pages/resident/account/Restore';
import { default as OfficialRestore } from './pages/official/account/Restore';
import { default as OfficialAccountInfo } from './pages/official/account/Info';
import { default as OfficialVerification } from './pages/official/verification/Verification';
import { default as OfficialResidency } from './pages/official/residency/Residency';
import { default as OfficialWhitelisting } from './pages/official/whitelisting/Whitelisting';
import { default as OfficialTransferFT } from './pages/official/transfer/TransferFT';
import { default as AccountInfo } from './pages/resident/account/Info';
import AdminLanding from './pages/admin/Landing';
import { default as AdminAccount } from './pages/admin/AccountForm';
import About from './pages/about/About';
import Verify from './pages/verify/Verify';
import { default as OfficialLanding } from './pages/official/landing/Landing';
import NotFound from './pages/404/NotFound';
import TxHistory from './pages/resident/txhistory/TxHistory';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="signup" element={<Signup />} />
        <Route path="restore" element={<Restore />} />
      </Route>
      <Route path="/signedresident" element={<AppbarLayout />}>
        <Route index element={<AccountInfo />} />
        <Route path="about" element={<About />} />
        <Route path="verify" element={<Verify />} />
        <Route path="txhistory" element={<TxHistory />} />
      </Route>
      <Route path="/official" element={<OfficialLayout />}>
        <Route index element={<OfficialLanding />} />
        <Route path="signup" element={<OfficialSignup />} />
        <Route path="restore" element={<OfficialRestore />} />
        <Route path="account" element={<OfficialAccountInfo />} />
      </Route>
      <Route path="/signedofficial" element={<OfficialAppbarLayout />}>
        <Route index element={<OfficialAccountInfo />} />
        <Route path="residency" element={<OfficialResidency />} />
        <Route path="whitelisting" element={<OfficialWhitelisting />} />
        <Route path="verification" element={<OfficialVerification />} />
        <Route path="transfer" element={<OfficialTransferFT />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminLanding />} />
        <Route path="account" element={<AdminAccount />} />
      </Route>
      <Route path="/verify" element={<Layout />}>
        <Route index element={<Verify />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
