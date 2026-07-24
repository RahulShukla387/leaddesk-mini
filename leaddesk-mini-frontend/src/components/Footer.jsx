import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] border-t border-slate-700 text-slate-400 py-6 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Required Live Build Credit Requirement */}
        <div>
          Built for{' '}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline font-medium"
          >
            Digital Heroes Training Task
          </a>
        </div>

        <div className="flex items-center space-x-6">
          <span>&copy; {new Date().getFullYear()} LeadDesk Mini</span>
          <a href="/login" className="text-slate-400 hover:text-white underline">
            Staff Login
          </a>
        </div>
      </div>
    </footer>
  );
}