import React from 'react';

export default function FAQ() {
  const faqs = [
    {
      q: "What is Sitara?",
      a: "Sitara is a curated library of high-quality, web-optimized 3D assets and Three.js code snippets designed for modern browser games and interactive experiences."
    },
    {
      q: "Do I need an account to download assets?",
      a: "No! All public assets can be viewed, copied, and used without creating an account. We believe in keeping the workflow as frictionless as possible."
    },
    {
      q: "How do I use the Three.js code snippets?",
      a: "Each asset comes with a 'Code' tab. You can copy this snippet directly into your project's Three.js initialization sequence. Most snippets are designed to be self-contained."
    },
    {
      q: "Are the assets really free for commercial use?",
      a: "The vast majority of our assets are under the 'Sitara Free License' which permits commercial use. However, always check the specific license listed on the asset's detail page."
    },
    {
      q: "My game lags when using an asset. What should I do?",
      a: "Check the 'Performance Notes' on the asset page. We recommend reviewing geometry complexity, material counts, and ensuring you are reusing geometries and materials where possible."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="p-6 md:p-8 bg-brand-50 dark:bg-surface-dark border border-brand-100 dark:border-border-dark rounded-3xl">
            <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
            <p className="text-brand-600 dark:text-brand-400 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
