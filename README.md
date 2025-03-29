# 📚 Library Management System - Express Backend API

This project is a backend API for a **Library Management System** built using **Node.js**, **Express**, and **MongoDB**. It provides endpoints for managing users, librarians, admins, books, borrow records, reviews, and reservations. The system includes **role-based access control** and **OTP-based authentication** for secure operations. 🔐✨

---

## 🚀 Features

- **🔑 Authentication**:
  - User registration and login with OTP verification. 🔄
  - Role-based access control for members, librarians, and admins. 🔒

- **👑 Admin Management**:
  - CRUD operations for admins. 🛠️
  - Approve or manage librarians. ✅

- **📖 Librarian Management**:
  - CRUD operations for librarians. 🏛️
  - Manage books and borrow records. 📚

- **👥 User Management**:
  - CRUD operations for users. 👤
  - Manage user profiles and memberships. 🏷️

- **📚 Book Management**:
  - CRUD operations for books. 📝
  - Manage book availability and borrowing. 📖

- **🔄 Borrow and Return Books**:
  - Borrow and return books with status tracking. 🔄📚

- **🌟 Reviews and Ratings**:
  - Add and update reviews for books. ⭐

- **📌 Reservations**:
  - Reserve books with status tracking. 📅

- **💰 Fine Management**:
  - Manage fines for overdue books. 💸

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js 🖥️
- **Database**: MongoDB, Mongoose 🗄️
- **Authentication**: JWT (JSON Web Tokens) 🔑
- **Email Service**: Nodemailer 📧
- **Environment Variables**: dotenv 🛡️
- **Security**: Helmet, CORS 🔐
- **Logging**: Morgan 📜

---

## ⚡ Getting Started

### 🔍 Prerequisites

- Node.js and npm installed 🏗️
- MongoDB installed and running locally or on a cloud service ☁️

### 🔧 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/library-management-system-express-backend-api.git
   cd library-management-system-express-backend-api
   ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   PORT=5000
   MONGODB=mongodb://localhost:27017/Library-Management-System
   SECRET_KEY=secretkey
   EMAIL=your-email@gmail.com
   EMAIL_PASSWORD=your-email-password
   ```

   - Replace `your-email@gmail.com` and `your-email-password` with your actual email credentials. ✉️
   - **Important**: Ensure that your `.env` file is included in your `.gitignore` file to prevent sensitive information from being exposed in version control. ⚠️

4. Start the server:
  ```sh
  npm start
  ```

  The server will start running on **http://localhost:5000** 🚀

---
## 🌐 API Endpoints

### Authentication

| Method | Endpoint         | Description                     |
|--------|------------------|---------------------------------|
| POST   | `/api/auth/register` | Register a new user            |
| POST   | `/api/auth/login`    | Login a user                   |
| POST   | `/api/auth/verify-otp` | Verify OTP for user registration |

---

### Admin

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/api/admin/profile`      | Get admin profile               |
| GET    | `/api/admin`              | Get all admins                  |
| GET    | `/api/admin/:id`          | Get admin by ID                 |
| PUT    | `/api/admin/:id`          | Update admin by ID              |
| DELETE | `/api/admin/:id`          | Delete admin by ID              |
| PUT    | `/api/admin/approve-librarian/:id` | Approve librarian by ID |

---

### Librarian

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/api/librarian/profile`  | Get librarian profile           |
| GET    | `/api/librarian`          | Get all librarians              |
| GET    | `/api/librarian/:id`      | Get librarian by ID             |
| PUT    | `/api/librarian/:id`      | Update librarian by ID          |
| DELETE | `/api/librarian/:id`      | Delete librarian by ID          |
| GET    | `/api/librarian/active`   | Get active librarians           |
| GET    | `/api/librarian/inactive` | Get inactive librarians         |

---

### User

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/api/user/profile`       | Get user profile                |
| GET    | `/api/user`               | Get all users                   |
| GET    | `/api/user/:id`           | Get user by ID                  |
| PUT    | `/api/user/delete`        | Update user by ID               |
| DELETE | `/api/user/:id`           | Delete user by ID               |

---

### Book

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/api/book`               | Get all books                   |
| GET    | `/api/book/:id`           | Get book by ID                  |
| POST   | `/api/book`               | Add a new book                  |
| PUT    | `/api/book/:id`           | Update book by ID               |
| DELETE | `/api/book/:id`           | Delete book by ID               |

---

### Borrow and Return Books

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| POST   | `/api/borrow/borrow`      | Borrow a book                   |
| POST   | `/api/borrow/return`      | Return a borrowed book          |

---

### Reviews

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| POST   | `/api/review/create`      | Add a review for a book         |
| PUT    | `/api/review/:id`         | Update a review by ID           |

 📌

---

## 📂 Project Structure

```sh
├── node_modules
├── auth
│   ├── verifyToken.js
├── controllers
│   ├── adminController.js
│   ├── authController.js
│   ├── bookController.js
│   ├── borrowBookController.js
│   ├── librarianController.js
│   ├── reviewController.js
│   └── userController.js
├── models
│   ├── Admin.js
│   ├── Book.js
│   ├── BorrowRecord.js
│   ├── Fine.js
│   ├── Librarian.js
│   ├── Reservation.js
│   ├── Review.js
│   └── User.js
├── routes
│   ├── admin.js
│   ├── auth.js
│   ├── book.js
│   ├── borrowBook.js
│   ├── librarian.js
│   ├── review.js
│   └── user.js
├── validation
│   └── authValidation.js
├── .env
├── .gitignore
├── Server.js
└── package.json
```

## 🤝 Contributing
Contributions are welcome! 🎉 Please **fork** the repository and create a **pull request** with your changes. 🔥

## 📜 License
This project is licensed under the **MIT License** 📝

## 👤 Author
Developed by **Metasebiyaw Asfaw**. For any inquiries, feel free to contact me at **metasebiyawasfaw@gmail.com** 📩
