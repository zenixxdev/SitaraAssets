import React from 'react';
import { Code2, BookOpen, Layers, Zap, MousePointer2, FileText } from 'lucide-react';

export default function AdminStructureGuide() {
  return (
    <div className="max-w-4xl space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Structure & Content Guide</h1>
        <p className="text-brand-500">Standardized formatting for all assets in the Sitara library.</p>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-brand-100 dark:border-border-dark p-8 rounded-3xl shadow-sm">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <BookOpen className="text-brand-400" />
          Three.js Full Sample Structure
        </h2>
        <p className="text-sm text-brand-500 mb-4">
          When adding new Three.js code, follow this complete standardized structure. This ensures compatibility and makes it easy for users to drop into their React components.
        </p>
        <pre className="bg-brand-50 dark:bg-bg-dark p-4 rounded-xl text-xs font-mono text-brand-700 dark:text-brand-300 overflow-x-auto border border-brand-100 dark:border-border-dark">
{`// 1. Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 2. Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 3. Model Container & Loaders
const modelGroup = new THREE.Group();
scene.add(modelGroup);

// Example Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x4f46e5 });
const mesh = new THREE.Mesh(geometry, material);
modelGroup.add(mesh);

// 4. Position & Camera
camera.position.z = 5;

// 5. Animation Loop
let reqId;
function animate() {
  reqId = requestAnimationFrame(animate);
  modelGroup.rotation.x += 0.01;
  modelGroup.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// 6. Cleanup (Exported function or returned from React useEffect)
return () => {
  cancelAnimationFrame(reqId);
  geometry.dispose();
  material.dispose();
  renderer.dispose();
};`}
        </pre>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-brand-100 dark:border-border-dark p-8 rounded-3xl shadow-sm">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <FileText className="text-brand-400" />
          Markdown Guide for Descriptions
        </h2>
        <p className="text-sm text-brand-500 mb-6">
          Asset descriptions support GitHub-flavored Markdown. Use this format to structure your asset documentation.
        </p>

        <div className="space-y-4 text-sm text-brand-700 dark:text-brand-300">
          <div className="grid grid-cols-2 gap-4 border-b border-brand-100 dark:border-border-dark pb-4">
            <div className="font-mono"># Heading 1<br/>## Heading 2<br/>### Heading 3</div>
            <div>Creates hierarchical headers for organizing content.</div>
          </div>
          <div className="grid grid-cols-2 gap-4 border-b border-brand-100 dark:border-border-dark pb-4">
            <div className="font-mono">**Bold Text**<br/>*Italic Text*</div>
            <div>Emphasis and strong emphasis.</div>
          </div>
          <div className="grid grid-cols-2 gap-4 border-b border-brand-100 dark:border-border-dark pb-4">
            <div className="font-mono">- Item 1<br/>- Item 2<br/>  - Sub-item</div>
            <div>Unordered bulleted lists.</div>
          </div>
          <div className="grid grid-cols-2 gap-4 border-b border-brand-100 dark:border-border-dark pb-4">
            <div className="font-mono">1. First step<br/>2. Second step</div>
            <div>Ordered numbered lists.</div>
          </div>
          <div className="grid grid-cols-2 gap-4 border-b border-brand-100 dark:border-border-dark pb-4">
            <div className="font-mono">\`inline code\`<br/><br/>\`\`\`js<br/>const a = 1;<br/>\`\`\`</div>
            <div>Inline code snippets and multi-line code blocks with syntax highlighting.</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="font-mono">[Link text](https://...)<br/>![Image](https://...)</div>
            <div>Hyperlinks and embedded images.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
