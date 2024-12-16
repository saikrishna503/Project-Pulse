# Project Pulse

![Project Pulse Logo](client/src/Images/Logo.svg)

**Project Pulse** is a web-based solution designed to manage and track the progress of college projects across multiple departments, specifically for educational institutions. This platform provides a centralized dashboard for administrators and real-time collaboration tools for students and team leaders.

## Features

- **Dashboard Overview**:
  - View total projects, completion status, and pending projects in graphs.
- **Department Management**:
  - Manage projects by departments (CSE, CSD, CSM, etc.).
  - Sub-department-wise project categorization.
- **Project Tracking**:
  - Add, update, and delete project details.
  - Monitor project progress and completion.
- **Team Management**:
  - Create and invite team members.
  - Assign tasks and roles within teams.
- **User Authentication**:
  - Secure login/signup using JWT.
  - Google Authentication support.
- **Dark Mode**:
  - Supports light and dark themes for better accessibility.

## Tech Stack

### Frontend
- React.js
- Redux Toolkit (State Management)
- Advanced CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose

### Deployment
- Netlify (Frontend)
- Heroku (Backend)

### Tools
- Agile methodology for development
- Canva for wireframes

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn
- MongoDB

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Project-Pulse.git
   cd Project-Pulse
   ```

2. Install dependencies for both client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `server` folder and configure the following:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Start the application:
   - Backend: Run the server in the `server` directory:
     ```bash
     npm start
     ```
   - Frontend: Run the client in the `client` directory:
     ```bash
     npm start
     ```

5. Access the application in your browser:
   ```
   http://localhost:3000
   ```

## Folder Structure

```
Project-Pulse/
├── client/                # Frontend code
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Pages for the application
│   │   ├── data/         # Static data files
│   │   └── utils/        # Utility functions
│   └── public/           # Public assets
├── server/                # Backend code
│   ├── controllers/      # Route logic
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Middleware functions
│   └── .env              # Environment variables (not committed)
├── Database/              # Static JSON data for testing
├── .gitignore             # Files to ignore in Git
├── LICENSE                # License information
└── README.md              # Project documentation
```

## Screenshots

### Dashboard
![Dashboard](client/src/Images/Header.png)

### Login Page
![Login Page](client/src/Images/AddProject.gif)

## Contributors

- **Sairam** - Frontend and Database Development

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Reference Design inspired by provided images.
- Agile Methodology followed throughout the development process.
