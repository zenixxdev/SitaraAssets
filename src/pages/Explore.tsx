import React, { useState, useEffect } from 'react';
import { Asset, Category } from '../types';
import AssetCard from '../components/AssetCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

export default function Explore() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLicense, setSelectedLicense] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/assets').then(res => res.json()),
      fetch('/api/categories').then(res => res.json())
    ]).then(([assetsData, categoriesData]) => {
      if(Array.isArray(assetsData)) setAssets(assetsData);
      if(Array.isArray(categoriesData)) setCategories(categoriesData);
      setIsLoading(false);
    }).catch((err) => {
      console.error(err);
      setIsLoading(false);
    });
  }, []);

  const filteredAssets = assets
    .filter(asset => {
      if (selectedCategory !== 'all' && asset.categoryId !== selectedCategory) return false;
      if (selectedLicense !== 'all' && asset.license !== selectedLicense) return false;
      if (searchTerm && !asset.name.toLowerCase().includes(searchTerm.toLowerCase()) && !asset.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      if (sortBy === 'popular') return (b.reviewCount || 0) - (a.reviewCount || 0);
      if (sortBy === 'top-rated') return (b.stars || 0) - (a.stars || 0);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-display font-bold mb-4">Explore Library</h1>
        <p className="text-brand-500 max-w-2xl text-lg">Browse our entire collection of 3D models, environments, and materials ready to be dropped into your web projects.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 shrink-0 space-y-8 sticky top-24">
          
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-brand-50 dark:bg-surface-dark border border-transparent dark:border-border-dark focus:border-brand-400 dark:focus:border-brand-600 rounded-xl outline-none transition-colors"
            />
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-brand-500">Categories</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="category" 
                  checked={selectedCategory === 'all'} 
                  onChange={() => setSelectedCategory('all')}
                  className="w-4 h-4 text-brand-900 border-brand-300 focus:ring-brand-900 dark:bg-bg-dark dark:border-border-dark"
                />
                <span className="text-sm group-hover:text-brand-900 dark:group-hover:text-white transition-colors">All Assets</span>
              </label>
              {categories.map(cat => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={selectedCategory === cat.id} 
                    onChange={() => setSelectedCategory(cat.id)}
                    className="w-4 h-4 text-brand-900 border-brand-300 focus:ring-brand-900 dark:bg-bg-dark dark:border-border-dark"
                  />
                  <span className="text-sm group-hover:text-brand-900 dark:group-hover:text-white transition-colors">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-brand-500">License</h3>
            <div className="space-y-2">
              {['all', 'Free', 'Personal', 'Commercial', 'CC-BY'].map(license => (
                <label key={license} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="license" 
                    checked={selectedLicense === license} 
                    onChange={() => setSelectedLicense(license)}
                    className="w-4 h-4 text-brand-900 border-brand-300 focus:ring-brand-900 dark:bg-bg-dark dark:border-border-dark"
                  />
                  <span className="text-sm group-hover:text-brand-900 dark:group-hover:text-white transition-colors">{license === 'all' ? 'All Licenses' : license}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Main Grid */}
        <div className="flex-1 w-full">
          
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-brand-500">Showing {filteredAssets.length} results</p>
            
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-brand-400" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm font-medium outline-none cursor-pointer hover:text-brand-900 dark:hover:text-white transition-colors appearance-none"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="top-rated">Top Rated</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="rounded-2xl border border-brand-100 dark:border-border-dark bg-brand-50 dark:bg-surface-dark animate-pulse aspect-[3/4]"></div>
              ))}
            </div>
          ) : filteredAssets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAssets.map(asset => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-brand-50 dark:bg-surface-dark rounded-3xl border border-brand-100 dark:border-border-dark">
              <Filter size={48} className="mx-auto mb-4 text-brand-300" />
              <h3 className="text-xl font-medium mb-2">No assets found</h3>
              <p className="text-brand-500 max-w-sm mx-auto mb-6">Try adjusting your search or filters to find what you're looking for.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedLicense('all'); }}
                className="px-6 py-2 bg-brand-950 dark:bg-brand-50 text-white dark:text-brand-950 rounded-full text-sm font-medium hover:bg-brand-800 dark:hover:bg-white transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
