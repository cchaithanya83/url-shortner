

# URL Shortener

This project is a full-stack web application for shortening URLs. It consists of a backend built with Node.js, Express, and Firebase Firestore, and a frontend built with React and TypeScript (ReactTSX).

## Project Link

[Url shortner](https://ckshorturl.netlify.app/)

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Overview

This application allows users to create short URLs and redirect to the original URLs using the provided short codes. The backend manages the API for URL shortening and redirection, while the frontend provides a user interface for interacting with these features.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: Firebase Firestore
- **Frontend**: React, TypeScript, Tailwind CSS
- **Environment Configuration**: dotenv

## Project Structure

```
project-root/
├── backend/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── home.tsx
    │   │   ├── nav.tsx
    │   ├── App.tsx
    │   ├── App.css
    │   ├── index.css
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.ts
```

## Getting Started

### Backend

#### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)
- Firebase account with Firestore set up

#### Installation

1. **Clone the Repository:**

   ```bash
   git clone <your-repo-url>
   cd backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root of the `backend` directory and add the environment variables as shown in the [Environment Variables](#environment-variables) section.

4. **Run the Backend Server:**

   ```bash
   npm start
   ```

   The backend server should now be running on `http://localhost:3000`.

### Frontend

#### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)

#### Installation

1. **Navigate to the Frontend Directory:**

   ```bash
   cd frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Frontend Development Server:**

   ```bash
   npm run dev
   ```

   The frontend should now be running on `http://localhost:5173`.

## Environment Variables

### Backend

The backend requires the following environment variables:

```env
PORT=3000

# Firebase configuration
FIREBASE_TYPE=<your_firebase_type>
FIREBASE_PROJECT_ID=<your_firebase_project_id>
FIREBASE_PRIVATE_KEY_ID=<your_firebase_private_key_id>
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n<your_private_key>\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=<your_firebase_client_email>
FIREBASE_CLIENT_ID=<your_firebase_client_id>
FIREBASE_AUTH_URI=<your_firebase_auth_uri>
FIREBASE_TOKEN_URI=<your_firebase_token_uri>
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=<your_firebase_auth_provider_cert_url>
FIREBASE_CLIENT_X509_CERT_URL=<your_firebase_client_cert_url>
FIREBASE_UNIVERSE_DOMAIN=<your_firebase_universe_domain>
```

### Frontend

The frontend uses environment variables defined in the `vite-env.d.ts` file.

## API Endpoints

### 1. Shorten a URL

- **Endpoint**: `/shorten`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "longUrl": "https://www.example.com",
    "shortCode": "customShortCode"
  }
  ```
- **Response**:
  - `200 OK`: Returns the shortened URL.
  - `400 Bad Request`: Missing `longUrl` or `shortCode`.
  - `409 Conflict`: The `shortCode` already exists.
  - `500 Internal Server Error`: Server error.

### 2. Redirect to Original URL

- **Endpoint**: `/:shortCode`
- **Method**: `GET`
- **Response**:
  - Redirects to the original URL.
  - `404 Not Found`: Short URL not found.
  - `500 Internal Server Error`: Server error.

