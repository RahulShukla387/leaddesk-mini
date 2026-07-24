import React, { useState } from 'react';
import { submitLead } from '../services/api';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budgetRange: '< $5k',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  // Client-Side Validation Rules
  const validate = () => {
    let errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide details about your request.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError('');

    try {
      const response = await submitLead(formData);
      if (response.data.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', budgetRange: '< $5k', message: '' });
      }
    } catch (err) {
      console.error(err);
      setServerError(
        err.response?.data?.error || 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8" id="contact">
      <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Request a Quote</h2>
      <p className="text-sm text-slate-500 mb-6">Fill out your details below to start your project.</p>

      {/* Success Notification */}
      {isSuccess ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-6 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
            ✓
          </div>
          <h3 className="text-lg font-bold">Submission Received!</h3>
          <p className="text-sm text-emerald-700">Thank you for reaching out. We will review your message and reply shortly.</p>
          <button
            onClick={() => setIsSuccess(false)}
            className="mt-2 text-xs font-semibold text-emerald-700 underline hover:text-emerald-900"
          >
            Submit another enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          
          {serverError && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {serverError}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Morgan"
              className={`w-full px-4 py-3 text-sm rounded-lg border bg-slate-50 text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 transition ${
                errors.name ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-200 focus:border-[#3B82F6]'
              }`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@example.com"
              className={`w-full px-4 py-3 text-sm rounded-lg border bg-slate-50 text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 transition ${
                errors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-200 focus:border-[#3B82F6]'
              }`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Budget Dropdown */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Budget Range
            </label>
            <select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm rounded-lg border border-slate-300 bg-slate-50 text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#3B82F6] transition"
            >
              <option value="< $5k">&lt; $5k</option>
              <option value="$5k - $10k">$5k - $10k</option>
              <option value="> $10k">&gt; $10k</option>
            </select>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              placeholder="Briefly describe your project requirements..."
              className={`w-full px-4 py-3 text-sm rounded-lg border bg-slate-50 text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 transition ${
                errors.message ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-200 focus:border-[#3B82F6]'
              }`}
            ></textarea>
            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 text-white bg-[#3B82F6] hover:bg-blue-600 font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      )}
    </div>
  );
}