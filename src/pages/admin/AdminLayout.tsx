import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Database, Star, FolderTree, Settings, LogOut, FileCode2, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('sitara_admin_token');
    if (!token) {
      navigate('/secret-accses');
    }
  }, [navigate]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('sitara_admin_token');
    navigate('/secret-accses');
  };

  const navItems = [
    { name: 'Dashboard', path: '/secret-accses/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Assets', path: '/secret-accses/dashboard/assets', icon: <Database size={18} /> },
    { name: 'Reviews', path: '/secret-accses/dashboard/reviews', icon: <Star size={18} /> },
    { name: 'Categories', path: '/secret-accses/dashboard/categories', icon: <FolderTree size={18} /> },
    { name: '3D Guide', path: '/secret-accses/dashboard/structure-guide', icon: <FileCode2 size={18} /> },
    { name: 'Settings', path: '/secret-accses/dashboard/settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-brand-50 dark:bg-bg-dark flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-brand-900/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 h-screen w-64 border-r border-brand-100 dark:border-border-dark bg-white dark:bg-surface-dark flex flex-col z-50 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-brand-100 dark:border-border-dark flex justify-between items-center">
          <h2 className="font-display font-bold text-lg tracking-tight">Sitara Admin</h2>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-brand-500 hover:text-brand-900">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === item.path 
                  ? 'bg-brand-900 text-white' 
                  : 'text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-bg-dark hover:text-brand-900 dark:hover:text-white'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-brand-100 dark:border-border-dark shrink-0">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            <LogOut size={18} />
            Lock Session
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        <header className="h-16 border-b border-brand-100 dark:border-border-dark bg-white dark:bg-surface-dark flex items-center px-4 md:px-8 shrink-0">
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 mr-4 text-brand-600 hover:text-brand-900">
            <Menu size={20} />
          </button>
          <h1 className="font-medium text-brand-900 dark:text-white truncate">Admin Control Panel</h1>
          <div className="ml-auto flex items-center gap-4">
             <Link to="/" className="text-sm text-brand-500 hover:text-brand-900 dark:hover:text-white whitespace-nowrap">Return to Site</Link>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
