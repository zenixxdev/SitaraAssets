import React, { useState, useEffect } from 'react';
import { Asset } from '../../types';
import { Edit2, Trash2, Plus, Copy, ExternalLink, Image as ImageIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Partial<Asset> | null>(null);

  const fetchAssets = () => {
    fetch('/api/admin/assets', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    })
      .then(res => res.json())
      .then(data => {
        setAssets(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load assets");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this asset?")) return;
    
    fetch(`/api/admin/assets/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    }).then(res => {
      if (res.ok) {
        toast.success("Asset deleted");
        fetchAssets();
      } else {
        toast.error("Failed to delete asset");
      }
    });
  };

  const handleDuplicate = (asset: Asset) => {
    const newAsset = { ...asset, name: `${asset.name} (Copy)`, slug: `${asset.slug}-copy`, id: undefined };
    fetch('/api/admin/assets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(newAsset)
    }).then(res => {
      if (res.ok) {
        toast.success("Asset duplicated");
        fetchAssets();
      } else {
        toast.error("Failed to duplicate asset");
      }
    });
  };

  const openAddModal = () => {
    setEditingAsset({
      name: '', slug: '', categoryId: '3d-models', description: '', previewImage: '', featured: false, editorChoice: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (asset: Asset) => {
    setEditingAsset(asset);
    setIsModalOpen(true);
  };

  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = !!editingAsset?.id;
    const url = isEditing ? `/api/admin/assets/${editingAsset.id}` : '/api/admin/assets';
    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(editingAsset)
    }).then(res => {
      if (res.ok) {
        toast.success(isEditing ? "Asset updated" : "Asset created");
        setIsModalOpen(false);
        fetchAssets();
      } else {
        toast.error("Failed to save asset");
      }
    });
  };

  if (loading) return <div className="p-8">Loading assets...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Asset Manager</h1>
          <p className="text-brand-500">Manage your 3D models and code snippets.</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-brand-900 text-white px-4 py-2 rounded-xl hover:bg-brand-800 transition-colors">
          <Plus size={18} /> Add New Asset
        </button>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-brand-100 dark:border-border-dark rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-50 dark:bg-bg-dark border-b border-brand-100 dark:border-border-dark">
              <th className="p-4 font-semibold text-brand-600 dark:text-brand-400">Asset</th>
              <th className="p-4 font-semibold text-brand-600 dark:text-brand-400">Category</th>
              <th className="p-4 font-semibold text-brand-600 dark:text-brand-400">Status</th>
              <th className="p-4 font-semibold text-brand-600 dark:text-brand-400">Stats</th>
              <th className="p-4 font-semibold text-brand-600 dark:text-brand-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset.id} className="border-b border-brand-100 dark:border-border-dark hover:bg-brand-50/50 dark:hover:bg-bg-dark/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-bg-dark overflow-hidden shrink-0">
                      {asset.previewImage ? (
                        <img src={asset.previewImage} alt={asset.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-400"><ImageIcon size={20} /></div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold">{asset.name}</div>
                      <div className="text-sm text-brand-500">{asset.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-brand-100 dark:bg-bg-dark text-xs rounded-md">{asset.categoryId}</span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {asset.featured && <span className="px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 text-xs rounded-md font-medium">Featured</span>}
                    {asset.editorChoice && <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 text-xs rounded-md font-medium">Editor's Choice</span>}
                  </div>
                </td>
                <td className="p-4 text-sm text-brand-500">
                  {asset.stars} stars / {asset.reviewCount} reviews
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/asset/${asset.id}`} target="_blank" className="p-2 text-brand-400 hover:text-brand-900 dark:hover:text-white transition-colors" title="View live">
                      <ExternalLink size={18} />
                    </Link>
                    <button onClick={() => handleDuplicate(asset)} className="p-2 text-brand-400 hover:text-brand-900 dark:hover:text-white transition-colors" title="Duplicate">
                      <Copy size={18} />
                    </button>
                    <button onClick={() => openEditModal(asset)} className="p-2 text-brand-400 hover:text-brand-900 dark:hover:text-white transition-colors" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(asset.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && editingAsset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-950/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-surface-dark w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-brand-100 dark:border-border-dark flex justify-between items-center shrink-0">
                <h2 className="text-xl font-bold">{editingAsset.id ? 'Edit Asset' : 'New Asset'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-brand-500 hover:text-brand-900 dark:hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <form id="asset-form" onSubmit={handleSaveAsset} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input required type="text" value={editingAsset.name || ''} onChange={e => setEditingAsset({...editingAsset, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-brand-200 dark:border-border-dark bg-transparent outline-none focus:border-brand-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Slug</label>
                      <input required type="text" value={editingAsset.slug || ''} onChange={e => setEditingAsset({...editingAsset, slug: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-brand-200 dark:border-border-dark bg-transparent outline-none focus:border-brand-500" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select required value={editingAsset.categoryId || ''} onChange={e => setEditingAsset({...editingAsset, categoryId: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-brand-200 dark:border-border-dark bg-brand-50 dark:bg-bg-dark outline-none focus:border-brand-500">
                      <option value="3d-models">3D Models</option>
                      <option value="materials">Materials</option>
                      <option value="environments">Environments</option>
                      <option value="animations">Animations</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Preview Image URL</label>
                    <input type="text" value={editingAsset.previewImage || ''} onChange={e => setEditingAsset({...editingAsset, previewImage: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-brand-200 dark:border-border-dark bg-transparent outline-none focus:border-brand-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Short Description</label>
                    <textarea rows={2} value={editingAsset.description || ''} onChange={e => setEditingAsset({...editingAsset, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-brand-200 dark:border-border-dark bg-transparent outline-none focus:border-brand-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 flex justify-between">
                      <span>Documentation (Markdown)</span>
                      <span className="text-xs text-brand-500 font-normal">Supports GitHub-flavored markdown</span>
                    </label>
                    <textarea rows={6} value={editingAsset.longDescription || ''} onChange={e => setEditingAsset({...editingAsset, longDescription: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-brand-200 dark:border-border-dark bg-transparent outline-none focus:border-brand-500 font-mono text-sm" placeholder="# My Asset&#10;Detailed description here..."></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Three.js Code</label>
                    <textarea rows={5} value={editingAsset.threejsCode || ''} onChange={e => setEditingAsset({...editingAsset, threejsCode: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-brand-200 dark:border-border-dark bg-transparent outline-none focus:border-brand-500 font-mono text-xs" />
                  </div>

                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={editingAsset.featured || false} onChange={e => setEditingAsset({...editingAsset, featured: e.target.checked})} className="rounded border-brand-300 text-brand-900 focus:ring-brand-900" />
                      Featured
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={editingAsset.editorChoice || false} onChange={e => setEditingAsset({...editingAsset, editorChoice: e.target.checked})} className="rounded border-brand-300 text-brand-900 focus:ring-brand-900" />
                      Editor's Choice
                    </label>
                  </div>
                </form>
              </div>
              <div className="p-6 border-t border-brand-100 dark:border-border-dark shrink-0 flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-medium hover:bg-brand-50 dark:hover:bg-bg-dark rounded-xl transition-colors">Cancel</button>
                <button type="submit" form="asset-form" className="px-6 py-2 font-bold bg-brand-900 text-white rounded-xl hover:bg-brand-800 transition-colors">Save Asset</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
