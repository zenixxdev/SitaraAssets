import React from 'react';
import { Code2, BookOpen, Layers, Zap, MousePointer2 } from 'lucide-react';

export default function AdminStructureGuide() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Three.js Structure Guide</h1>
        <p className="text-brand-500">Standardized formatting for all assets in the Sitara library.</p>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-brand-100 dark:border-border-dark p-8 rounded-3xl shadow-sm">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <BookOpen className="text-brand-400" />
          Recommended Code Flow
        </h2>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-bg-dark border border-brand-200 dark:border-border-dark flex items-center justify-center shrink-0 font-mono text-sm">1</div>
            <div>
              <h3 className="font-medium mb-1 flex items-center gap-2"><Layers size={16} className="text-brand-400" /> Scene Setup</h3>
              <p className="text-sm text-brand-500 mb-2">Initialize your scene, camera, and renderer. Ensure alpha is enabled if background transparency is needed.</p>
              <pre className="bg-brand-50 dark:bg-bg-dark p-3 rounded-lg text-xs font-mono text-brand-700 dark:text-brand-300">
{`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });`}
              </pre>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-bg-dark border border-brand-200 dark:border-border-dark flex items-center justify-center shrink-0 font-mono text-sm">2</div>
            <div>
              <h3 className="font-medium mb-1 flex items-center gap-2"><Zap size={16} className="text-brand-400" /> Lights</h3>
              <p className="text-sm text-brand-500 mb-2">Set up ambient and directional lights. Use environment maps for PBR materials instead of complex light rigs if possible.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-bg-dark border border-brand-200 dark:border-border-dark flex items-center justify-center shrink-0 font-mono text-sm">3</div>
            <div>
              <h3 className="font-medium mb-1 flex items-center gap-2"><Code2 size={16} className="text-brand-400" /> Model Container & Loaders</h3>
              <p className="text-sm text-brand-500 mb-2">Create a parent Group for the model to make scaling and positioning easier when users import it.</p>
              <pre className="bg-brand-50 dark:bg-bg-dark p-3 rounded-lg text-xs font-mono text-brand-700 dark:text-brand-300">
{`const modelGroup = new THREE.Group();
scene.add(modelGroup);

// Load GLTF inside modelGroup
loader.load('path.gltf', (gltf) => {
  modelGroup.add(gltf.scene);
});`}
              </pre>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-bg-dark border border-brand-200 dark:border-border-dark flex items-center justify-center shrink-0 font-mono text-sm">4</div>
            <div>
              <h3 className="font-medium mb-1 flex items-center gap-2"><MousePointer2 size={16} className="text-brand-400" /> Controls & Interactivity</h3>
              <p className="text-sm text-brand-500 mb-2">Use OrbitControls for standard preview rotation. Disable zoom if the model is meant to be a static UI element.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-bg-dark border border-brand-200 dark:border-border-dark flex items-center justify-center shrink-0 font-mono text-sm">5</div>
            <div>
              <h3 className="font-medium mb-1">Animation & Resize Handling</h3>
              <p className="text-sm text-brand-500 mb-2">Include a standard requestAnimationFrame loop and a window resize event listener to update camera aspect ratio.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-bg-dark border border-brand-200 dark:border-border-dark flex items-center justify-center shrink-0 font-mono text-sm">6</div>
            <div>
              <h3 className="font-medium mb-1">Cleanup Handling</h3>
              <p className="text-sm text-brand-500 mb-2">Provide a cleanup function for React useEffect unmounting to dispose of geometries, materials, and renderer.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
