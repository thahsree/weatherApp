# **Weather Application**

## **Project Overview**

This is a full-stack weather application built with modern technologies to display real-time weather information based on user location or queried input. The application ensures seamless user experience with robust backend services and an intuitive frontend interface.

## **TECHNOLOGIES USED**

### Backend

- Node.js: JavaScript runtime for server-side development.
- Express.js: Fast and lightweight web framework for building REST APIs.
- MySQL: Relational database for storing user and weather data.
- Express-session: Middleware for session management.
- JWT (JSON Web Token): Secure user authentication using sessions.

#### Additional Backend Packages

| **Package** | **Purpose**                                      |
| ----------- | ------------------------------------------------ |
| **Morgan**  | Middleware for logging HTTP requests             |
| **Nodemon** | Automatically restarts server during development |
| **Colors**  | Adds colors to logs for better readability       |
| **Bcrypt**  | Password hashing for security                    |
| **CORS**    | Enables Cross-Origin Resource Sharing            |
| **Dotenv**  | Loads environment variables from `.env`          |

### Frontend

- React.js: Library for building dynamic user interfaces.
- TypeScript: Ensures type safety and improved developer productivity.
- Tailwind CSS: Utility-first framework for responsive and modern styling.
- React-Router-Dom: Client-side routing for smooth navigation.
- Axios: Promise-based HTTP client for API calls.
- React Query: Manages server-side state and API calls efficiently.

#### Third-Party APIs

- WeatherStack: Fetches real-time and queried weather data.
- OpenStreetMap: Provides current location information based on user input

## Setup Instructions

### Prerequisites

- Node.js installed (v14 or later).
- MySQL installed and configured.

## Backend Setup

1. clone the repopsitory

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

2. install backend dependencies

```bash
cd backend
npm install
```

3. Set up environment variables:
   -Create a .env file in the backend directory.
   -Add the following environment variables

```bash
PORT = 8080
DATABASE_NAME = db-name
DATABASE_HOST = host
DATABASE_USER = db user
DATABASE_PASSWORD = your db password
ACCESS_TOKEN_SECRET = your accesstoken secret
SESSION_SECRET = your session secret
```

4. Start the backend server

```bash
npm start
```

## Frontend Setup

1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

2. Set up environment variables:
   -Create a .env file in the frontend directory.
   -Add the following environment variables

```bash
VITE_WEATHER_ACCESS_KEY = f6b83e53f4e511f89988b94023b13304
```

3.Start the frontend application

```bash
npm run dev
```

## Dependencies

### Backend Dependencies

- Node.js
- Express.js
- MySQL
- Express-session
- Bcrypt
- Morgan
- Nodemon
- Colors
- CORS
- Dotenv

### Frontend Dependencies

- React.js
- TypeScript
- Tailwind CSS
- React-Router-Dom
- Axios
- React Query
