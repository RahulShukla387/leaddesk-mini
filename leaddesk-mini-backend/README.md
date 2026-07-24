 
 
 default admin username/password
admin@leaddesk.com / AdminPass123!


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

