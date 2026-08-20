# LibraX — Smart Library Management System

> **ITUE301 Advanced Web Development Frameworks — Set B Practical Examination Project**  
> *Academic Year 2026 | B.Tech Computer Science & Engineering*

---

## 📌 1. Project Overview

**LibraX** is a modern, full-stack college library management web application built for **ITUE301 Set B Practical Examination**. It provides a clean, responsive interface for students and faculty to browse book catalogs, inspect live availability status, submit book borrowing requests, and demonstrate Express REST API integration alongside Mongoose database modeling and schema validation.

---

## 🛠️ 2. Technology Stack

* **Frontend**: React (Vite)
* **Routing**: React Router (`react-router-dom`)
* **Backend**: Node.js & Express.js
* **Database**: MongoDB & Mongoose
* **Styling**: Modern Vanilla CSS (Custom Design System with CSS Tokens)
* **HTTP Client**: Web standard `fetch` API

---

## 📁 3. Project Structure

```text
itue301-exam-101-batch/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Task 2: Navigation & NavLink component
│   │   │   ├── BookCard.jsx         # Task 1: Reusable Book Card with props
│   │   │   ├── Footer.jsx           # Clean dashboard footer
│   │   │   └── MongoDemoCard.jsx    # Task 5: Interactive Mongoose Viva Demo
│   │   ├── pages/
│   │   │   ├── HomePage.jsx         # Dashboard landing page
│   │   │   ├── BooksPage.jsx        # Task 4: API consumption with fetch & useEffect
│   │   │   └── BorrowPage.jsx       # Task 2: Two-column controlled form & live state
│   │   ├── App.jsx                  # React Router configuration
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Visual design system & token definitions
│   └── package.json
│
├── backend/
│   ├── models/
│   │   ├── Book.js                  # Task 5: Mongoose Book schema
│   │   ├── Member.js                # Task 5: Mongoose Member schema
│   │   └── Borrowing.js             # Task 5: Mongoose Borrowing schema (with refs)
│   ├── middleware/
│   │   ├── requestLogger.js         # Task 3: Global custom request logging middleware
│   │   └── errorHandler.js          # Task 3 & 5: Global structured JSON error handler
│   ├── routes/
│   │   ├── books.js                 # Task 3: GET /api/v1/books endpoint
│   │   ├── borrowings.js            # Task 3: GET & POST /api/v1/borrowings endpoints
│   │   └── demo.js                  # Task 5 & 8 & 9: MongoDB seed & validation failure demo
│   ├── server.js                    # Express server entry point
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
```

---

## 🎓 4. Practical Tasks Mapping (For Viva Presentation)

### 📌 Task 1 — React Component Architecture
* **Implementation Location**: `frontend/src/components/BookCard.jsx`
* **Features**:
  * Receives props: `title`, `author`, `category`, `available` from parent components.
  * Displays all 4 values.
  * Visually distinct badge styling for `available = true` ("Available") vs `available = false` ("Not Available").
  * Does NOT hardcode values internally.

### 📌 Task 2 — React Routing + State Management
* **Implementation Location**: `frontend/src/components/Navbar.jsx` & `frontend/src/pages/BorrowPage.jsx`
* **Features**:
  * React Router links (`/`, `/books`, `/borrow`) without full page reloads.
  * Active state highlights on navigation bar.
  * BorrowPage form manages state using single object `formData = { memberName, bookTitle, borrowDate, returnDate }`.
  * Inputs are controlled components using `value` and `onChange`.
  * Dynamic text display: `"Borrow request for: [memberName]"` updates live on screen.
  * Client-side validation: verifies required fields and ensures return date is not before borrow date.

### 📌 Task 3 — Express REST API + Middleware
* **Implementation Location**: `backend/server.js`, `backend/routes/`, `backend/middleware/`
* **Endpoints**:
  * `GET  /api/v1/books` → Returns list of books
  * `GET  /api/v1/borrowings` → Returns all borrowing records
  * `POST /api/v1/borrowings` → Creates a new borrowing record (Returns HTTP 201)
