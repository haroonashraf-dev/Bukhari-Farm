import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PublicLayout from './components/public/PublicLayout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Layout from './components/layout/Layout';
import GoatList from './pages/GoatList';
import AddGoat from './pages/AddGoat';
import GoatProfile from './pages/GoatProfile';

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
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<GoatList />} />
          <Route path="add" element={<AddGoat />} />
          <Route path="goat/:id" element={<GoatProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

