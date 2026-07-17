import React, { useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Database, Star, FolderTree, Settings, LogOut, FileCode2 } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('sitara_admin_token');
    if (!token) {
      navigate('/secret-accses');
    }
  }, [navigate]);

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
      {/* Sidebar */}
      <aside className="w-64 border-r border-brand-100 dark:border-border-dark bg-white dark:bg-surface-dark flex flex-col hidden md:flex">
        <div className="p-6 border-b border-brand-100 dark:border-border-dark">
          <h2 className="font-display font-bold text-lg tracking-tight">Sitara Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
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
        <div className="p-4 border-t border-brand-100 dark:border-border-dark">
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
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-brand-100 dark:border-border-dark bg-white dark:bg-surface-dark flex items-center px-8 shrink-0">
          <h1 className="font-medium text-brand-900 dark:text-white">Admin Control Panel</h1>
          <div className="ml-auto flex items-center gap-4">
             <Link to="/" className="text-sm text-brand-500 hover:text-brand-900 dark:hover:text-white">Return to Site</Link>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
