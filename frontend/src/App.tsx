import { Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import Layout from './layouts/Default';
import Signup from './pages/account/Signup';
import Restore from './pages/account/Restore';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="signup" element={<Signup />} />
        <Route path="restore" element={<Restore />} />
      </Route>
    </Routes>
  );
}

export default App;
