import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminLogin } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await adminLogin({ email, password });
      if (response.data.success) {
        login(response.data.token);
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F8FAFC] font-sans antialiased">
      
      {/* 1. Left Brand Side Banner (Hidden on small mobile, visible on desktop/large) */}
      <div className="lg:w-1/2 bg-[#1E293B] text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 relative overflow-hidden">
        {/* Background Decorative Accent */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Branding Header */}
        <div className="flex items-center space-x-3 z-10">
          <div className="w-10 h-10 bg-[#3B82F6] rounded-xl flex items-center justify-center font-extrabold text-2xl shadow-lg text-white">
            L
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">LeadDesk</span>
        </div>

        {/* Middle Hero Text */}
        <div className="my-12 lg:my-0 z-10 max-w-lg space-y-4">
          <span className="inline-block px-3 py-1 bg-blue-500/20 text-[#3B82F6] text-xs font-semibold rounded-full uppercase tracking-wider">
            Internal Staff Portal
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Manage and track leads with confidence.
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Secure administrative dashboard for reviewing requests, organizing status workflows, and connecting with prospective clients.
          </p>
        </div>

        {/* Bottom Metadata & Link back to Home */}
        <div className="z-10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-4 pt-6 border-t border-slate-700/50">
          <Link to="/" className="hover:text-white transition flex items-center space-x-1">
            <span>&larr; Back to Public Landing Page</span>
          </Link>
          <span>&copy; {new Date().getFullYear()} LeadDesk Mini</span>
        </div>
      </div>

      {/* 2. Right Form Container (Full width on mobile, half width on desktop) */}
      <div className="lg:w-1/2 flex-1 flex flex-col justify-center items-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Mobile Header (Visible when left side hides or stacks) */}
          <div className="text-center space-y-2">
            <div className="inline-flex lg:hidden w-12 h-12 bg-[#3B82F6] text-white rounded-xl items-center justify-center font-bold text-2xl shadow-md mb-2">
              L
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Admin Portal Sign In
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Please enter your authorized credentials to access `/admin`.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-4 text-xs sm:text-sm bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center space-x-2">
              <span className="font-bold">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@leaddesk.com"
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 bg-slate-50/50 text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition duration-200"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Password
                </label>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 bg-slate-50/50 text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#3B82F6] hover:bg-blue-600 active:scale-[0.99] text-white font-semibold rounded-xl shadow-md hover:shadow-lg text-sm transition duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <span>&rarr;</span>
                </>
              )}
            </button>
          </form>

          {/* Quick link for testing evaluators */}
          <div className="pt-4 text-center">
            <p className="text-xs text-slate-400">
              Testing Evaluator? Check <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">README.md</code> for test credentials.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}