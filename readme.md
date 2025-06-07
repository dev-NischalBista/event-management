# 🔐 Backend Authentication API (TypeScript + Express + MongoDB)

This is a backend API project built using **Node.js**, **Express**, **MongoDB**, and **TypeScript**. It's structured following the **MVC architecture** and implements secure user **authentication** and **authorization** using **JWT** and **bcrypt**.

I'm using this project to learn and practice modern backend development with TypeScript.

---

## 🚀 Features

- ✅ MVC project structure
- ✅ TypeScript setup
- ✅ MongoDB with Mongoose models
- ✅ Secure password hashing with `bcryptjs`
- ✅ JWT-based user authentication
- ✅ Login and registration routes
- ✅ Middleware for protected routes

---

## 🧱 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **bcryptjs**
- **jsonwebtoken**
- **dotenv**
- **ts-node-dev**

---

## 📁 Folder Structure

src/
│
├── controllers/ # Route logic (e.g., register, login)
├── models/ # Mongoose schemas and interfaces
├── routes/ # Express routers
├── middleware/ # JWT auth middleware
├── config/ # Database and environment setup
├── utils/ # Utility functions
├── app.ts # Express app setup
└── server.ts # App entry point

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/backend-auth-api.git
cd backend-auth-api

npm install

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key

# For development
npm run dev

# For production build
npm run build
npm start

# Steps to initialize the Typescript

npx tsc --init

#tsconfig.json

```
