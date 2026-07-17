import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category, Asset } from '../types';
import { FolderTree, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  
  useEffect(() => {
    Promise.all([
      fetch('/api/categories').then(res => res.json()),
      fetch('/api/assets').then(res => res.json())
    ]).then(([cats, asts]) => {
      setCategories(cats);
      setAssets(asts);
    }).catch(console.error);
  }, []);

  const getCount = (catId: string) => assets.filter(a => a.categoryId === catId).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-display font-bold mb-4 tracking-tight">Categories</h1>
        <p className="text-brand-500 text-lg max-w-2xl mx-auto">Browse our library by specialized 3D domains.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link 
              to={`/explore`} 
              state={{ category: cat.id }}
              className="block p-8 rounded-3xl bg-brand-50 dark:bg-surface-dark border border-brand-100 dark:border-border-dark hover:border-brand-300 dark:hover:border-brand-600 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-bg-dark flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <FolderTree className="text-brand-900 dark:text-white" size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">{cat.name}</h2>
              <p className="text-brand-500 text-sm flex items-center justify-between">
                <span>{getCount(cat.id)} Assets</span>
                <ArrowRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
