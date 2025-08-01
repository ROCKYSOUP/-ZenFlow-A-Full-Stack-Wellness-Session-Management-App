# 🧘 ZenFlow Backend

A full-stack backend service for managing wellness sessions like yoga and meditation. Built as part of the Arvyax internship assignment, this API supports user authentication, session creation, auto-saving, and publishing.

---

## 🌐 Features

- ✅ User Registration & Login with JWT Authentication
- ✅ Create, Draft, Auto-Save & Publish Wellness Sessions
- ✅ Update and Delete Sessions
- ✅ View Published & User-Specific Sessions
- ✅ Delete Account and Associated Data
- ✅ Express.js REST API with MongoDB

---

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Password Security**: bcrypt
- **Environment Config**: dotenv

---

## 📁 Folder Structure

```
server/
│
├── models/               # Mongoose models (User, Session)
├── routes/               # All API routes
│   ├── Login.js
│   ├── Register.js
│   ├── PublishedSession.js
│   ├── DraftSession.js
│   └── AddNewOrUpdateSessionOrDeleteSession.js
│
├── middleware/
│   └── auth.js           # JWT auth middleware
│
├── Data/
│   └── db.js             # MongoDB connection
│
├── .env                  # Environment variables
├── .gitignore
├── index.js              # Main entry point
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/zenflow-backend.git
cd zenflow-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root of `/server` and add:

```
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret_key
PORT=5000
```

### 4. Start the server

```bash
node index.js
```

> Server will run at: `http://localhost:5000`

---

## 📮 API Endpoints

### 🔐 Auth

| Method | Endpoint                   | Description         |
|--------|----------------------------|---------------------|
| POST   | `/api/auth/register`       | Register new user   |
| POST   | `/api/auth/login`          | Login with JWT      |
| DELETE | `/api/auth/delete-account` | Delete user         |

### 🧘 Sessions

| Method | Endpoint                             | Description         |
|--------|--------------------------------------|---------------------|
| POST   | `/api/session/add-new-session`       | Add new session     |
| PUT    | `/api/session/add-new-session/:id`   | Update session      |
| DELETE | `/api/session/delete-session/:id`    | Delete session      |
| GET    | `/api/session/my-session`            | View your sessions  |
| PUT    | `/api/session/change-status/:id`     | Publish a draft     |

### 📤 Published / Draft

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| GET    | `/api/publish` | Get all published flows  |
| GET    | `/api/draft`   | Get your draft sessions  |

---

## ✅ Future Improvements

- Frontend integration
- Better request validation
- Rate limiting and API security
- Unit and integration testing

---

## 📌 Notes

- Make sure you don’t commit your `.env` file.
- This project is part of an internship assignment and designed to demonstrate full-stack backend skills.

---

## 📄 License

MIT