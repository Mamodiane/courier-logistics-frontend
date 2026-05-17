# Courier Logistics Frontend

Vue.js frontend for the Courier & Logistics Management System.

This application connects to a Laravel REST API backend and allows users to register, log in, manage parcels, and perform full CRUD operations through a simple dashboard.

---

## Tech Stack

- Vue.js 3
- JavaScript
- Vue Router
- Pinia
- Axios
- Vite
- HTML/CSS

---

## Features

### Authentication
- User registration
- User login
- Logout
- Token storage using localStorage
- Protected frontend routes
- Redirect unauthenticated users to login
- Redirect authenticated users away from login/register pages

### Parcel Management
- View user parcels
- Create new parcel
- Edit parcel details
- Delete parcel
- Display parcel tracking number
- Display delivery status
- Display receiver and delivery information

### API Integration
- Axios service for Laravel API communication
- Automatic Bearer token attachment using Axios interceptors
- Protected API requests using Laravel Sanctum token authentication

---

## Backend API

This frontend connects to the Laravel backend API:

```text
http://127.0.0.1:8000/api