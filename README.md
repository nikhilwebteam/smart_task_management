Smart Task Management System (MERN Stack)
This project is a full-stack MERN application built to manage tasks
It implements:
- Secure authentication and authorization
- User-scoped task management
- Strict business rules and validations


  1. Tech Stack (As Required)
     
| Layer          | Technology            |
| -------------- | --------------------- |
| Frontend       | React.js              |
| Backend        | Node.js, Express.js   |
| Database       | MongoDB with Mongoose |
| Authentication | JWT + bcrypt          |
| API Client     | Axios                 |


2. Authentication & Authorization
User Model
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  createdAt: Date
}

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| POST   | /api/auth/register | Register new user  |
| POST   | /api/auth/login    | Login user         |
| GET    | /api/auth/profile  | Get logged-in user |

Rules Implemented 
- Passwords are hashed using bcrypt.
- JWT token is issued on login.
- Token is sent in headers:
- All task APIs are protected.
- Unauthorized access returns 401 Unauthorized.

3. Backend Requirements
Task Model
{
  title: String (required, unique per user),
  description: String,
  status: "Pending" | "In Progress" | "Completed",
  priority: "Low" | "Medium" | "High",
  isDeleted: Boolean (default: false),
  userId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
Task Visibility Rules
- Each task belongs to a single user.
- Users can only access their own tasks.
- Accessing another user’s task returns 403 Forbidden.

4. Task APIs (Protected)
 
| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| POST   | /api/tasks     | Create task      |
| GET    | /api/tasks     | Get user tasks   |
| GET    | /api/tasks/:id | Get task by ID   |
| PUT    | /api/tasks/:id | Update task      |
| DELETE | /api/tasks/:id | Soft delete task |

5. Backend Logical Rules Implemented
   
| Rule                                       | Status |
| ------------------------------------------ | ------ |
| Duplicate title per user prevented         | ✅      |
| High priority → default status In Progress | ✅      |
| Soft delete using isDeleted flag           | ✅      |
| Sorting: High → Medium → Low, latest first | ✅      |
| Completed → Pending not allowed            | ✅      |
| Authorization enforced per user            | ✅      |

6. Frontend Requirements
Pages Implemented

1.Register Page
- Name, Email, Password
- Password min length validation
- Redirects to login on success
2.Login Page
- Email, Password
- Stores JWT in localStorage
- Redirects to task list
3.Task List Page
- Displays tasks in table
- Columns: Title, Priority, Status, Created Date
- Status filter dropdown
- Search by title
- Priority-based sorting
- Logout option

7. Mandatory Frontend Logic
   
| Feature                        | Status |
| ------------------------------ | ------ |
| Loader during API calls        | ✅      |
| Disable submit while loading   | ✅      |
| Confirmation before delete     | ✅      |
| Toast alerts for success/error | ✅      |
| Protected routes               | ✅      |

8. Project Structure
   
   backend/
├─ models/
├─ controllers/
├─ routes/
├─ middleware/
├─ utils/
└─ server.js

frontend/
├─ components/
├─ pages/
├─ services/
├─ context/
└─ App.js

9. Environment Variables

- Backend (.env)
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret

- Frontend (.env)
VITE_API_BASE_URL=http://localhost:5000/api

10. Setup Instructions

- git clone <repo_url>
- cd smart-task-management

- Backend
- cd backend
  npm install
  npm run dev
- Frontend
  cd frontend
  npm install
  npm run dev

  Author

Name: nikhil Name
Assignment: MERN Stack Assignment 
