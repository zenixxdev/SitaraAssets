import React, { useState, useEffect } from 'react';
import { Category } from '../../types';
import { Edit2, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = () => {
    fetch('/api/admin/categories', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    })
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load categories");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    
    fetch(`/api/admin/categories/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    }).then(res => {
      if (res.ok) {
        toast.success("Category deleted");
        fetchCategories();
      } else {
        toast.error("Failed to delete category");
      }
    });
  };

  const handleAdd = () => {
    const name = window.prompt("Enter category name:");
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    fetch('/api/admin/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify({ id, name })
    }).then(res => {
      if (res.ok) {
        toast.success("Category created");
        fetchCategories();
      } else {
        toast.error("Failed to create category");
      }
    });
  };

  const handleEdit = (category: Category) => {
    const name = window.prompt("Enter new category name:", category.name);
    if (!name || name === category.name) return;
    
    fetch(`/api/admin/categories/${category.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify({ name })
    }).then(res => {
      if (res.ok) {
        toast.success("Category updated");
        fetchCategories();
      } else {
        toast.error("Failed to update category");
      }
    });
  };

  if (loading) return <div className="p-8">Loading categories...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Category Manager</h1>
          <p className="text-brand-500">Manage asset categories.</p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-brand-900 text-white px-4 py-2 rounded-xl hover:bg-brand-800 transition-colors">
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-brand-100 dark:border-border-dark rounded-3xl overflow-hidden max-w-3xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-50 dark:bg-bg-dark border-b border-brand-100 dark:border-border-dark">
              <th className="p-4 font-semibold text-brand-600 dark:text-brand-400">ID</th>
              <th className="p-4 font-semibold text-brand-600 dark:text-brand-400">Name</th>
              <th className="p-4 font-semibold text-brand-600 dark:text-brand-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} className="border-b border-brand-100 dark:border-border-dark hover:bg-brand-50/50 dark:hover:bg-bg-dark/50 transition-colors">
                <td className="p-4 font-mono text-sm">{cat.id}</td>
                <td className="p-4 font-bold">{cat.name}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(cat)} className="p-2 text-brand-400 hover:text-brand-900 dark:hover:text-white transition-colors" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-brand-500">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
