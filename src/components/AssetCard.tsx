import React from 'react';
import { Link } from 'react-router-dom';
import { Asset } from '../types';
import { Star, Download } from 'lucide-react';

interface AssetCardProps {
  asset: Asset;
  key?: React.Key;
}

export default function AssetCard({ asset }: AssetCardProps) {
  return (
    <Link 
      to={`/asset/${asset.id}`} 
      className="group block rounded-2xl border border-brand-100 dark:border-border-dark bg-white dark:bg-surface-dark overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-video bg-brand-50 dark:bg-bg-dark overflow-hidden">
        {asset.coverImage ? (
          <img 
            src={asset.coverImage} 
            alt={asset.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-300">
            No Image
          </div>
        )}
        
        {asset.featured && (
          <div className="absolute top-3 left-3 bg-brand-900 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm">
            Featured
          </div>
        )}
        
        {asset.editorChoice && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm">
            Editor's Choice
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-semibold text-lg text-brand-900 dark:text-white truncate">{asset.name}</h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={14} className="fill-current" />
            <span className="text-xs font-medium">{asset.stars?.toFixed(1) || '0.0'}</span>
          </div>
        </div>
        
        <p className="text-sm text-brand-500 dark:text-brand-400 line-clamp-2 mb-4">
          {asset.description || 'No description provided.'}
        </p>

        <div className="flex justify-between items-center text-xs">
          <span className="bg-brand-50 dark:bg-bg-dark text-brand-600 dark:text-brand-300 px-2 py-1 rounded-md">
            {asset.license || 'Free'}
          </span>
          <div className="flex gap-2 text-brand-400">
             <span>{asset.reviewCount || 0} reviews</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
