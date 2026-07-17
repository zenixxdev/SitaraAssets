import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAppStore } from '../store';
import { Moon, Sun, Cuboid, Search, Menu, X, ArrowRight, Compass, FolderTree, Sparkles, Award, Shield, HelpCircle, Info, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function Layout() {
  const { theme, toggleTheme } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Explore', path: '/explore', icon: <Compass size={18} /> },
    { name: 'Categories', path: '/categories', icon: <FolderTree size={18} /> },
    { name: 'Featured', path: '/featured', icon: <Sparkles size={18} /> },
    { name: "Editor's Choice", path: '/editors-choice', icon: <Award size={18} /> },
  ];

  const supportItems = [
    { name: 'License', path: '/license', icon: <Shield size={18} /> },
    { name: 'FAQ', path: '/faq', icon: <HelpCircle size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={18} /> },
  ];

  return (
    <div className="min-h-screen flex bg-white dark:bg-bg-dark text-brand-950 dark:text-brand-50 transition-colors duration-300">
      
      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-brand-900/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className={`fixed lg:sticky top-0 h-screen w-64 border-r border-brand-100 dark:border-border-dark bg-brand-50/50 dark:bg-surface-dark/50 flex flex-col z-50 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex justify-between items-center shrink-0">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-brand-950 dark:bg-brand-50 flex items-center justify-center text-white dark:text-brand-950 group-hover:scale-105 transition-transform">
              <Cuboid size={20} />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Sitara</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2 text-brand-500 hover:text-brand-900 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8">
          <div>
            <h3 className="px-4 text-xs font-bold text-brand-400 dark:text-brand-600 uppercase tracking-wider mb-2">Discover</h3>
            <nav className="space-y-1">
              {navItems.map(item => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === item.path 
                      ? 'bg-brand-900 text-white dark:bg-brand-50 dark:text-brand-950' 
                      : 'text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-bg-dark hover:text-brand-900 dark:hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="px-4 text-xs font-bold text-brand-400 dark:text-brand-600 uppercase tracking-wider mb-2">Support</h3>
            <nav className="space-y-1">
              {supportItems.map(item => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === item.path 
                      ? 'bg-brand-900 text-white dark:bg-brand-50 dark:text-brand-950' 
                      : 'text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-bg-dark hover:text-brand-900 dark:hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-brand-100 dark:border-border-dark shrink-0">
          <div className="bg-brand-100 dark:bg-bg-dark rounded-xl p-4 text-center">
            <p className="text-xs text-brand-600 dark:text-brand-400 mb-2">Want to contribute?</p>
            <Link to="/contact" className="text-sm font-bold text-brand-900 dark:text-white hover:underline">Submit an Asset</Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 w-full border-b border-brand-100 dark:border-border-dark bg-white/80 dark:bg-bg-dark/80 backdrop-blur-md shrink-0">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <button 
                  className="lg:hidden p-2 -ml-2 text-brand-600 dark:text-brand-400"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu size={20} />
                </button>
              </div>

              <div className="flex items-center gap-4 ml-auto">
                <div className="hidden sm:flex relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" />
                  <input 
                    type="text" 
                    placeholder="Search assets..." 
                    className="pl-9 pr-4 py-1.5 bg-brand-50 dark:bg-surface-dark border border-transparent dark:border-border-dark focus:border-brand-300 dark:focus:border-brand-600 rounded-full text-sm outline-none w-48 lg:w-64 transition-all"
                  />
                </div>

                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-brand-100 dark:hover:bg-surface-dark transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto">
          <main className="min-h-full">
            <Outlet />
          </main>

          {/* Large Footer */}
          <footer className="border-t border-brand-100 dark:border-border-dark bg-brand-50 dark:bg-surface-dark/50 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <div className="lg:col-span-2 space-y-6">
                  <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-brand-950 dark:bg-brand-50 flex items-center justify-center text-white dark:text-brand-950">
                      <Cuboid size={20} />
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight">Sitara</span>
                  </Link>
                  <p className="text-brand-600 dark:text-brand-400 text-sm max-w-xs leading-relaxed">
                    Premium 3D asset library for web games and interactive experiences. Free to use, built for performance.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-brand-900 dark:text-white">Explore</h4>
                  <ul className="space-y-3 text-sm text-brand-600 dark:text-brand-400">
                    <li><Link to="/explore" className="hover:text-brand-900 dark:hover:text-white transition-colors">All Assets</Link></li>
                    <li><Link to="/featured" className="hover:text-brand-900 dark:hover:text-white transition-colors">Featured Board</Link></li>
                    <li><Link to="/editors-choice" className="hover:text-brand-900 dark:hover:text-white transition-colors">Editor's Choice</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-brand-900 dark:text-white">Support</h4>
                  <ul className="space-y-3 text-sm text-brand-600 dark:text-brand-400">
                    <li><Link to="/license" className="hover:text-brand-900 dark:hover:text-white transition-colors">License Guide</Link></li>
                    <li><Link to="/faq" className="hover:text-brand-900 dark:hover:text-white transition-colors">FAQ</Link></li>
                    <li><Link to="/contact" className="hover:text-brand-900 dark:hover:text-white transition-colors">Contact Us</Link></li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-brand-200 dark:border-border-dark flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-500 dark:text-brand-400">
                <p>&copy; {new Date().getFullYear()} Sitara 3D Library. All rights reserved.</p>
                <div className="flex items-center gap-6">
                  <Link to="/privacy" className="hover:text-brand-900 dark:hover:text-white">Privacy</Link>
                  <Link to="/terms" className="hover:text-brand-900 dark:hover:text-white">Terms</Link>
                  <Link to="/secret-accses" className="hover:text-brand-900 dark:hover:text-white opacity-20 hover:opacity-100 transition-opacity">Admin</Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
