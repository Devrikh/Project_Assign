# Backend Frontend Assignment

## 📌 Overview
This project demonstrates a **secure, scalable backend** with **role-based authentication**, CRUD operations for tasks, and a **React/Vite frontend** to interact with the APIs.

**Tech Stack:**
- Backend: Node.js, Express, MongoDB, JWT
- Frontend: React.js (Vite), Axios, React Router
- Validation: Zod
- API Documentation: Swagger

---

## 🔹 Features

### Backend
- User registration & login with hashed passwords
- JWT authentication
- Role-based access control (user vs admin)
- CRUD APIs for Tasks
- Input validation using Zod
- Swagger API documentation for all endpoints
- Modular project structure

### Frontend
- Register & Login users
- Protected dashboard (JWT required)
- Create, Read, Update, Delete tasks
- Role-based delete button (admin/owner)
- Toggle task status (pending/completed)
- Logout button
- Toast notifications for success/error messages

---

## 🔹 Installation

### Backend
```bash
cd backend
npm install
node src/server.js   # or use nodemon: npx nodemon src/server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

- Backend default port: `http://localhost:5000`
- Frontend default port: `http://localhost:5173`

---

## 🔹 Usage

1. Open the frontend in your browser: `http://localhost:5173`
2. Register a new user or login with existing credentials
3. Access the dashboard to create, update, and delete tasks
4. Admin users can delete any task; regular users can delete their own tasks
5. Toggle task status by clicking on the status label

**API Documentation (Swagger):**
- URL: `http://localhost:5000/api-docs`
- Use the **Authorize** button to enter JWT for protected routes

---

## 🔹 Folder Structure

```
backend/
 ├─ src/
 │   ├─ config/
 │   ├─ middlewares/
 │   ├─ modules/
 │   ├─ schemas/
 │   ├─ app.js
 │   └─ server.js
frontend/
 ├─ src/
 │   ├─ api/           # Axios instance
 │   ├─ components/    # React components
 │   ├─ App.jsx
 │   └─ main.jsx
```

---

## 🔹 Scalability Notes

- Backend is modular → easy to scale via **microservices**
- JWT-based stateless authentication → supports horizontal scaling
- Redis caching can be added for frequently accessed data
- MongoDB can be **replicated/sharded** for performance
- Docker-ready deployment for containerization

<!-- --- -->

<!-- ## 🔹 Screenshots
*(Replace placeholders with actual screenshots)*
- Register/Login Page: ![Register](screenshots/register.png)
- Dashboard Page: ![Dashboard](screenshots/dashboard.png)
- Swagger API Docs: ![Swagger](screenshots/swagger.png) -->

---

## 🔹 Testing

- Use the frontend or Swagger UI to test endpoints
- Example workflow:
  1. Register → Login → Save JWT
  2. Access `/tasks` → Create, Update, Delete tasks
  3. Ensure role-based delete works (admin vs normal user)
  4. Check task status toggle functionality

