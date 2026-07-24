import React, { useState, useEffect } from 'react';
import { fetchLeads, updateLeadStatus } from '../services/api';
import StatusBadge from '../components/StatusBadge';

export default function AdminPanel() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Load leads with optional search query
  const loadLeads = async (query = '') => {
    try {
      setLoading(true);
      const response = await fetchLeads(query);
      if (response.data.success) {
        setLeads(response.data.data);
      }
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads(search);
  }, [search]);

  // Handle status toggle change
  const handleStatusToggle = async (leadId, newStatus) => {
    try {
      const response = await updateLeadStatus(leadId, newStatus);
      if (response.data.success) {
        // Optimistically update local state or reload
        setLeads((prev) =>
          prev.map((item) =>
            item._id === leadId ? { ...item, status: newStatus } : item
          )
        );
      }
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0F172A] p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Controls */}
        <div className="bg-[#1E293B] text-white p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Lead Management</h1>
            <p className="text-xs text-slate-400 mt-1">
              Search, filter, and track lead status in real-time.
            </p>
          </div>

          <div className="flex items-center space-x-4 w-full md:w-auto">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" text-white px-4 py-2 text-sm rounded-lg border-0  focus:outline-none focus:ring-2 bg-blue-400 focus:ring-[#3B82F6] w-full md:w-64"
            />
            
            <button
              onClick={handleLogout}
              className="bg-red-500/80 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Lead Table Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              Loading leads database...
            </div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              No leads found matching your search.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 text-[#1E293B] text-xs uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Change Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-semibold text-[#0F172A]">{lead.name}</td>
                      <td className="p-4 text-slate-600">{lead.email}</td>
                      <td className="p-4 text-slate-600">{lead.budgetRange}</td>
                      <td className="p-4 text-slate-600 max-w-xs truncate" title={lead.message}>
                        {lead.message}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusToggle(lead._id, e.target.value)}
                          className="text-xs border border-slate-300 rounded-md p-1.5 bg-white text-[#0F172A] focus:ring-2 focus:ring-[#3B82F6] outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}