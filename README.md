# Courier Logistics Frontend

Vue.js frontend for the Courier & Logistics Management System.

This application connects to a Laravel REST API backend and allows users to register, log in, manage parcels, and perform full CRUD operations through a modern dashboard interface.

---

## Tech Stack

- Vue.js 3
- JavaScript
- Vue Router
- Pinia
- Axios
- Tailwind CSS
- Vite
- HTML5/CSS3

---

## Features

### Authentication
- User registration
- User login
- Logout functionality
- Token storage using localStorage
- Protected frontend routes
- Redirect unauthenticated users to login
- Redirect authenticated users away from login/register pages

### Parcel Management
- View user parcels
- Create new parcel
- Edit parcel details
- Delete parcel
- Search/filter parcels
- Dynamic parcel status badges
- Dashboard summary cards
- Display parcel tracking number
- Display delivery status
- Display receiver and delivery information

### Dashboard Features
- Total parcels counter
- Pending parcels counter
- Delivered parcels counter
- Cancelled parcels counter
- Responsive parcel cards
- Real-time search filtering

### API Integration
- Axios service for Laravel API communication
- Automatic Bearer token attachment using Axios interceptors
- Protected API requests using Laravel Sanctum token authentication

### UI/UX
- Responsive modern UI using Tailwind CSS
- Styled forms and buttons
- Status color indicators
- Clean dashboard layout
- SPA navigation with Vue Router

---

## Backend API

This frontend connects to the Laravel backend API:

```text
http://127.0.0.1:8000/api
```

Backend repository:

```text
courier-logistics-api
```

---

## Project Structure

```text
src/
├── assets/
│   └── main.css
│
├── pages/
│   ├── LoginPage.vue
│   ├── RegisterPage.vue
│   ├── DashboardPage.vue
│   ├── CreateParcelPage.vue
│   └── EditParcelPage.vue
│
├── router/
│   └── index.js
│
├── services/
│   └── api.js
│
├── stores/
│   └── auth.js
│
├── App.vue
└── main.js
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/courier-logistics-frontend.git
```

Enter the project folder:

```bash
cd courier-logistics-frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open the application:

```text
http://localhost:5173
```

---

## Backend Setup

Before using the frontend, ensure the Laravel backend API is running:

```bash
cd courier-logistics-api
php artisan serve
```

Backend should run on:

```text
http://127.0.0.1:8000
```

---

## API Service

Axios is configured in:

```text
src/services/api.js
```

Base API URL:

```js
baseURL: 'http://127.0.0.1:8000/api'
```

Axios interceptor automatically attaches the authentication token:

```js
Authorization: Bearer token
```

---

## Main Routes

| Route | Description | Protected |
|---|---|---|
| `/login` | Login page | No |
| `/register` | Register page | No |
| `/dashboard` | Parcel dashboard | Yes |
| `/create-parcel` | Create parcel form | Yes |
| `/edit-parcel/:id` | Edit parcel form | Yes |

---

## Authentication Flow

1. User registers or logs in
2. Laravel API returns Sanctum token
3. Vue stores token in localStorage
4. Axios interceptor attaches token to requests
5. Protected backend routes authenticate the user
6. Vue route guards protect frontend pages

---

## Parcel Flow

1. User logs in
2. User creates a parcel
3. Vue sends data to Laravel API
4. Laravel validates and stores parcel data
5. Dashboard fetches authenticated user parcels
6. User can edit, search, and delete parcels

---

## What This Project Demonstrates

- Vue.js SPA development
- Frontend routing with Vue Router
- State management with Pinia
- REST API integration with Axios
- Token-based authentication
- Protected frontend routes
- CRUD operations
- Dynamic UI rendering
- Search and filtering
- Tailwind CSS responsive design
- Laravel + Vue full-stack architecture
- Separation of frontend and backend applications

---

## Future Improvements

- Pagination
- Parcel tracking timeline
- Role-based access control
- Admin dashboard
- Driver management
- Notifications
- Email integration
- Dark mode
- Charts and analytics
- Deployment to cloud hosting

---

## Author

Pilato Mmatshipyane

Full Stack Developer  
Laravel | PHP | Vue.js | JavaScript | REST APIs | MySQL