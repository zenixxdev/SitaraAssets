import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cuboid, Zap, Code, Layout as LayoutIcon, Search } from 'lucide-react';
import AssetCard from '../components/AssetCard';
import { Asset } from '../types';

export default function Home() {
  const [featuredAssets, setFeaturedAssets] = useState<Asset[]>([]);
  const [editorPicks, setEditorPicks] = useState<Asset[]>([]);
  const [latestAssets, setLatestAssets] = useState<Asset[]>([]);

  useEffect(() => {
    // Fetch assets from API (mocking the fetch for now until we restart dev server)
    fetch('/api/assets')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
           setFeaturedAssets(data.filter(a => a.featured).slice(0, 4));
           setEditorPicks(data.filter(a => a.editorChoice).slice(0, 4));
           setLatestAssets(data.slice().sort((a,b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()).slice(0, 4));
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-50 dark:bg-surface-dark border-b border-brand-100 dark:border-border-dark pt-24 pb-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-400 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-bg-dark border border-brand-200 dark:border-border-dark text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Sitara v1.0 is live
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-950 dark:text-white tracking-tight mb-6 max-w-4xl mx-auto">
            Premium 3D Assets for Modern Web Games.
          </h1>
          <p className="text-lg md:text-xl text-brand-600 dark:text-brand-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Copy. Paste. Render. Build stunning 3D experiences in the browser with our curated library of lightweight, performance-optimized Three.js assets.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/explore" className="px-8 py-3.5 rounded-full bg-brand-950 dark:bg-brand-50 text-white dark:text-brand-950 font-medium hover:bg-brand-800 dark:hover:bg-white transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
              Explore Library <ArrowRight size={18} />
            </Link>
            <Link to="/categories" className="px-8 py-3.5 rounded-full bg-white dark:bg-surface-dark border border-brand-200 dark:border-border-dark text-brand-950 dark:text-white font-medium hover:bg-brand-50 dark:hover:bg-bg-dark transition-colors w-full sm:w-auto justify-center text-center">
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">Featured Board</h2>
            <p className="text-brand-500">Hand-picked premium assets for your next project.</p>
          </div>
          <Link to="/featured" className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-900 dark:text-brand-400 dark:hover:text-white transition-colors">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        
        {featuredAssets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAssets.map(asset => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="rounded-2xl border border-brand-100 dark:border-border-dark bg-brand-50 dark:bg-surface-dark animate-pulse aspect-[3/4]"></div>
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="bg-brand-50 dark:bg-surface-dark/30 py-24 border-y border-brand-100 dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">How Sitara Works</h2>
            <p className="text-brand-500 max-w-xl mx-auto">No complex imports, no heavy files. Just clean, documented code snippets ready for your Three.js scenes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 dark:from-border-dark dark:via-brand-600 dark:to-border-dark"></div>
            
            <div className="relative text-center z-10">
              <div className="w-16 h-16 mx-auto bg-white dark:bg-surface-dark border-2 border-brand-200 dark:border-border-dark rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Search className="text-brand-600 dark:text-brand-400" size={28} />
              </div>
              <h3 className="font-semibold text-xl mb-2">1. Find Assets</h3>
              <p className="text-sm text-brand-500">Search our library of optimized models and materials.</p>
            </div>
            
            <div className="relative text-center z-10">
              <div className="w-16 h-16 mx-auto bg-white dark:bg-surface-dark border-2 border-brand-200 dark:border-border-dark rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <LayoutIcon className="text-brand-600 dark:text-brand-400" size={28} />
              </div>
              <h3 className="font-semibold text-xl mb-2">2. Preview Live</h3>
              <p className="text-sm text-brand-500">Inspect the asset in your browser with our instant 3D viewer.</p>
            </div>

            <div className="relative text-center z-10">
              <div className="w-16 h-16 mx-auto bg-white dark:bg-surface-dark border-2 border-brand-200 dark:border-border-dark rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Code className="text-brand-600 dark:text-brand-400" size={28} />
              </div>
              <h3 className="font-semibold text-xl mb-2">3. Copy & Paste</h3>
              <p className="text-sm text-brand-500">Copy the Three.js snippet directly into your web game.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Uploads */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">Latest Uploads</h2>
            <p className="text-brand-500">Fresh content added by the community.</p>
          </div>
          <Link to="/explore" className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-900 dark:text-brand-400 dark:hover:text-white transition-colors">
            Explore library <ArrowRight size={16} />
          </Link>
        </div>
        
        {latestAssets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestAssets.map(asset => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-brand-500 bg-brand-50 dark:bg-surface-dark rounded-2xl border border-brand-100 dark:border-border-dark">
            <Cuboid className="mx-auto mb-4 opacity-50" size={32} />
            <p>No assets uploaded yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
