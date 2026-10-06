# MiniDB Client

A modern React-based SQL playground for interacting with the MiniDB database engine.

## Overview

The client provides a simple web interface where users can:

- Write SQL queries
- Execute queries through the MiniDB API
- View query results
- View available tables
- Quickly generate `SELECT` queries for existing tables

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Lucide React

## Project Structure

```text
src/
├── App.tsx
├── main.tsx
└── styles.css
```

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The client will run at:

```text
http://localhost:5173
```

## Environment Variable

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
```

For production, set `VITE_API_URL` to the deployed MiniDB server URL.

Example:

```env
VITE_API_URL=https://your-minidb-server.onrender.com/api
```

## Build

```bash
npm run build
```

The production files are generated in the `dist/` directory.

## Backend

This client communicates with the MiniDB backend through:

```text
POST /api/query
GET  /api/tables
```

See the MiniDB Server repository for backend and database-engine details.# Mini-DB-client
