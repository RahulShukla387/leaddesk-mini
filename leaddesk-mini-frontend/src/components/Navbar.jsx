import React from 'react';

export default function Navbar() {
  return (
    <header className="bg-[#1E293B] text-white border-b border-slate-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-9 h-9 bg-[#3B82F6] rounded-lg flex items-center justify-center font-extrabold text-xl shadow-md text-white">
            L
          </div>
          <span className="text-xl font-bold tracking-tight">LeadDesk</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="services" className="hover:text-white transition">Services</a>
          <a href="about" className="hover:text-white transition">About Us</a>
          <a href="contact" className="hover:text-white transition">Contact</a>
        </nav>

        {/* Call to Action Button */}
        <div>
          <a
          style={{ color: "white" }}
            href="contact"
            className=" bg-[#3B82F6] hover:bg-blue-600 text-xs font-semibold px-4 py-2.5 rounded-lg shadow transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}