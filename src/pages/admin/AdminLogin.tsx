import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('sitara_admin_token', data.token);
        toast.success('Access granted');
        navigate('/secret-accses/dashboard');
      } else {
        toast.error('Invalid password');
      }
    } catch (err) {
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-50 dark:bg-bg-dark px-4">
      <div className="w-full max-w-sm bg-white dark:bg-surface-dark border border-brand-100 dark:border-border-dark p-8 rounded-3xl shadow-sm text-center">
        <div className="w-12 h-12 bg-brand-100 dark:bg-bg-dark rounded-full flex items-center justify-center mx-auto mb-6 text-brand-600 dark:text-brand-400">
          <Lock size={20} />
        </div>
        <h1 className="text-2xl font-display font-bold mb-2">Restricted Access</h1>
        <p className="text-brand-500 text-sm mb-8">Admin personnel only. Please verify.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 bg-brand-50 dark:bg-bg-dark border border-brand-200 dark:border-border-dark rounded-xl outline-none focus:border-brand-400 text-center tracking-widest"
          />
          <button 
            type="submit"
            disabled={isLoading || !password}
            className="w-full py-3 bg-brand-950 dark:bg-brand-50 text-white dark:text-brand-950 rounded-xl font-medium hover:bg-brand-800 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  );
}
