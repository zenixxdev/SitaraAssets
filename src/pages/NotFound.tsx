import React from 'react';
import { Link } from 'react-router-dom';
import { Cuboid, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-center px-4">
      <div>
        <div className="w-20 h-20 bg-brand-50 dark:bg-surface-dark border border-brand-100 dark:border-border-dark rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
          <Cuboid size={32} className="text-brand-400" />
        </div>
        <h1 className="text-6xl font-display font-bold text-brand-950 dark:text-white mb-4">404</h1>
        <h2 className="text-xl font-medium text-brand-600 dark:text-brand-300 mb-8">Asset Not Found</h2>
        <p className="text-brand-500 max-w-md mx-auto mb-10">
          The model or page you are looking for has vanished into the void, or never existed in the first place.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-950 dark:bg-brand-50 text-white dark:text-brand-950 rounded-full font-medium hover:bg-brand-800 dark:hover:bg-white transition-colors"
        >
          <ArrowLeft size={18} />
          Return to Hub
        </Link>
      </div>
    </div>
  );
}
