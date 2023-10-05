import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Default';
import { default as AdminLayout } from './layouts/admin/Default';
import { default as AdminLanding } from './pages/admin/Landing';
import { default as AdminAccount } from './pages/admin/AccountForm';
import { default as OfficialLayout } from './layouts/official/Default';
import { default as OfficialAppbarLayout } from './layouts/official/AppbarLayout';
import { default as OfficialSignup } from './pages/official/account/Signup';
import { default as OfficialRestore } from './pages/official/account/Restore';
import { default as OfficialAccountInfo } from './pages/official/account/Info';
import { default as OfficialVerification } from './pages/official/verification/Verification';
import { default as OfficialResidency } from './pages/official/residency/Residency';
import { default as OfficialWhitelisting } from './pages/official/whitelisting/Whitelisting';
import { default as OfficialTransferFT } from './pages/official/transfer/TransferFT';
import { default as OfficialLanding } from './pages/official/landing/Landing';
import { default as ResidentLanding } from './pages/resident/landing/Landing';
import { default as ResidentAppbarLayout } from './layouts/resident/AppbarLayout';
import { default as ResidentRestore } from './pages/resident/home/Restore';
import { default as ResidentTxHistory } from './pages/resident/txhistory/TxHistory';
import { default as ResidentHomeInfo } from './pages/resident/home/Info';
import { default as ResidentSignup } from './pages/resident/home/Signup';
import { default as ResidentAccount } from './pages/resident/account/Account';
import About from './pages/about/About';
import Verify from './pages/verify/Verify';
import NotFound from './pages/404/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ResidentLanding />} />
        <Route path="signup" element={<ResidentSignup />} />
        <Route path="restore" element={<ResidentRestore />} />
      </Route>
      <Route path="/signedresident" element={<ResidentAppbarLayout />}>
        <Route index element={<ResidentHomeInfo />} />
        <Route path="txhistory" element={<ResidentTxHistory />} />
        <Route path="account" element={<ResidentAccount />} />
        <Route path="about" element={<About />} />
        <Route path="verify" element={<Verify />} />
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
