import React, { useEffect, useState } from 'react';
import { Asset } from '../types';
import AssetCard from '../components/AssetCard';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';

export default function EditorsChoice() {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    fetch('/api/assets')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
           setAssets(data.filter(a => a.editorChoice));
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-16">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mb-6">
          <Award size={24} />
        </div>
        <h1 className="text-5xl font-display font-bold mb-4 tracking-tight">Editor's Choice</h1>
        <p className="text-brand-500 text-lg max-w-2xl">Exceptional assets selected for their technical optimization and artistic quality.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {assets.map((asset, i) => (
          <motion.div 
            key={asset.id} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1 }}
          >
            <AssetCard asset={asset} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
