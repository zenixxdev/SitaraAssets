import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cuboid, Code, Layout as LayoutIcon, Search } from 'lucide-react';
import { motion } from 'motion/react';
import AssetCard from '../components/AssetCard';
import { Asset } from '../types';

export default function Home() {
  const [featuredAssets, setFeaturedAssets] = useState<Asset[]>([]);
  const [latestAssets, setLatestAssets] = useState<Asset[]>([]);

  useEffect(() => {
    fetch('/api/assets')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
           setFeaturedAssets(data.filter(a => a.featured).slice(0, 4));
           setLatestAssets(data.slice().sort((a,b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()).slice(0, 4));
        }
      })
      .catch(console.error);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-brand-50 dark:bg-bg-dark -z-20"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-200/50 dark:bg-brand-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10 mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-100/50 dark:bg-brand-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 -z-10 mix-blend-multiply dark:mix-blend-screen"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-brand-950 dark:text-white tracking-tight leading-[1.05] mb-8">
              The 3D asset library for modern web games.
            </h1>
            <p className="text-xl md:text-2xl text-brand-600 dark:text-brand-300 max-w-2xl mb-12 font-medium leading-relaxed">
              Copy. Paste. Render. Build stunning immersive experiences in the browser with our curated library of lightweight Three.js components.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/explore" className="px-8 py-4 rounded-2xl bg-brand-950 dark:bg-brand-50 text-white dark:text-brand-950 font-semibold hover:bg-brand-800 dark:hover:bg-white transition-all hover:scale-105 active:scale-95 flex items-center gap-2 w-full sm:w-auto justify-center shadow-lg shadow-brand-900/20 dark:shadow-white/10">
                Explore Library <ArrowRight size={18} />
              </Link>
              <Link to="/categories" className="px-8 py-4 rounded-2xl bg-white dark:bg-surface-dark border border-brand-200 dark:border-border-dark text-brand-950 dark:text-white font-semibold hover:bg-brand-50 dark:hover:bg-bg-dark transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center text-center">
                Browse Categories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 tracking-tight">Featured Assets</h2>
            <p className="text-brand-500 text-lg">Hand-picked premium assets for your next project.</p>
          </div>
          <Link to="/featured" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-brand-900 hover:text-brand-600 dark:text-brand-50 dark:hover:text-brand-300 transition-colors">
            View all featured <ArrowRight size={16} />
          </Link>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredAssets.length > 0 ? (
            featuredAssets.map(asset => (
              <motion.div key={asset.id} variants={itemVariants}>
                <AssetCard asset={asset} />
              </motion.div>
            ))
          ) : (
            [1,2,3,4].map(i => (
              <div key={i} className="rounded-3xl border border-brand-100 dark:border-border-dark bg-brand-50 dark:bg-surface-dark animate-pulse aspect-[3/4]"></div>
            ))
          )}
        </motion.div>
      </section>

      {/* How it works */}
      <section className="relative py-32 bg-brand-950 dark:bg-brand-50 text-white dark:text-brand-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white dark:from-brand-950 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Zero setup required.</h2>
            <p className="text-brand-300 dark:text-brand-700 max-w-2xl mx-auto text-lg">No complex imports, no heavy files. Just clean, documented code snippets ready for your Three.js scenes.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
          >
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-brand-700 dark:via-brand-300 to-transparent"></div>
            
            <motion.div variants={itemVariants} className="relative text-center z-10">
              <div className="w-24 h-24 mx-auto bg-brand-900 dark:bg-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-brand-800 dark:border-brand-200 rotate-[-3deg] hover:rotate-0 transition-transform duration-300">
                <Search className="text-white dark:text-brand-900" size={40} strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-2xl mb-3">1. Find</h3>
              <p className="text-brand-300 dark:text-brand-700">Search our library of optimized models, materials, and setups.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="relative text-center z-10">
              <div className="w-24 h-24 mx-auto bg-brand-900 dark:bg-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-brand-800 dark:border-brand-200 hover:-translate-y-2 transition-transform duration-300">
                <LayoutIcon className="text-white dark:text-brand-900" size={40} strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-2xl mb-3">2. Inspect</h3>
              <p className="text-brand-300 dark:text-brand-700">Preview the asset in your browser with our instant 3D viewer.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="relative text-center z-10">
              <div className="w-24 h-24 mx-auto bg-brand-900 dark:bg-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-brand-800 dark:border-brand-200 rotate-[3deg] hover:rotate-0 transition-transform duration-300">
                <Code className="text-white dark:text-brand-900" size={40} strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-2xl mb-3">3. Deploy</h3>
              <p className="text-brand-300 dark:text-brand-700">Copy the code snippet directly into your web application.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Latest Uploads */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 tracking-tight">Latest Uploads</h2>
            <p className="text-brand-500 text-lg">Fresh content added to the library.</p>
          </div>
          <Link to="/explore" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-brand-900 hover:text-brand-600 dark:text-brand-50 dark:hover:text-brand-300 transition-colors">
            Explore library <ArrowRight size={16} />
          </Link>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {latestAssets.length > 0 ? (
            latestAssets.map(asset => (
              <motion.div key={asset.id} variants={itemVariants}>
                <AssetCard asset={asset} />
              </motion.div>
            ))
          ) : (
             <div className="col-span-full text-center py-20 text-brand-400 bg-brand-50 dark:bg-surface-dark rounded-3xl border border-brand-100 dark:border-border-dark">
                <Cuboid className="mx-auto mb-4 opacity-50" size={40} />
                <p className="font-medium text-lg">No assets uploaded yet.</p>
             </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
