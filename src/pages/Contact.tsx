import React, { useState } from 'react';
import { Send, Mail, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">Get in touch</h1>
        <p className="text-lg text-brand-500">Have questions about an asset or want to submit your own?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-surface-dark flex items-center justify-center shrink-0">
              <Mail className="text-brand-900 dark:text-brand-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Email Us</h3>
              <p className="text-brand-500 mb-2">For general inquiries and asset submissions.</p>
              <a href="mailto:hello@sitara3d.com" className="text-brand-900 dark:text-white font-medium hover:underline">hello@sitara3d.com</a>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-surface-dark flex items-center justify-center shrink-0">
              <MapPin className="text-brand-900 dark:text-brand-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Location</h3>
              <p className="text-brand-500 mb-2">Remote-first, based in cyberspace.</p>
            </div>
          </div>
        </div>

        <div className="bg-brand-50 dark:bg-surface-dark p-8 rounded-3xl border border-brand-100 dark:border-border-dark">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-bg-dark border border-brand-200 dark:border-border-dark outline-none focus:border-brand-500 transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input required type="email" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-bg-dark border border-brand-200 dark:border-border-dark outline-none focus:border-brand-500 transition-colors" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea required rows={4} className="w-full px-4 py-3 rounded-xl bg-white dark:bg-bg-dark border border-brand-200 dark:border-border-dark outline-none focus:border-brand-500 transition-colors resize-none" placeholder="How can we help?"></textarea>
            </div>
            <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-brand-950 dark:bg-brand-50 text-white dark:text-brand-950 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-800 dark:hover:bg-white transition-colors disabled:opacity-50">
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
