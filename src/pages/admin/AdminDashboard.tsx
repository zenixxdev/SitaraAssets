import React, { useState, useEffect } from 'react';
import { Asset, Review } from '../../types';
import { Database, Star, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalAssets: 0,
    totalReviews: 0,
    featuredCount: 0,
    avgRating: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('sitara_admin_token');
    Promise.all([
      fetch('/api/admin/assets', { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch('/api/reviews/all').then(res => res.ok ? res.json() : []) // Mocking, we don't have /all reviews endpoint but this is just structure for now
    ]).then(([assetsData, reviewsData]) => {
      if (Array.isArray(assetsData)) {
        setStats({
          totalAssets: assetsData.length,
          totalReviews: reviewsData.length || 0,
          featuredCount: assetsData.filter(a => a.featured).length,
          avgRating: assetsData.reduce((acc, a) => acc + (a.stars || 0), 0) / (assetsData.length || 1)
        });
      }
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="animate-pulse">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Dashboard Overview</h1>
        <p className="text-brand-500">Welcome back. Here's what's happening in Sitara.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white dark:bg-surface-dark border border-brand-100 dark:border-border-dark p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4 mb-4 text-brand-500">
            <div className="p-2 bg-brand-50 dark:bg-bg-dark rounded-lg">
              <Database size={20} className="text-brand-700 dark:text-brand-300" />
            </div>
            <span className="font-medium text-sm">Total Assets</span>
          </div>
          <p className="text-3xl font-bold font-display">{stats.totalAssets}</p>
        </div>

        <div className="bg-white dark:bg-surface-dark border border-brand-100 dark:border-border-dark p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4 mb-4 text-brand-500">
            <div className="p-2 bg-brand-50 dark:bg-bg-dark rounded-lg">
              <Star size={20} className="text-amber-500" />
            </div>
            <span className="font-medium text-sm">Total Reviews</span>
          </div>
          <p className="text-3xl font-bold font-display">{stats.totalReviews}</p>
        </div>

        <div className="bg-white dark:bg-surface-dark border border-brand-100 dark:border-border-dark p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4 mb-4 text-brand-500">
            <div className="p-2 bg-brand-50 dark:bg-bg-dark rounded-lg">
              <CheckCircle size={20} className="text-green-500" />
            </div>
            <span className="font-medium text-sm">Featured</span>
          </div>
          <p className="text-3xl font-bold font-display">{stats.featuredCount}</p>
        </div>

        <div className="bg-white dark:bg-surface-dark border border-brand-100 dark:border-border-dark p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4 mb-4 text-brand-500">
            <div className="p-2 bg-brand-50 dark:bg-bg-dark rounded-lg">
              <Star size={20} className="text-brand-700 dark:text-brand-300" />
            </div>
            <span className="font-medium text-sm">Avg Rating</span>
          </div>
          <p className="text-3xl font-bold font-display">{stats.avgRating.toFixed(1)}</p>
        </div>

      </div>

      <div className="bg-white dark:bg-surface-dark border border-brand-100 dark:border-border-dark p-6 rounded-2xl shadow-sm min-h-[300px] flex items-center justify-center text-brand-400">
         <div className="text-center">
            <Clock size={32} className="mx-auto mb-4 opacity-50" />
            <p>Recent activity feed placeholder.</p>
         </div>
      </div>
    </div>
  );
}
