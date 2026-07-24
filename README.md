# LeadDesk Mini - Full-Stack Lead Capture & Admin Dashboard

A full-stack web application featuring a public lead capture portal and a secure, protected administrative management dashboard built for the Digital Heroes qualification task.

---

## 🌐 Live Deployment Links

* **Public Landing Page (Frontend):** [https://leaddesk-mini-ib6f-six.vercel.app/](https://leaddesk-mini-ib6f-six.vercel.app/)
* **Admin Login Portal:** [https://leaddesk-mini-ib6f-six.vercel.app/login](https://leaddesk-mini-ib6f-six.vercel.app/login)
* **Protected Admin Dashboard:** [https://leaddesk-mini-ib6f-six.vercel.app/admin](https://leaddesk-mini-ib6f-six.vercel.app/admin)
* **Backend API Base URL (AWS EC2):** [https://api.leaddesk.helpothers.space/api](https://api.leaddesk.helpothers.space/api)

---

## 🔑 Test Admin Credentials

Evaluators can use the following default credentials to access the protected administrative dashboard:

* **Admin Email:** `admin@leaddesk.com`
* **Admin Password:** `AdminPass123!`

---

## 🏗️ Tech Stack & Infrastructure

### Frontend
* **Framework:** React.js + Vite
* **Routing:** `react-router-dom` (v6) with custom `ProtectedRoute` route guards
* **State Management:** React Context API (`AuthContext`) for global authentication state
* **Styling:** Tailwind CSS (Responsive mobile-first design)
* **HTTP Client:** Axios (configured with request interceptors for dynamic JWT injection)
* **Deployment Platform:** Vercel

### Backend
* **Runtime:** Node.js (v18+) + Express.js
* **Database:** MongoDB Atlas (hosted cloud cluster managed via Mongoose ODM)
* **Authentication:** JWT (JSON Web Tokens) with 24-hour expiration
* **Security:** `bcryptjs` password hashing, CORS enablement, input sanitization middleware
* **Infrastructure / Hosting:** AWS EC2 instance reverse-proxied with SSL (`https://api.leaddesk.helpothers.space`)

---

## 📊 Data Schemas & Models

### 1. Lead Schema (`server/models/Lead.js`)
Stores lead submissions received from the public landing page form.

| Field | Type | Options / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Required, Trimmed | Full name of the applicant |
| `email` | String | Required, Lowercase, Trimmed | Applicant's email address |
| `budgetRange` | String | Enum: `['< $5k', '$5k - $10k', '> $10k']` | Estimated project budget |
| `message` | String | Required, Trimmed, Min length: 10 | Project description / inquiry details |
| `status` | String | Enum: `['New', 'Contacted', 'Closed']`, Default: `'New'` | Current workflow status |
| `createdAt` | Date | Timestamp (Auto) | Record creation date |
| `updatedAt` | Date | Timestamp (Auto) | Last modification date |

### 2. Admin Schema (`server/models/Admin.js`)
Stores authorized staff account credentials.

| Field | Type | Options / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `email` | String | Required, Unique, Lowercase, Trimmed | Staff login identifier |
| `password` | String | Required | Explicitly hashed password string (`bcryptjs`) |

---

## 🛡️ Authentication Architecture & Flow

1. **User Authentication:** 
   * Admin credentials are submitted to `POST /api/auth/login`.
   * On verification via `bcrypt.compare()`, the server generates and returns a signed JWT token.
2. **Client State Persistence:**
   * The token is stored in `localStorage` and managed globally by `AuthContext.jsx`.
3. **Route Protection (`<ProtectedRoute />`):**
   * Access to `/admin` is guarded. Unauthenticated users attempting direct URL access are automatically redirected to `/login`.
4. **Backend Route Protection (`authMiddleware.js`):**
   * Protected endpoints (`GET /api/leads`, `PATCH /api/leads/:id/status`) inspect the `Authorization: Bearer <token>` header. Invalid or missing tokens return `401 Unauthorized`.

---

## 🔍 Real-Time Lead Search Implementation

The search bar on the `/admin` panel enables real-time filtering across lead records:
* As the user types into the search input, a `useEffect` hook triggers `fetchLeads(searchQuery)`.
* The request calls `GET /api/leads?search=query`.
* On the backend, MongoDB evaluates a case-insensitive regular expression using `$or`:
  ```javascript
  query = {
    $or: [
      { name: { $regex: search,$options: 'i' } },
      { email: { $regex: search,$options: 'i' } },
    ],
  };

  ## 🤖 AI Usage Disclosure Statement
Generative AI tools (Gemini) were utilized during development to rapidly draft initial React component boilerplate, streamline repetitive Mongoose query structures, and review server validation logic. Following initial draft generation, all codebase architecture was manually reviewed, refactored, and tested to enforce explicit password hashing routines, construct responsive Tailwind layouts, configure AWS EC2 deployment, and ensure total compliance with task requirements.

## 💻 Local Installation & Setup
1. Clone Repository
Bash
git clone [https://github.com/your-username/leaddesk-mini.git](https://github.com/your-username/leaddesk-mini.git)
cd leaddesk-mini
2. Backend Setup
Bash
cd server
npm install
Create a .env file inside server/:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
Run the development server:

Bash
npm run dev
3. Frontend Setup
Bash
cd ../client
npm install
Create a .env file inside client/:

## Code snippet
VITE_API_URL=[https://api.leaddesk.helpothers.space/api](https://api.leaddesk.helpothers.space/api)
Run the React development server:

Bash
npm run dev
🌐 Required Credit
Built for Digital Heroes Training Task — digitalheroesco.com
