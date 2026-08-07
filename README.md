# Real-Time Chat Application – Backend

## 📌 Overview

This repository contains the **backend server** for the Real-Time Chat Application.

It handles:

* User authentication
* Message storage
* Real-time communication
* Database operations

The backend exposes REST APIs and uses WebSockets for real-time messaging.

---

## 🚀 Features

* User registration and login
* REST API for chat operations
* Real-time messaging using Socket.io
* MongoDB database integration
* Secure server using Express.js

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.io
* JWT Authentication

---

## 📂 Project Structure

```
server
│
├── models
│   ├── User.js
│   └── Message.js
│
├── routes
│   ├── authRoutes.js
│   └── messageRoutes.js
│
├── controllers
│
├── config
│
└── server.js
```

---

## ⚙️ Installation

### Clone the repository

```
git clone https://github.com/ITZ-PRIYANSHU-RAJ/real-time-chat-application-BACKEND
```

### Navigate to project folder

```
cd chat-app-backend
```

### Install dependencies

```
npm install
```

### Create environment file

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### Start the server

```
npm start
```

The backend server will run on:

```
http://localhost:5000
```

---

## 🔗 Frontend Repository

Frontend code is available here:

```
https://github.com/ITZ-PRIYANSHU-RAJ/real-time-chat-application---FRONTEND
```

---

## 👨‍💻 Author

Priyanshu Raj

GitHub:
https://github.com/ITZ-PRIYANSHU-RAJ



