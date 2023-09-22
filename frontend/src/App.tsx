import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/resident/landing/Landing';
import Layout from './layouts/Default';
import { default as OfficialLayout } from './layouts/official/Default';
import { default as AppbarLayout } from './layouts/resident/AppbarLayout';
import Signup from './pages/resident/account/Signup';
import Restore from './pages/resident/account/Restore';
import { default as AccountInfo } from './pages/resident/account/Info';
import About from './pages/about/About';
import Verify from './pages/verify/Verify';
import { default as OfficialLanding } from './pages/official/landing/Landing';
import { useResidentAccDispatch } from './services/hook';
import initialize from './services/residentAccount/thunks/initialize';

function App() {
  const dispatch = useResidentAccDispatch();

  React.useEffect(() => {
    dispatch(initialize());
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
      </Route>
    </Routes>
  );
}

export default App;
