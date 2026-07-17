import React from 'react';
import { Cuboid } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-brand-950 dark:bg-white text-white dark:text-brand-950 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl hover:scale-105 transition-transform">
          <Cuboid size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">About Sitara</h1>
        <p className="text-xl text-brand-500 max-w-2xl mx-auto leading-relaxed">
          Bridging the gap between beautiful 3D design and performant web engineering.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-brand-700 dark:text-brand-300">
        <p className="text-lg leading-relaxed mb-6">
          Building 3D experiences on the web is traditionally hard. You spend hours searching for models, optimizing their geometry, baking textures, and then writing boilerplate Three.js code just to get them to render correctly.
        </p>
        <p className="text-lg leading-relaxed mb-12">
          Sitara was built to solve this. We act as a bridge—providing a curated library of assets that aren't just visually stunning, but are pre-optimized and packaged with the exact Three.js boilerplate needed to drop them into a scene.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="p-8 bg-brand-50 dark:bg-surface-dark border border-brand-100 dark:border-border-dark rounded-3xl">
            <h3 className="font-display font-bold text-xl mb-4">Performance First</h3>
            <p className="text-sm leading-relaxed">Every asset is evaluated for web suitability. We prioritize low draw calls, compressed textures, and efficient geometry structures.</p>
          </div>
          <div className="p-8 bg-brand-50 dark:bg-surface-dark border border-brand-100 dark:border-border-dark rounded-3xl">
            <h3 className="font-display font-bold text-xl mb-4">Developer Experience</h3>
            <p className="text-sm leading-relaxed">No forced logins. No complicated export settings. Just browse, copy the code snippet, and paste into your environment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
