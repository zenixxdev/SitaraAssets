import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import AssetDetail from './pages/AssetDetail';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStructureGuide from './pages/admin/AdminStructureGuide';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="asset/:id" element={<AssetDetail />} />
        <Route path="categories" element={<div className="p-8 text-center">Categories Page Placeholder</div>} />
        <Route path="featured" element={<div className="p-8 text-center">Featured Page Placeholder</div>} />
        <Route path="editors-choice" element={<div className="p-8 text-center">Editor's Choice Page Placeholder</div>} />
        <Route path="license" element={<div className="p-8 text-center">License Guide Placeholder</div>} />
        <Route path="faq" element={<div className="p-8 text-center">FAQ Placeholder</div>} />
        <Route path="about" element={<div className="p-8 text-center">About Placeholder</div>} />
        <Route path="contact" element={<div className="p-8 text-center">Contact Placeholder</div>} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Hidden Admin Routes */}
      <Route path="/secret-accses">
        <Route index element={<AdminLogin />} />
        <Route path="dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="assets" element={<div className="p-8 text-center">Asset Manager</div>} />
          <Route path="reviews" element={<div className="p-8 text-center">Review Manager</div>} />
          <Route path="categories" element={<div className="p-8 text-center">Category Manager</div>} />
          <Route path="structure-guide" element={<AdminStructureGuide />} />
          <Route path="settings" element={<div className="p-8 text-center">Site Settings</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

