# 🚚 Last Mile Delivery Tracker

A full-stack **MERN-based logistics tracking system** that handles order creation, delivery assignment, status tracking, and delivery failure reporting with role-based access (Customer / Driver / Admin).

---

# 📌 Features

- 🔐 JWT Authentication (Login/Register)
- 👤 Role-based access control (Customer / Driver / Admin)
- 📦 Order creation & tracking
- 🚚 Delivery status updates (Assigned → In Transit → Delivered / Failed)
- 📍 Failed delivery reporting
- 📊 Rate calculation for deliveries
- 🗄️ MongoDB database integration
- 🌐 RESTful API backend (Express)

---

# 🏗️ Project Structure


last-mile-delivery-tracker/
│
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── config/
│ ├── server.js
│ └── .env.example
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
└── README.md


---

# ⚙️ Setup Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/last-mile-delivery-tracker.git
cd last-mile-delivery-tracker
2️⃣ Backend Setup
cd backend
npm install
node server.js

OR

npm run dev

Backend runs on:

http://localhost:5000
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🔐 Environment Variables

Create a .env file inside /backend

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/last_mile_db
JWT_SECRET=your_secret_key
NODE_ENV=development
📡 API Documentation
🔑 Auth Routes
Register User
POST /api/auth/register
Login User
POST /api/auth/login

Response:

{
  "token": "jwt_token_here",
  "user": {
    "id": "123",
    "role": "customer"
  }
}
📦 Order Routes
Create Order (Customer)
POST /api/orders

Headers:

Authorization: Bearer <token>
Get My Orders
GET /api/orders
Update Delivery Status
PUT /api/orders/:id/status
Mark Failed Delivery
POST /api/orders/:id/fail
🗄️ Database Schema
👤 User Schema
{
  name: String,
  email: String,
  password: String,
  role: ["customer", "driver", "admin"],
  createdAt: Date
}
📦 Order Schema
{
  userId: ObjectId,
  pickupLocation: String,
  dropLocation: String,
  status: ["pending", "assigned", "in_transit", "delivered", "failed"],
  deliveryAgent: ObjectId,
  price: Number,
  createdAt: Date
}
🚚 Delivery Schema (Optional)
{
  orderId: ObjectId,
  statusHistory: [
    {
      status: String,
      timestamp: Date
    }
  ]
}
💰 Rate Calculation Logic
Formula
Final Price = Base Rate + Distance Charge + Priority Fee
Breakdown
Base Rate = ₹50
Distance Charge = ₹10 per km

Priority Fee:

Normal = ₹0
Express = ₹30
Same Day = ₹50
Example
Base = ₹50
Distance (12 km) = ₹120
Priority (Express) = ₹30

Final Price = ₹200
🔐 Authentication Flow
User logs in
Server generates JWT token
Token stored in frontend (localStorage)
Token sent in request headers
Authorization: Bearer <token>
🚀 Deployment
Backend → Render / Railway / AWS
Frontend → Vercel / Netlify
Database → MongoDB Atlas
🧪 Testing Tools
Postman
Thunder Client
📌 Future Improvements
GPS tracking
SMS/Email notifications
Admin analytics dashboard
Google Maps integration
Driver mobile app
