# Frontend & Backend Developer Intern Assignment

## Overview
This project is a **single full-stack application** developed to fulfill **both Frontend Developer Intern and Backend Developer Intern assignments**.

It demonstrates a **secure, scalable backend** with role-based authentication and well-documented APIs, along with a **modern React (Vite) frontend** that consumes these APIs to provide a complete task management experience.

>  **Note:**  
> The **same project/codebase** is intentionally used for **both frontend and backend assignments** to showcase end-to-end system design, integration, and real-world development practices.

---

## Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Zod (validation)
- Swagger (OpenAPI 3.0)

**Frontend**
- React.js (Vite)
- Axios
- React Router
- Tailwind CSS

---

## Features

### 🔹 Backend Features
- User registration & login with hashed passwords
- JWT-based authentication
- Role-based access control (`user` / `admin`)
- CRUD APIs for task management
- Ownership checks (users can modify/delete their own tasks)
- Centralized error handling
- Input validation using Zod schemas
- Swagger API documentation for all routes
- Clean, modular, scalable project structure

---

### 🔹 Frontend Features
- User registration & login flows
- JWT-based protected routes
- Task dashboard with authenticated access
- Create, read, update, and delete tasks
- Role-based delete button (admin or task owner only)
- Toggle task status (pending / completed)
- Search/filter tasks by title
- User profile display (name, role, avatar)
- Logout functionality
- Toast notifications for success and error states
- Responsive UI with Tailwind CSS

---

## Installation & Setup

### Backend
```bash
cd backend
npm install
node src/server.js
# or
npx nodemon src/server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

**Default URLs**
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

---

## Usage

1. Open the frontend: `http://localhost:5173`
2. Register a new user or log in
3. Access the protected dashboard
4. Create, update, and delete tasks
5. Admin users can delete **any task**
6. Normal users can delete **only their own tasks**
7. Toggle task status by clicking the status badge
8. Use the search bar to filter tasks by title

---

## API Documentation (Swagger)

- URL: `http://localhost:5000/api-docs`
- Authentication:
  - Login to get JWT
  - Click **Authorize**
  - Enter token as:  
    ```
    Bearer <your_jwt_token>
    ```

---

## Folder Structure

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
 │   ├─ api/            # Axios instance
 │   ├─ components/     # UI components
 │   ├─ pages/
 │   ├─ App.jsx
 │   └─ main.jsx
```

---

## Scalability Notes

- Modular backend architecture → easy to scale or split into microservices
- Stateless JWT authentication → supports horizontal scaling
- Redis can be added for caching
- MongoDB supports replication and sharding
- Docker-ready structure for containerized deployment
- Frontend easily extendable with pagination, filters, and charts

---

## Testing

- APIs tested via:
  - Frontend UI
  - Swagger UI

**Suggested Test Flow**
1. Register → Login → Copy JWT
2. Test protected routes in Swagger
3. Create tasks → update → delete
4. Verify role-based delete permissions
5. Toggle task status
6. Test frontend search functionality

