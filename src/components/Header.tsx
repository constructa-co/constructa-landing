'use client';

import { useState } from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 grid grid-cols-3 items-center">
          {/* Left column - Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-semibold text-white hover:opacity-90 transition-opacity">
              CONSTRUCTA
            </a>
          </div>

          {/* Center column - Empty for landing page */}
          <div className="hidden md:block"></div>

          {/* Right column - Waitlist CTA */}
          <div className="flex items-center justify-end">
            <a 
              href="#waitlist-form"
              onClick={(e) => {
                e.preventDefault();
                const form = document.getElementById('waitlist-form');
                const headerOffset = 300;
                if (form) {
                  const elementPosition = form.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className="px-4 py-1.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
            >
              Join the waitlist
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 