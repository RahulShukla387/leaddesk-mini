import React from 'react';
import Navbar from '../components/Navbar';
import LeadForm from '../components/LeadForm';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between font-sans antialiased">
      {/* //todo importing navbar  */}
      <Navbar />

      {/*  Hero Section and Form for accepting detail */}
      {/* <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow"> */}
      <main className="w-full max-w-none px-8 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        
        {/* Left Side: Value Proposition */}
        <div className="lg:col-span-7 space-y-6">
          <span className="inline-block px-3.5 py-1 bg-blue-100 text-[#3B82F6] text-xs font-semibold rounded-full uppercase tracking-wider">
            Seamless Client Intake
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] leading-tight tracking-tight">
            Elevate your agency operations with LeadDesk.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
            Effortlessly submit project details and track your inquiries. Our team responds swiftly to help turn your ideas into reality.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-4 text-slate-700 text-sm font-medium">
            <div className="flex items-center space-x-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Fast Response Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Tailored Quotes</span>
            </div>
          </div>
        </div>

        {/* Right Side: Lead Capture Component */}
        <div className="lg:col-span-5">
          <LeadForm />
        </div>
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
}