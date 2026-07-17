import React, { useState, useEffect } from 'react';
import { Review } from '../../types';
import { Check, X, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = () => {
    fetch('/api/admin/reviews', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    })
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load reviews");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    
    fetch(`/api/admin/reviews/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    }).then(res => {
      if (res.ok) {
        toast.success("Review deleted");
        fetchReviews();
      } else {
        toast.error("Failed to delete review");
      }
    });
  };

  const handleToggleStatus = (review: Review) => {
    fetch(`/api/admin/reviews/${review.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify({ approved: !review.approved })
    }).then(res => {
      if (res.ok) {
        toast.success("Review status updated");
        fetchReviews();
      } else {
        toast.error("Failed to update status");
      }
    });
  };

  if (loading) return <div className="p-8">Loading reviews...</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Review Manager</h1>
        <p className="text-brand-500">Manage user reviews for assets.</p>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-brand-100 dark:border-border-dark rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-50 dark:bg-bg-dark border-b border-brand-100 dark:border-border-dark">
              <th className="p-4 font-semibold text-brand-600 dark:text-brand-400">User / Date</th>
              <th className="p-4 font-semibold text-brand-600 dark:text-brand-400">Asset ID</th>
              <th className="p-4 font-semibold text-brand-600 dark:text-brand-400">Rating</th>
              <th className="p-4 font-semibold text-brand-600 dark:text-brand-400">Comment</th>
              <th className="p-4 font-semibold text-brand-600 dark:text-brand-400">Status</th>
              <th className="p-4 font-semibold text-brand-600 dark:text-brand-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review.id} className="border-b border-brand-100 dark:border-border-dark hover:bg-brand-50/50 dark:hover:bg-bg-dark/50 transition-colors">
                <td className="p-4">
                  <div className="font-bold">{review.name || 'Anonymous'}</div>
                  <div className="text-xs text-brand-500">{new Date(review.createdAt).toLocaleDateString()}</div>
                </td>
                <td className="p-4 text-sm font-mono">{review.assetId}</td>
                <td className="p-4">
                  <div className="flex items-center text-amber-500">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                </td>
                <td className="p-4 text-sm max-w-xs truncate" title={review.text}>
                  {review.text}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-md font-medium ${
                    review.approved 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {review.approved ? 'approved' : 'pending'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleToggleStatus(review)} className="p-2 text-brand-400 hover:text-green-600 transition-colors" title={review.approved ? "Revoke Approval" : "Approve"}>
                      {review.approved ? <X size={18} /> : <Check size={18} />}
                    </button>
                    <button onClick={() => handleDelete(review.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-brand-500">No reviews found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