* **Custom Middleware**:
  * `middleware/requestLogger.js`: Executes globally for every request, logging `[METHOD] [PATH] [TIMESTAMP]`.
  * `middleware/errorHandler.js`: MUST be the last middleware in Express. Catches uncaught errors and returns structured JSON `{ "success": false, "message": "...", "error": "..." }`.

### 📌 Task 4 — REST API Consumption in React
* **Implementation Location**: `frontend/src/pages/BooksPage.jsx`
* **Features**:
  * Consumes Express API `GET /api/v1/books` using standard `fetch()` inside `useEffect()`.
  * Manages **3 separate states**: `data`, `loading`, `error`.
  * Displays polished UI for **Loading**, **Error**, and **Empty** states.
  * Dynamically renders array items using `BookCard` components.

### 📌 Task 5 — MongoDB & Mongoose Validation
* **Implementation Location**: `backend/models/`, `backend/routes/demo.js`
* **Schemas**:
  * `Book.js`: title, author, category, unique isbn, available (default true).
  * `Member.js`: name, unique email, phone, department.
  * `Borrowing.js`: memberId (ref to Member), bookId (ref to Book), dates, enum status (`'borrowed'`, `'returned'`, `'overdue'`).
* **Validation Failure Demonstration**:
  * Route `GET /api/v1/demo/test-validation` triggers Mongoose validation failure (missing required fields / invalid status enum).
  * `errorHandler.js` intercepts error and returns structured JSON HTTP 400 response:
    ```json
    {
      "success": false,
      "message": "Validation failed",
      "errors": [
        "Member ID is required",
        "Book ID is required"
      ]
    }
    ```

---

## 🚀 5. Quick Start Guide

### Prerequisites
* **Node.js**: v18.x or higher
* **npm**: v9.x or higher

---

### Step 1: Backend Setup & Launch

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copied from `.env.example`):
   ```bash
   cp .env.example .env
   ```
   *(Optionally add your MongoDB connection string in `MONGO_URI`)*

4. Start Express Server:
   ```bash
   npm start
   # or node server.js
   ```
   The backend will run on **`http://localhost:5000`**.

---

### Step 2: Frontend Setup & Launch

1. Open a new terminal and navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start Vite Development Server:
   ```bash
   npm run dev
   ```
   The frontend will run on **`http://localhost:5173`**.

---

## 🧪 6. Testing Endpoints & Demonstrations

### Testing Express REST API Endpoints (Task 3 & 4)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `http://localhost:5000/api/v1/books` | Returns sample books list |
| `GET` | `http://localhost:5000/api/v1/borrowings` | Returns active borrowings |
| `POST` | `http://localhost:5000/api/v1/borrowings` | Creates borrowing record (HTTP 201) |

#### Example POST Body:
```json
{
  "memberName": "Devansh Verma",
  "bookTitle": "Designing Data-Intensive Applications",
  "borrowDate": "2026-08-20",
  "returnDate": "2026-08-27"
}
```

### Demonstrating Mongoose Validation (Task 5, 8 & 9)

1. Open `http://localhost:5173` in your browser.
2. Scroll to the **"Task 5 — MongoDB & Mongoose Schema Demonstration"** card.
3. Click **"Run MongoDB Seed Operation (Task 8)"** to test document insertion with schema references.
4. Click **"Demonstrate Mongoose Validation Error (Task 9)"** to trigger structured HTTP 400 validation error formatting live in front of the examiner.

---

## 📋 7. Environment Variables Reference

### Backend (`backend/.env`)
```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/librax_db
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```ini
VITE_API_URL=http://localhost:5000
```

---

## 🎯 Viva Summary Checklist

- [x] **Task 1**: Reusable `BookCard` with props (`title`, `author`, `category`, `available`) & visual states.
- [x] **Task 2**: React Router (`/`, `/books`, `/borrow`), `NavLink` active states, `useState` form & live dynamic string.
- [x] **Task 3**: Express REST API endpoints (`GET /books`, `GET /borrowings`, `POST /borrowings`), `requestLogger`, and `errorHandler`.
- [x] **Task 4**: `fetch()` in `useEffect()`, 3 separate states (`data`, `loading`, `error`), rendering `BookCard`.
- [x] **Task 5**: Mongoose `Book`, `Member`, `Borrowing` schemas with references, enums, `.env` config, and 400 JSON validation output.
