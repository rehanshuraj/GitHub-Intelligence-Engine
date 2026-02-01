# IIIT KOTA HUB 
### *The Ultimate Student Resource & Academic Toolset*

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Build-Vite%20%2B%20React-blueviolet?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Hosted%20On-Vercel-black?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Open%20Source-MIT-green?style=for-the-badge"/>
  <a href="https://iiitkota.vercel.app"><img src="https://img.shields.io/badge/Live%20Demo-iiitkota.vercel.app-blue?style=for-the-badge&logo=vercel" alt="Live Demo"/></a>
</p>

<p align="center">
  <b>IIIT KOTA HUB</b> is a centralized, open-source academic platform crafted exclusively for  
  <b>Indian Institute of Information Technology, Kota</b> students.  
  It combines precision academic tools with a clean, modern interface to simplify student life.
</p>

---

## 🌟 Why IIIT KOTA HUB?

> A single destination for **calculations, resources, and academic archives** —  
> built with performance, design, and scalability in mind.

- 📘 Eliminate manual SGPA/CGPA calculations  
- 📂 Access Previous Year Papers in seconds  
- 📱 Enjoy a smooth, mobile-first experience  
- ⚡ Lightning-fast performance with modern tooling  

---

## ✨ Key Features

### 🎓 Academic Tools
- **SGPA & CGPA Calculator**  
  Fully aligned with the **official IIIT Kota 10-point relative grading ordinance**.

### 🗄️ Academic Archive (Vault)
- Mid-Sem & End-Sem **Previous Year Question Papers**
- Supported branches: **CSE, IT, ECE**
- Structured filters by **Year → Semester → Branch → Exam Type**

### 📊 Live Analytics
- Tracks real-time engagement using **Firebase Realtime Database**
- Measures platform reach and student adoption

### 🎨 Premium UI/UX
- Glassmorphism-inspired **space-tech design**
- Smooth transitions powered by **Framer Motion**
- Fully responsive & mobile-first layout

### 🔍 SEO Optimized
- Custom metadata for **IIIT Kota-specific search dominance**
- Faster indexing & better discoverability on Google

---

## 🖼️ UI & UX Highlights

- ✨ Soft blur cards with depth & glow
- 🧭 Intuitive navigation hierarchy
- 🎯 Minimal clicks to reach important resources
- 🌙 Dark-friendly color palette
- ⚙️ Performance-optimized animations (no UI lag)

---

## 🛠️ Tech Stack

| Layer        | Technology |
|-------------|------------|
| **Frontend** | React.js 19, Vite, Tailwind CSS |
| **Animations** | Framer Motion |
| **Backend / DB** | Firebase Realtime Database, Telegram |
| **Icons** | Lucide React |
| **Hosting** | Vercel |

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js **v18+**
- npm or yarn

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/harshgupta9129/iiitkotahub.git
cd iiitkotahub
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Firebase Config
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=iiitkota-a82bd.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=iiitkota-a82bd
VITE_FIREBASE_STORAGE_BUCKET=iiitkota-a82bd.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_DATABASE_URL=https://iiitkota-a82bd-default-rtdb.asia-southeast1.firebasedatabase.app

# Telegram Config
VITE_TELEGRAM_BOT_TOKEN=bot_token
VITE_TELEGRAM_CHAT_ID=chat_id
```

### 4️⃣ Run Development Server
```bash
npm run dev
```
## 📊 Database Structure (Firebase)
```json
{
  "totalHubViews": 0,
  "papers": {
    "Year": {
      "Semester": {
        "Branch": {
          "ExamType": {
            "Subject_Name": "Direct_Download_URL"
          }
        }
      }
    }
  }
}
```
## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m "Add AmazingFeature"`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 🚀
