import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/resident/landing/Landing';
import Layout from './layouts/Default';
import { default as OfficialLayout } from './layouts/official/Default';
import { default as AppbarLayout } from './layouts/resident/AppbarLayout';
import { default as OfficialAppbarLayout } from './layouts/official/AppbarLayout';
import Signup from './pages/resident/account/Signup';
import { default as OfficialSignup } from './pages/official/account/Signup';
import Restore from './pages/resident/account/Restore';
import { default as OfficialRestore } from './pages/official/account/Restore';
import { default as OfficialAccountInfo } from './pages/official/account/Info';
import { default as AccountInfo } from './pages/resident/account/Info';
import AdminLanding from './pages/admin/Landing';
import About from './pages/about/About';
import Verify from './pages/verify/Verify';
import { default as OfficialLanding } from './pages/official/landing/Landing';
import { useResidentDispatch, useOfficialDispatch } from './services/hook';
import { default as initResident } from './services/resident/thunks/initialize';
import { default as initOfficial } from './services/official/thunks/initialize';

function App() {
  const location = useLocation();

  const residentDispatch = useResidentDispatch();
  const officialDispatch = useOfficialDispatch();

  React.useEffect(() => {
    if (location.pathname.includes('/official')) {
      officialDispatch(initOfficial());
      return;
    }
    residentDispatch(initResident());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="signup" element={<Signup />} />
        <Route path="restore" element={<Restore />} />
      </Route>
      <Route path="/account" element={<AppbarLayout />}>
        <Route index element={<AccountInfo />} />
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
      </Route>
      <Route path="/admin" element={<OfficialLayout />}>
        <Route index element={<AdminLanding />} />
      </Route>
    </Routes>
  );
}

export default App;
