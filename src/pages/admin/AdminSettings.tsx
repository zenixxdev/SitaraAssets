import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: '',
    siteDescription: '',
    supportEmail: '',
    theme: 'light'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    })
      .then(res => res.json())
      .then(data => {
        setSettings({
          siteName: data.siteName || 'Sitara',
          siteDescription: data.siteDescription || 'The 3D asset library for modern web games.',
          supportEmail: data.supportEmail || 'hello@sitara3d.com',
          theme: data.theme || 'system'
        });
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load settings");
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    fetch('/api/admin/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      },
      body: JSON.stringify(settings)
    }).then(res => {
      if (res.ok) {
        toast.success("Settings saved successfully");
      } else {
        toast.error("Failed to save settings");
      }
      setSaving(false);
    });
  };

  if (loading) return <div className="p-8">Loading settings...</div>;

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Site Settings</h1>
        <p className="text-brand-500">Configure global application settings.</p>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-brand-100 dark:border-border-dark rounded-3xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium mb-2">Site Name</label>
            <input 
              type="text" 
              value={settings.siteName}
              onChange={e => setSettings({...settings, siteName: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-brand-50 dark:bg-bg-dark border border-brand-200 dark:border-border-dark outline-none focus:border-brand-500 transition-colors" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Site Description</label>
            <textarea 
              rows={3}
              value={settings.siteDescription}
              onChange={e => setSettings({...settings, siteDescription: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-brand-50 dark:bg-bg-dark border border-brand-200 dark:border-border-dark outline-none focus:border-brand-500 transition-colors resize-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Support Email</label>
            <input 
              type="email" 
              value={settings.supportEmail}
              onChange={e => setSettings({...settings, supportEmail: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-brand-50 dark:bg-bg-dark border border-brand-200 dark:border-border-dark outline-none focus:border-brand-500 transition-colors" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Default Theme</label>
            <select 
              value={settings.theme}
              onChange={e => setSettings({...settings, theme: e.target.value})}
              className="w-full px-4 py-3 rounded-xl bg-brand-50 dark:bg-bg-dark border border-brand-200 dark:border-border-dark outline-none focus:border-brand-500 transition-colors appearance-none" 
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div className="pt-4">
            <button 
              disabled={saving} 
              type="submit" 
              className="px-6 py-3 bg-brand-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-800 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Settings'}
              <Save size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
