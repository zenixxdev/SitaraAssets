import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppStore } from '../store';
import { Moon, Sun, Cuboid, Search, Menu, X, ArrowRight } from 'lucide-react';

export default function Layout() {
  const { theme, toggleTheme } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-bg-dark text-brand-950 dark:text-brand-50 transition-colors duration-300">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-brand-100 dark:border-border-dark bg-white/80 dark:bg-bg-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-brand-950 dark:bg-brand-50 flex items-center justify-center text-white dark:text-brand-950 group-hover:scale-105 transition-transform">
                  <Cuboid size={20} />
                </div>
                <span className="font-display font-bold text-xl tracking-tight">Sitara</span>
              </Link>
              
              <nav className="hidden md:flex gap-6">
                <Link to="/explore" className="text-sm font-medium text-brand-600 dark:text-brand-300 hover:text-brand-950 dark:hover:text-white transition-colors">Explore</Link>
                <Link to="/categories" className="text-sm font-medium text-brand-600 dark:text-brand-300 hover:text-brand-950 dark:hover:text-white transition-colors">Categories</Link>
                <Link to="/featured" className="text-sm font-medium text-brand-600 dark:text-brand-300 hover:text-brand-950 dark:hover:text-white transition-colors">Featured</Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
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

              <button 
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-brand-100 dark:border-border-dark bg-white dark:bg-bg-dark">
            <div className="px-4 py-4 space-y-4">
              <Link to="/explore" className="block text-brand-600 dark:text-brand-300 font-medium">Explore</Link>
              <Link to="/categories" className="block text-brand-600 dark:text-brand-300 font-medium">Categories</Link>
              <Link to="/featured" className="block text-brand-600 dark:text-brand-300 font-medium">Featured</Link>
              <div className="relative mt-4">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" />
                <input 
                  type="text" 
                  placeholder="Search assets..." 
                  className="w-full pl-9 pr-4 py-2 bg-brand-50 dark:bg-surface-dark border border-transparent dark:border-border-dark focus:border-brand-300 dark:focus:border-brand-600 rounded-lg text-sm outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Large Footer */}
      <footer className="border-t border-brand-100 dark:border-border-dark bg-brand-50 dark:bg-surface-dark/50 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
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
              <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 rounded-full bg-brand-200 dark:bg-brand-800 flex items-center justify-center cursor-pointer hover:bg-brand-300 dark:hover:bg-brand-700 transition-colors">
                  <span className="text-xs font-bold">X</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-200 dark:bg-brand-800 flex items-center justify-center cursor-pointer hover:bg-brand-300 dark:hover:bg-brand-700 transition-colors">
                  <span className="text-xs font-bold">GH</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-200 dark:bg-brand-800 flex items-center justify-center cursor-pointer hover:bg-brand-300 dark:hover:bg-brand-700 transition-colors">
                  <span className="text-xs font-bold">IN</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-brand-900 dark:text-white">Explore</h4>
              <ul className="space-y-3 text-sm text-brand-600 dark:text-brand-400">
                <li><Link to="/explore" className="hover:text-brand-900 dark:hover:text-white transition-colors">All Assets</Link></li>
                <li><Link to="/featured" className="hover:text-brand-900 dark:hover:text-white transition-colors">Featured Board</Link></li>
                <li><Link to="/editors-choice" className="hover:text-brand-900 dark:hover:text-white transition-colors">Editor's Choice</Link></li>
                <li><Link to="/categories" className="hover:text-brand-900 dark:hover:text-white transition-colors">Categories</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-brand-900 dark:text-white">Support</h4>
              <ul className="space-y-3 text-sm text-brand-600 dark:text-brand-400">
                <li><Link to="/license" className="hover:text-brand-900 dark:hover:text-white transition-colors">License Guide</Link></li>
                <li><Link to="/faq" className="hover:text-brand-900 dark:hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/about" className="hover:text-brand-900 dark:hover:text-white transition-colors">About Sitara</Link></li>
                <li><Link to="/contact" className="hover:text-brand-900 dark:hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-brand-900 dark:text-white">Stay Updated</h4>
              <p className="text-xs text-brand-600 dark:text-brand-400 mb-4">Get notified about new premium models.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white dark:bg-bg-dark border border-brand-200 dark:border-border-dark rounded-lg px-3 py-2 text-sm w-full outline-none focus:border-brand-400 dark:focus:border-brand-600"
                />
                <button className="bg-brand-900 dark:bg-white text-white dark:text-brand-900 rounded-lg px-3 py-2 flex items-center justify-center hover:bg-brand-800 dark:hover:bg-brand-100 transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-brand-200 dark:border-border-dark flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-500 dark:text-brand-400">
            <p>&copy; {new Date().getFullYear()} Sitara 3D Library. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-brand-900 dark:hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-brand-900 dark:hover:text-white">Terms of Service</Link>
              <Link to="/secret-accses" className="hover:text-brand-900 dark:hover:text-white opacity-20 hover:opacity-100 transition-opacity">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
