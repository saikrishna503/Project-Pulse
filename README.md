# Project Pulse


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

## Output

### Dashboard

![Screenshot 2024-12-16 173143](https://github.com/user-attachments/assets/7015bd96-5f3f-4774-85bd-473f581f4dc8)

![Screenshot 2024-12-16 173204](https://github.com/user-attachments/assets/c00494f0-7cb6-46b5-8036-8d0f55f35692)


### Department

![Screenshot 2024-12-16 173223](https://github.com/user-attachments/assets/5f261a1e-4378-4eea-9cee-5f8f02e290fb)

### Subdepartment of CSE

![Screenshot 2024-12-16 173244](https://github.com/user-attachments/assets/f8eb02ec-0b8f-4894-88e0-3262523b659a)

### List of CSE-B Projects

![Screenshot 2024-12-16 174333](https://github.com/user-attachments/assets/2144a35f-2734-4f6a-9729-b3394c14c43e)

### Project Details of Team CSEB002

![Screenshot 2024-12-16 174414](https://github.com/user-attachments/assets/b9574e46-c725-4650-891a-80b42786c1e8)

### Dynamically edit Project Details of Team CSEB002

![Screenshot 2024-12-16 174444](https://github.com/user-attachments/assets/69ca2741-1d50-4c00-9ad4-68ce4706ddc8)

![Screenshot 2024-12-16 174504](https://github.com/user-attachments/assets/8fc0c6a2-f54b-49cd-9596-d1bac96ba6d5)






## Acknowledgments

- Reference Design inspired by provided images.
- Agile Methodology followed throughout the development process.
