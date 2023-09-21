import { Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Layout from './layouts/Default';
import { default as AppbarLayout } from './layouts/AppbarLayout';
import Signup from './pages/account/Signup';
import Restore from './pages/account/Restore';
import { default as AccountInfo } from './pages/account/Info';
import About from './pages/about/About';
import Verify from './pages/verify/Verify';

function App() {
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
    </Routes>
  );
}

export default App;
