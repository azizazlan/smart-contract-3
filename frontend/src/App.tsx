import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './layouts/Default';

const AdminLayout = lazy(() => import('./layouts/admin/Default'));
const AdminLanding = lazy(() => import('./pages/admin/Landing'));
const AdminAccount = lazy(() => import('./pages/admin/AccountForm'));

const OfficialLayout = lazy(() => import('./layouts/official/Default'));
const OfficialAppbarLayout = lazy(
  () => import('./layouts/official/AppbarLayout')
);
const OfficialSignup = lazy(() => import('./pages/official/home/Signup'));
const OfficialRestore = lazy(() => import('./pages/official/home/Restore'));
const OfficialHome = lazy(() => import('./pages/official/home/Info'));
const OfficialAccount = lazy(() => import('./pages/official/account/Account'));
const OfficialVerification = lazy(
  () => import('./pages/official/verification/Verification')
);
const OfficialResidency = lazy(
  () => import('./pages/official/residency/Residency')
);
const OfficialWhitelisting = lazy(
  () => import('./pages/official/whitelisting/Whitelisting')
);
const OfficialTransferFT = lazy(
  () => import('./pages/official/transfer/TransferFT')
);
const OfficialLanding = lazy(() => import('./pages/official/landing/Landing'));

const ResidentAppbarLayout = lazy(
  () => import('./layouts/resident/AppbarLayout')
);
const ResidentLanding = lazy(() => import('./pages/resident/landing/Landing'));
const ResidentTxHistory = lazy(
  () => import('./pages/resident/txhistory/TxHistory')
);
const ResidentHomeInfo = lazy(() => import('./pages/resident/home/Info'));
const ResidentSignup = lazy(() => import('./pages/resident/home/Signup'));
const ResidentRestore = lazy(() => import('./pages/resident/home/Restore'));
const ResidentAccount = lazy(() => import('./pages/resident/account/Account'));
const ResidentClaim = lazy(() => import('./pages/resident/claim/Claim'));

const About = lazy(() => import('./pages/about/About'));
const Verify = lazy(() => import('./pages/verify/Verify'));
import NotFound from './pages/404/NotFound';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          <Route path="claim/:tokenId" element={<ResidentClaim />} />
        </Route>
        <Route path="/official" element={<OfficialLayout />}>
          <Route index element={<OfficialLanding />} />
          <Route path="signup" element={<OfficialSignup />} />
          <Route path="restore" element={<OfficialRestore />} />
        </Route>
        <Route path="/signedofficial" element={<OfficialAppbarLayout />}>
          <Route index element={<OfficialHome />} />
          <Route path="residency" element={<OfficialResidency />} />
          <Route path="account" element={<OfficialAccount />} />
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
    </Suspense>
  );
}

export default App;
