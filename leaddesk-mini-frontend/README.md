// Architectue  

leaddesk-mini/
├── leaddesk-mini-frontend/                      # Frontend (React + Tailwind)
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── LeadForm.jsx     # Public Lead Form
│       │   ├── StatusBadge.jsx  # Colored status pill (New/Contacted/Closed)
│       │   └── Footer.jsx       # Required mandatory credit line
│       ├── pages/
│       │   ├── LandingPage.jsx  # /
│       │   └── AdminPanel.jsx   # /admin
│       ├── context/
│       │   └── AuthContext.jsx  # JWT state management
│       ├── services/
│       │   └── api.js          # Axios / Fetch API client
│       └── App.jsx
│
├── leaddesk-mini-backend/                      # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js               # Mongoose connection logic
│   ├── controllers/
│   │   ├── authController.js   # Admin login
│   │   └── leadController.js   # CRUD + Search logic
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification middleware
│   │   └── validateLead.js     # Server-side validation
│   ├── models/
│   │   ├── Admin.js            # Admin user schema
│   │   └── Lead.js             # Lead data schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── leadRoutes.js
│   |── server.js              # App entry point
│   |── .gitignore
├
└── README.md                    # Core documentation + AI note + Credentials


// Architecture For taking inputing from User 
  
  User clicks Submit
        │
        ▼
<form onSubmit={handleSubmit}>
        │
        ▼
handleSubmit()
        │
        ▼
validate()
        │
        ├── Invalid → stop
        │
        ▼
submitLead(formData)
        │
        ▼
Success?
        │
        ├── No → show server error
        │
        ▼
setIsSuccess(true)
        │
        ▼
React re-renders
        │
        ▼
Success message shown instead of form


                                  //Admin Login Flow



1. 🔐 Admin Login Flow (/login)
Plaintext
Admin fills credentials & clicks Sign In
        │
        ▼
<form onSubmit={handleSubmit}>
        │
        ▼
handleSubmit()
        │
        ▼
adminLogin({ email, password })
        │
        ▼
POST /api/auth/login
        │
        ▼
authController.loginAdmin()
        │
        ├── Find Admin in MongoDB
        │       │
        │       └── Not Found → Return 401
        │
        ▼
admin.matchPassword(password) via bcrypt
        │
        ├── Invalid Password → Return 401
        │
        ▼
jwt.sign({ id, email })
        │
        ▼
Return 200 { success: true, token }
        │
        ▼
Response Received in Frontend?
        │
        ├── Error (401/500) → setError('Invalid credentials')
        │
        ▼
login(token) [AuthContext]
        │
        ▼
localStorage.setItem('token', token)
        │
        ▼
navigate('/admin')

2. 🛡️ Protected Route Guarding Flow (/admin)
Plaintext
User attempts to visit URL /admin
        │
        ▼
<App /> Router matches /admin
        │
        ▼
<ProtectedRoute> Component Evaluated
        │
        ▼
Check token state from AuthContext / localStorage
        │
        ├── No Token Found (Unauthenticated)
        │       │
        │       ▼
        │   <Navigate to="/login" replace />
        │       │
        │       ▼
        │   User redirected to Staff Login Screen
        │
        ▼
Token Exists! (Authenticated)
        │
        ▼
Render <AdminPanel />

3. 🔄 Admin Lead Status Toggle Flow (/admin)
Plaintext
Admin changes status dropdown for a lead
        │
        ▼
onChange={() => handleStatusToggle(leadId, newStatus)}
        │
        ▼
updateLeadStatus(leadId, newStatus)
        │
        ▼
Axios Interceptor attaches Header:
`Authorization: Bearer <JWT_TOKEN>`
        │
        ▼
PATCH /api/leads/:id/status
        │
        ▼
authMiddleware.protect()
        │
        ├── Token missing/invalid → Return 401
        │
        ▼
leadController.updateLeadStatus()
        │
        ▼
MongoDB findByIdAndUpdate()
        │
        ▼
Return 200 { success: true, data: updatedLead }
        │
        ▼
Response Success?
        │
        ├── No → Alert('Failed to update status')
        │
        ▼
setLeads() state updated
        │
        ▼
React re-renders table row
        │
        ▼
<StatusBadge /> updates color pill (e.g., Amber → Blue → Green)
   