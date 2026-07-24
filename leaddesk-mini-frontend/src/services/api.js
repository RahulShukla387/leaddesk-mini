import axios from 'axios';
// import dotenv from "dotenv";

// dotenv.config();
 
const API = axios.create({
  baseURL:  import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Attach JWT token for protected admin endpoints
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Public API
export const submitLead = (leadData) => API.post('/leads', leadData);

// Admin APIs
export const fetchLeads = (searchQuery) => API.get(`/leads?search=${searchQuery}`);
export const updateLeadStatus = (id, status) => API.patch(`/leads/${id}/status`, { status });
export const adminLogin = (credentials) => API.post('/auth/login', credentials);

export default API;