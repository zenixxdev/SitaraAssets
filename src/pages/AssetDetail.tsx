import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Asset, Review } from '../types';
import { Star, Copy, Check, Download, AlertTriangle, ShieldCheck, ChevronRight, User, Code } from 'lucide-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

export default function AssetDetail() {
  const { id } = useParams<{ id: string }>();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState<'code' | 'docs' | 'reviews'>('code');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  // New review state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    
    Promise.all([
      fetch(`/api/assets/${id}`).then(res => res.ok ? res.json() : null),
      fetch(`/api/reviews/${id}`).then(res => res.ok ? res.json() : [])
    ]).then(([assetData, reviewsData]) => {
      if(assetData) setAsset(assetData);
      if(Array.isArray(reviewsData)) setReviews(reviewsData);
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  }, [id]);

  const copyToClipboard = (text: string, type: 'code' | 'embed') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2000);
    }
    toast.success('Copied to clipboard!');
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!asset || !reviewText.trim()) return;
    
    setIsSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assetId: asset.id,
          rating: reviewRating,
          text: reviewText,
          name: reviewName.trim() || 'Anonymous',
          helpfulVotes: 0
        })
      });
      if (res.ok) {
        const newReview = await res.json();
        setReviews([newReview, ...reviews]);
        setReviewText('');
        setReviewName('');
        setReviewRating(5);
        toast.success('Review submitted successfully!');
      }
    } catch (err) {
      toast.error('Failed to submit review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (isLoading) {
    return <div className="max-w-7xl mx-auto p-8 animate-pulse flex flex-col gap-8">
      <div className="h-10 bg-brand-100 dark:bg-surface-dark rounded w-1/3"></div>
      <div className="h-[500px] bg-brand-50 dark:bg-bg-dark rounded-3xl"></div>
    </div>;
  }

  if (!asset) {
    return <div className="max-w-7xl mx-auto p-8 text-center py-32">
      <h2 className="text-3xl font-display font-bold mb-4">Asset not found</h2>
      <Link to="/explore" className="text-brand-600 hover:underline">Return to Explore</Link>
    </div>;
  }

  const dummyCode = asset.threejsCode || `// Sitara Asset Snippet: ${asset.name}
import * as THREE from 'three';
// Copy this directly into your Three.js scene setup
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-brand-500 mb-6">
        <Link to="/" className="hover:text-brand-900 dark:hover:text-white">Home</Link>
        <ChevronRight size={14} />
        <Link to="/explore" className="hover:text-brand-900 dark:hover:text-white">Explore</Link>
        <ChevronRight size={14} />
        <span className="text-brand-900 dark:text-white font-medium">{asset.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Preview and Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {asset.featured && <span className="bg-brand-900 text-white text-xs px-2 py-1 rounded-md font-medium">Featured</span>}
              {asset.editorChoice && <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-md font-medium">Editor's Choice</span>}
              <span className="bg-brand-100 dark:bg-surface-dark text-brand-700 dark:text-brand-300 text-xs px-2 py-1 rounded-md">{asset.license || 'Free'}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">{asset.name}</h1>
            <p className="text-lg text-brand-600 dark:text-brand-400 leading-relaxed">{asset.description}</p>
          </div>

          {/* 3D Preview Placeholder */}
          <div className="bg-brand-50 dark:bg-bg-dark rounded-3xl overflow-hidden border border-brand-200 dark:border-border-dark aspect-video relative group">
            <div className="absolute inset-0 flex items-center justify-center flex-col text-brand-400 dark:text-brand-600 bg-white/50 dark:bg-black/50 backdrop-blur-sm z-10 transition-opacity group-hover:opacity-0">
               <span className="font-medium mb-2">Interactive Preview</span>
               <span className="text-xs">Hover to interact</span>
            </div>
            {asset.previewImage ? (
              <img src={asset.previewImage} alt="Preview" className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full flex items-center justify-center font-mono text-sm text-brand-300">THREE.JS CANVAS PLACEHOLDER</div>
            )}
          </div>

          {/* Tabs */}
          <div>
            <div className="flex border-b border-brand-200 dark:border-border-dark mb-6">
              {(['code', 'docs', 'reviews'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-brand-900 dark:border-white text-brand-900 dark:text-white' : 'border-transparent text-brand-500 hover:text-brand-700 dark:hover:text-brand-300'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} {tab === 'reviews' && `(${reviews.length})`}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              
              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden border border-brand-800">
                    <div className="flex justify-between items-center px-4 py-2 bg-[#2d2d2d] border-b border-brand-800">
                      <span className="text-xs font-mono text-brand-300">Three.js Snippet</span>
                      <button 
                        onClick={() => copyToClipboard(dummyCode, 'code')}
                        className="flex items-center gap-1 text-xs text-brand-300 hover:text-white transition-colors"
                      >
                        {copiedCode ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        {copiedCode ? 'Copied!' : 'Copy Code'}
                      </button>
                    </div>
                    <pre className="p-4 text-sm font-mono text-[#d4d4d4] overflow-x-auto whitespace-pre-wrap">
                      {dummyCode}
                    </pre>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex gap-3 text-blue-800 dark:text-blue-300">
                    <ShieldCheck size={20} className="shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm mb-1">Safe to edit</h4>
                      <p className="text-xs opacity-80">This snippet is designed to be modified. Adjust materials, geometry parameters, or animation speeds as needed for your specific game context.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'docs' && (
                <div className="prose dark:prose-invert max-w-none markdown-body">
                  <Markdown>{asset.longDescription || asset.description || 'No detailed documentation available.'}</Markdown>
                  
                  <h4>Usage Instructions</h4>
                  <p>{asset.usageInstructions || 'Simply copy the snippet and paste it into your Three.js initialization sequence.'}</p>
                  
                  <h4>Customization</h4>
                  <p>{asset.customizationInstructions || 'Colors and scale can be easily adjusted in the exported material properties.'}</p>
                  
                  <h4>Performance Notes</h4>
                  <p>{asset.performanceTips || 'Highly optimized for web. Uses minimal draw calls.'}</p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-8">
                  {/* Write Review */}
                  <div className="bg-brand-50 dark:bg-surface-dark p-6 rounded-2xl border border-brand-100 dark:border-border-dark">
                    <h3 className="font-semibold mb-4 text-lg">Leave a Review</h3>
                    <form onSubmit={submitReview} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Rating</label>
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map(star => (
                            <button 
                              key={star} 
                              type="button"
                              onClick={() => setReviewRating(star)}
                              className={`p-1 ${reviewRating >= star ? 'text-amber-500' : 'text-brand-300 dark:text-brand-700'}`}
                            >
                              <Star size={24} className={reviewRating >= star ? 'fill-current' : ''} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name (Optional)</label>
                          <input 
                            type="text" 
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            placeholder="Your name" 
                            className="w-full px-3 py-2 bg-white dark:bg-bg-dark border border-brand-200 dark:border-border-dark rounded-lg outline-none focus:border-brand-400"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Review</label>
                        <textarea 
                          required
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="What do you think about this asset?" 
                          rows={3}
                          className="w-full px-3 py-2 bg-white dark:bg-bg-dark border border-brand-200 dark:border-border-dark rounded-lg outline-none focus:border-brand-400 resize-none"
                        ></textarea>
                      </div>
                      <button 
                        type="submit" 
                        disabled={isSubmittingReview || !reviewText.trim()}
                        className="px-6 py-2 bg-brand-900 text-white rounded-lg font-medium hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  </div>

                  {/* Review List */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Community Reviews ({reviews.length})</h3>
                    {reviews.length === 0 ? (
                      <p className="text-brand-500 text-sm">No reviews yet. Be the first!</p>
                    ) : (
                      reviews.map(review => (
                        <div key={review.id} className="border-b border-brand-100 dark:border-border-dark pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-brand-200 dark:bg-brand-800 flex items-center justify-center text-brand-600 dark:text-brand-300">
                              <User size={16} />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{review.name}</p>
                              <div className="flex text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={12} className={i < review.rating ? 'fill-current' : 'text-brand-200 dark:text-brand-800'} />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-brand-400 ml-auto">{new Date(review.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm text-brand-700 dark:text-brand-300">{review.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right Col: Sidebar info */}
        <div className="space-y-6">
          
          <div className="bg-brand-50 dark:bg-surface-dark p-6 rounded-3xl border border-brand-100 dark:border-border-dark">
            <h3 className="font-semibold mb-6">Asset Details</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-brand-100 dark:border-border-dark">
                <span className="text-brand-500">License</span>
                <span className="font-medium text-right">{asset.license || 'Free / Open'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-brand-100 dark:border-border-dark">
                <span className="text-brand-500">Updated</span>
                <span className="font-medium text-right">{new Date(asset.updatedDate || asset.createdDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-brand-100 dark:border-border-dark">
                <span className="text-brand-500">Format</span>
                <span className="font-medium text-right font-mono text-xs bg-white dark:bg-bg-dark px-2 py-0.5 rounded">Three.js Code</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-brand-100 dark:border-border-dark">
                <span className="text-brand-500">Rating</span>
                <span className="font-medium text-right flex items-center gap-1">
                  <Star size={14} className="text-amber-500 fill-current" /> {asset.stars?.toFixed(1) || '0.0'} ({asset.reviewCount || 0})
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button 
                onClick={() => copyToClipboard(dummyCode, 'code')}
                className="w-full py-3 bg-brand-950 dark:bg-brand-50 text-white dark:text-brand-950 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-brand-800 dark:hover:bg-white transition-colors"
              >
                {copiedCode ? <Check size={18} /> : <Copy size={18} />}
                {copiedCode ? 'Snippet Copied' : 'Copy Full Snippet'}
              </button>
              <button 
                onClick={() => copyToClipboard(`<iframe src="${window.location.origin}/embed/${asset.id}" width="100%" height="400" frameborder="0"></iframe>`, 'embed')}
                className="w-full py-3 bg-white dark:bg-bg-dark border border-brand-200 dark:border-border-dark text-brand-900 dark:text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-brand-50 dark:hover:bg-surface-dark transition-colors"
              >
                {copiedEmbed ? <Check size={18} /> : <Code size={18} />}
                {copiedEmbed ? 'Embed Copied' : 'Copy Embed Link'}
              </button>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 p-6 rounded-3xl">
            <h3 className="font-semibold text-amber-900 dark:text-amber-500 flex items-center gap-2 mb-3">
              <AlertTriangle size={18} />
              Performance Note
            </h3>
            <p className="text-sm text-amber-800 dark:text-amber-400/80 leading-relaxed">
              This asset is optimized for web games, but rendering performance depends on your global scene configuration. Always test on target devices.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
