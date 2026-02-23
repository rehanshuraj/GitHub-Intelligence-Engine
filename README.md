# 🚀 GitHub Intelligence Engine

GitHub Intelligence Engine is a full-stack analytics platform that evaluates real engineering quality by analyzing GitHub repository activity.  

Instead of just counting contributions, the system analyzes commit history, refactor patterns, and function-level changes to generate an **Engineering Maturity Score (EMS)**.

---

## 📌 Features

- 🔐 Secure GitHub OAuth Authentication
- 📊 Engineering Maturity Score (EMS)
- 📈 Commit & Refactor Analysis
- 🧠 Function-Level Code Metrics
- 📦 Repository Insights Dashboard
- ⚡ JWT-based authentication
- 🌐 Full-stack MERN architecture

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Context API
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- GitHub OAuth
- Axios

---

## 📂 Project Structure
GitHub-Intelligence-Engine/
│
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ ├── pages/
│ ├── components/
│ ├── context/
│ ├── main.jsx
│ └── package.json
│
└── README.md


---

# ⚙️ Setup & Run Locally

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/GitHub-Intelligence-Engine.git
cd GitHub-Intelligence-Engine

2️⃣ Install Backend Dependencies
cd backend
npm install

3️⃣ Create .env file inside backend/
backend/.env

PORT=4000
JWT_SECRET=your_super_secret_key

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

FRONTEND_URL=http://localhost:5173

🔑 How to Get GitHub OAuth Credentials

Go to: https://github.com/settings/developers

Click New OAuth App

Fill in:

Application Name: GitHub Intelligence Engine

Homepage URL: http://localhost:5173

Authorization callback URL:

http://localhost:4000/auth/github/callback

Copy:

Client ID

Client Secret

Paste them into your .env.

▶️ Start Backend Server
npm start

Server will run on:

http://localhost:5000
🎨 Frontend Setup
4️⃣ Install Frontend Dependencies

Open new terminal:

cd frontend
npm install
5️⃣ Create .env inside frontend/
frontend/.env

Add:

VITE_API_URL=http://localhost:5000
▶️ Start Frontend
npm run dev

Frontend will run on:

http://localhost:5173
🔄 Full Local Flow

Start backend → npm start

Start frontend → npm run dev

Open → http://localhost:5173

Click Login with GitHub

Authorize

Dashboard loads with analytics

🔐 Authentication Flow

User clicks GitHub login

Redirect to GitHub OAuth

GitHub returns authorization code

Backend exchanges code for access token

Backend generates JWT

JWT sent to frontend

Protected dashboard loads

🚀 Deployment (Optional)
Backend:

Render

Frontend:

Vercel

Database:

MongoDB Atlas

📊 Engineering Maturity Score (EMS)

EMS is calculated based on:

Total commits

Refactor frequency

Function-level analysis

Repository activity

Code change patterns

🛡 Security Features

JWT with expiration

Secure OAuth flow

GitHub access token hidden from frontend

Protected routes using middleware

🧪 Future Improvements

Refresh token system

HttpOnly cookie authentication

Advanced code quality metrics

AI-based commit classification

Multi-user analytics comparison

👨‍💻 Author

Rehanshu Gupta
GitHub: https://github.com/rehanshuraj


