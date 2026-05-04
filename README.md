# 📰 News Aggregator API

A lightweight Node.js + Express backend that aggregates news from external APIs and provides authentication using JWT — without any database.

---

This project is a News Aggregator API that:

- Fetches news from external sources
- Provides user authentication (JWT-based)
- Uses middleware to protect routes
- Does NOT use any database (MongoDB not used)

Note: User data is stored in-memory and will reset when the server restarts.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- JWT (Authentication)
- External News API

---

## Project Structure

├── controllers/
│ ├── authController.js
│ ├── newsController.js
│ └── userController.js
│
├── middleware/
│ └── authMiddleware.js
│
├── models/
│ └── userModel.js (used for in-memory structure only)
│
├── routes/
│ ├── authRoutes.js
│ ├── newsRoutes.js
│ └── userRoutes.js
│
├── services/
│ └── newsService.js
│
├── app.js
├── package.json
└── README.md

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/news-aggregator-api.git
cd news-aggregator-api
2. Install dependencies
npm install
3. Create a .env file
PORT=5000
JWT_SECRET=your_secret_key
NEWS_API_KEY=your_news_api_key
4. Run the server
npm start

For development:

npm run dev
🔐 Authentication

This API uses JWT (JSON Web Token)

Header format:
Authorization: Bearer <your_token>
 API Endpoints
 Auth APIs
Register User
POST /api/auth/register

Request Body:

{
  "username": "amit",
  "email": "amit@example.com",
  "password": "123456"
}

Response:

{
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
Login User
POST /api/auth/login

Request Body:

{
  "email": "amit@example.com",
  "password": "123456"
}

```
