import React from 'react';
import { Shield, Check, X } from 'lucide-react';

export default function LicenseGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-brand-50 dark:bg-surface-dark border border-brand-100 dark:border-border-dark mb-6">
          <Shield size={32} className="text-brand-900 dark:text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">License Guide</h1>
        <p className="text-brand-500 text-lg">Understand how you can use assets from Sitara.</p>
      </div>

      <div className="space-y-12">
        
        <div className="bg-brand-50 dark:bg-surface-dark p-8 md:p-12 rounded-3xl border border-brand-100 dark:border-border-dark">
          <h2 className="text-2xl font-display font-bold mb-4">Sitara Free License</h2>
          <p className="text-brand-600 dark:text-brand-400 mb-8 leading-relaxed">
            The majority of assets on Sitara are released under our Free License, meaning they are completely free to use for both personal and commercial projects without required attribution.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-green-600 flex items-center gap-2"><Check size={18} /> You can:</h3>
              <ul className="space-y-3 text-sm text-brand-600 dark:text-brand-400">
                <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> Use assets in commercial web games.</li>
                <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> Modify, tweak, and edit the code snippets.</li>
                <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> Use without crediting the original author (though it's appreciated).</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-red-600 flex items-center gap-2"><X size={18} /> You cannot:</h3>
              <ul className="space-y-3 text-sm text-brand-600 dark:text-brand-400">
                <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" /> Resell the raw assets or code snippets on other marketplaces.</li>
                <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" /> Claim authorship of the unmodified asset.</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-display font-bold mb-4">Other Licenses</h3>
          <p className="text-brand-500 mb-6">Some assets may have specific licenses designated by their authors. Always check the asset details page.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-brand-200 dark:border-border-dark rounded-2xl">
               <h4 className="font-bold mb-2">CC-BY (Creative Commons Attribution)</h4>
               <p className="text-sm text-brand-600 dark:text-brand-400">Free to use, modify, and distribute, even commercially, as long as appropriate credit is given to the author.</p>
            </div>
            <div className="p-6 border border-brand-200 dark:border-border-dark rounded-2xl">
               <h4 className="font-bold mb-2">Personal Use Only</h4>
               <p className="text-sm text-brand-600 dark:text-brand-400">Free for personal projects, portfolios, and non-commercial games. Cannot be used in products that generate revenue.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
