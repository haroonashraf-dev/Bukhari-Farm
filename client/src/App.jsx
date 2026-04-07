import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PublicLayout from './components/public/PublicLayout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import GoatList from './pages/GoatList';
import AddGoat from './pages/AddGoat';
import EditGoat from './pages/EditGoat';
import GoatProfile from './pages/GoatProfile';
import StaffManagement from './pages/StaffManagement';
import PrivateRoute from './components/common/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="goats" element={<GoatList />} />
            <Route path="add" element={<AddGoat />} />
            <Route path="edit/:id" element={<EditGoat />} />
            <Route path="goat/:id" element={<GoatProfile />} />
            <Route path="staff" element={<StaffManagement />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

