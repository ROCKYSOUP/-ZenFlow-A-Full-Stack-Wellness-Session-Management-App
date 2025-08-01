

# 🌿 ZenFlow – A Full Stack Wellness Session Management App

ZenFlow is a full-stack web application that helps users manage, create, and publish wellness sessions. The app supports session tagging, auto-saving (with debounce), drafts, and a polished user experience with login/register flows.

---

## 🌐 Live Links

- 🔸 Frontend: [https://zenflow-frontend.onrender.com](https://zenflow-frontend.onrender.com)
- 🔹 Backend API: [https://zenflow-backend.onrender.com](https://zenflow-backend.onrender.com)

---

## 🧱 Tech Stack

- **Frontend**: React.js, Bootstrap, Axios, React Router DOM  
- **Backend**: Node.js, Express.js, MongoDB, Mongoose  
- **Auth**: JWT-based authentication  
- **Deployment**: Render.com

---

## 📦 Features

- 🔐 User Registration and Login
- ✅ JWT Authentication
- 📝 Create New Session with Title, URL & Tags
- 📤 Publish or Save as Draft
- ✍️ Auto-Save with Debounce (URL required)
- 🔖 Tag Management (Add/Delete Tags)
- 📚 View All Published Sessions
- 🌗 Responsive, Clean UI (Bootstrap-based)

---

## 📁 Folder Structure

```
- client/           # React Frontend
- server/           # Node.js + Express Backend
```

---

## 🚀 Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ROCKYSOUP/-ZenFlow-A-Full-Stack-Wellness-Session-Management-App.git
cd -ZenFlow-A-Full-Stack-Wellness-Session-Management-App
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

✅ Create a `.env` file inside the `server/` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

▶️ Run the server:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd ../client
npm install
```

✅ Create a `.env` file inside the `client/` folder:

```
REACT_APP_API_URL=http://localhost:5000
```

▶️ Run the frontend:

```bash
npm start
```

App will be available at: `http://localhost:3000`

---

## 📤 Deployment Notes

- Backend and frontend are deployed on **Render.com**
- Update `.env` values accordingly in Render dashboard
- Use Render’s Git auto-deploy or manual deploy from the dashboard

---

## 👨‍💻 Author

- [Dev Agarwal](https://github.com/ROCKYSOUP)
- 📧 Contact via GitHub if you need support or collaboration

---

## 📄 License

This project is licensed under the MIT License.
