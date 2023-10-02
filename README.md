# Mern Stack Learning

This is a full stack MERN (MongoDB, Express, React, Node.js) app for creating and managing notes.

## Installation

1. Clone the repository

```bash 
git clone https://github.com/abdulmoizsheraz/Mern-Stack-Learning.git
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

Copy the `config.example.env` file to `.env` and update it with your MongoDB connection URI, JWT secret and any other values needed.

```
MONGO_URI=your_mongo_uri 
JWT_SECRET=your_jwt_secret
```

4. Start the app

```
npm run dev
```

This will start the Express server on port 5000 and the React app on port 3000.

## Features

- User registration and login with JWT authentication
- Create, view, edit, and delete notes 
- Mark notes as important
- Responsive design

## Code Overview

- The backend is built with Node, Express and MongoDB/Mongoose for the database. JWT is used for authentication.

- The React frontend uses React Router for routing and Redux for state management.

- `models/User.js` and `models/Note.js` - Mongoose schemas and models for users and notes

- `routes/auth.js` - Auth routes for register and login users
- React components located in `/client/src/components`

- Redux actions and reducers handle state management in `/client/src/redux`

## Deployment

The app can be deployed to any service that hosts Node apps such as Heroku, AWS, Azure etc.

The React frontend should be built into static files using `npm run build` and served by the Node/Express backend.

## License

This project is open source and available under the [MIT License](LICENSE).
