# MERN Stack Blog App

This is a full-stack blog application built using the MERN (MongoDB, Express.js, React, Node.js) stack. The app allows users to register, log in, and create, edit, and delete blog posts. It also features user authentication and a responsive design.

## Features
- User authentication with JWT
- Create, read, update, and delete blog posts
- Responsive design using React and Tailwind CSS/Bootstrap
- Tagging system for categorizing blog posts

## Technologies
- Frontend: React, TypeScript ,Tailwind CSS, Axios
- Backend: Node.js, TypeScript ,Express.js, MongoDB, Mongoose, JWT
- State Management: React Context API
- Styling: Bootstrap

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Clone the Repository
```bash
git clone https://github.com/swarnab007/mern-blog.git
```
### Navigate to Project Directory
```bash
cd mern-blog
```

### Backend Setup
Navigate to the backend directory:
```bash
cd server
```

Install dependencies:
```bash
npm i
```

Create a .env file in the backend directory with the following content:
```bash
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend server:
```bash
npm run dev
```

### Frontend Setup
Navigate to the frontend directory:
```bash
cd client
```

Install dependencies:
```bash
npm i
```

Start the frontend development server:
```bash
npm run dev
```

