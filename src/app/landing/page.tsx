'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';

// Add type declaration for plausible
declare global {
  interface Window {
    plausible?: (eventName: string, options?: any) => void;
  }
}

// ConvertKit form component
const ConvertKitForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://f.convertkit.com/ckjs/ck.5.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('Submitting...');
    
    try {
      console.log('Form submission started with email:', email);
      
      const formData = new FormData();
      formData.append('email_address', email);
      formData.append('fields[source]', 'website');
      
      const response = await fetch('https://app.convertkit.com/forms/7919715/subscriptions', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      const data = await response.json().catch(() => null);
      console.log('Response data:', data);
      
      if (response.ok) {
        setSubmitStatus('Success! Thank you for subscribing.');
        setEmail('');
      } else {
        setSubmitStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('Error submitting form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form 
        id="waitlist-form"
        onSubmit={handleSubmit}
        className="seva-form formkit-form" 
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            name="email_address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            required 
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40"
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Submitting...' : 'Join the waitlist'}
          </button>
        </div>
      </form>
      {submitStatus && (
        <div className="mt-2 text-sm">
          {submitStatus.includes('Success') ? (
            <p className="text-green-400">{submitStatus}</p>
          ) : (
            <p className="text-red-400">{submitStatus}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Feature section component with sticky scroll
const FeatureSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('feature-section');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const headerHeight = 64; // Height of the header
      const viewportHeight = window.innerHeight - headerHeight;
      const scrollPosition = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Calculate which feature should be active based on scroll position
      const progress = (scrollPosition - sectionTop + headerHeight) / (sectionHeight - viewportHeight);
      const featureIndex = Math.min(Math.max(Math.floor(progress * 4), 0), 3);
      
      setActiveFeature(featureIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="feature-section" className="relative h-[300vh]">
      {/* Sticky container for the entire feature section */}
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden">
        <div className="relative h-full max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
            {/* Left side - Sticky images */}
            <div className="relative w-full h-[500px] hidden md:block">
              <div className="relative h-full">
                <div className={`absolute inset-0 transition-opacity duration-500 ${activeFeature === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <Image
                    src="/images/Proposal Builder 2.png"
                    alt="Proposals"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className={`absolute inset-0 transition-opacity duration-500 ${activeFeature === 1 ? 'opacity-100' : 'opacity-0'}`}>
                  <Image
                    src="/images/Project TImeline.png"
                    alt="Planning"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className={`absolute inset-0 transition-opacity duration-500 ${activeFeature === 2 ? 'opacity-100' : 'opacity-0'}`}>
                  <Image
                    src="/images/One Tap Update.png"
                    alt="Updates"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className={`absolute inset-0 transition-opacity duration-500 ${activeFeature === 3 ? 'opacity-100' : 'opacity-0'}`}>
                  <Image
                    src="/images/Cost Control 2.png"
                    alt="Cost Control"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Right side - Animated text */}
            <div className="max-w-[500px] relative">
              <div className={`transition-opacity duration-500 absolute inset-0 ${activeFeature === 0 ? 'opacity-100 relative' : 'opacity-0 pointer-events-none'}`}>
                <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-white leading-tight text-left">Fast, accurate proposals</h3>
                <p className="text-sm md:text-base text-gray-400 text-left">
                  Create professional quotes in minutes—not hours. Set clear pricing, scope, and terms so clients know exactly what they're getting.
                </p>
              </div>
              <div className={`transition-opacity duration-500 absolute inset-0 ${activeFeature === 1 ? 'opacity-100 relative' : 'opacity-0 pointer-events-none'}`}>
                <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-white leading-tight text-left">Simple project planning</h3>
                <p className="text-sm md:text-base text-gray-400 text-left">
                  Build job programmes without the complexity. Set dates, phases, and dependencies so your team stays aligned from day one.
                </p>
              </div>
              <div className={`transition-opacity duration-500 absolute inset-0 ${activeFeature === 2 ? 'opacity-100 relative' : 'opacity-0 pointer-events-none'}`}>
                <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-white leading-tight text-left">One-tap updates</h3>
                <p className="text-sm md:text-base text-gray-400 text-left">
                  Keep everyone in the loop with instant updates. Share progress, changes, and important information with your team and clients.
                </p>
              </div>
              <div className={`transition-opacity duration-500 absolute inset-0 ${activeFeature === 3 ? 'opacity-100 relative' : 'opacity-0 pointer-events-none'}`}>
                <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-white leading-tight text-left">Built-in cost control</h3>
                <p className="text-sm md:text-base text-gray-400 text-left">
                  Track budgets and changes as you go. Stay on top of cash flow and keep every job profitable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Script
        src="https://plausible.io/js/script.js"
        data-domain="constructa.co"
        strategy="afterInteractive"
      />
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
      >
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "l9j3ey1olw");
        `}
      </Script>
      <Script src="/feature-scroll.js" strategy="afterInteractive" />
      <Script id="plausible-contact" strategy="afterInteractive">
        {`
          document.addEventListener("DOMContentLoaded", function () {
            const form = document.querySelector('form[action*="convertkit.com"]');
            if (form) {
              form.addEventListener("submit", function () {
                if (window.plausible) plausible("WaitlistSignup");
              });
            }
          });
        `}
      </Script>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-32 md:py-32 px-4 md:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1 md:col-span-2 pl-0 md:pl-10">
              <div className="flex flex-col items-start">
                <h1 className="text-left leading-[1.2] w-full md:w-[1000px]">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">Constructa: proposal, planning and project<br className="hidden md:block" />tools for construction professionals.</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-4 md:mt-6 text-left">
                  Quote faster, plan smarter, and keep control of every job.
                </p>
                <div className="mt-8">
                  <ConvertKitForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution Section */}
      <section className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
        <div className="relative max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden backdrop-blur-sm bg-black/20">
              <Image
                src="/images/hero-image.png"
                alt="Construction Planning Software"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="max-w-[500px]">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white leading-tight text-left">No more spreadsheets. Just smart tools for your construction company.</h2>
              <div className="space-y-4 text-left">
                <p className="text-sm md:text-base text-gray-400">
                  Running a small construction company means quoting fast, planning tight, and delivering on site&mdash;all while juggling paperwork, messages, and spreadsheets.
                </p>
                <p className="text-sm md:text-base text-gray-400">
                  Without the right tools, it&apos;s easy for details to slip through the cracks&mdash;quotes get rushed, programmes are missed, and jobs lose momentum.
                </p>
                <p className="text-sm md:text-base text-gray-400">
                  Constructa brings everything into one place. From proposals to planning and project delivery, it gives you the clarity, structure, and control you need&mdash;without the admin overload.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <FeatureSection />

      {/* What Sets Us Apart Section */}
      <section className="relative py-32 md:py-40 px-4 md:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
        <div className="relative max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden backdrop-blur-sm bg-black/20">
              <Image
                src="/images/simple Project Overview Black Cropped.png"
                alt="What sets Constructa apart"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="max-w-[500px]">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white leading-tight text-left">What Sets Us Apart</h2>
              <div className="space-y-4 text-left">
                <p className="text-sm md:text-base text-gray-400">
                  Not just another piece of software&mdash;Constructa is built for how construction really works.
                </p>
                <p className="text-sm md:text-base text-gray-400">
                  Whether you&apos;re pricing up a job, planning your programme, or getting stuck in on site&mdash;Constructa works the way you do.
                </p>
                <p className="text-sm md:text-base text-gray-400">
                  No steep learning curve&mdash;just practical tools that work out of the box. Quote, plan, and manage your jobs with confidence&mdash;no missed steps, no mess.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              Constructa © 2025
            </div>
            <div className="text-sm text-gray-400">
              Made for construction professionals.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 