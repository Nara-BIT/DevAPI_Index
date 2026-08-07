# DevAPI Index

A curated directory where users can discover, test, and bookmark public APIs by category.

## Demo

| Landing Page | Browsing APIs | Testing an API |
| :---: | :---: | :---: |
| ![Landing Page](img/landingPage.png) | ![Browsing Page](img/browsingPage.png) | ![View Demo API](img/viewDemoAPI.png) |

## Tech Stack

- **Frontend:** React (Vite) + React Router + Tailwind CSS
- **Backend:** Express.js + MongoDB (Mongoose)
- **Auth:** JWT + bcrypt

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
cp .env.example .env   # update MONGO_URI and JWT_SECRET
npm install
npm run seed            # seed categories + sample APIs
npm run dev             # start server on port 5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev             # start dev server on port 5173
```

## Features

- Browse & search public APIs with filters (auth, CORS, HTTPS, category)
- User registration & login (JWT)
- Bookmark favorite APIs
- Submit new APIs for review
- Ratings & reviews
- Admin moderation queue
- Test-in-browser (try API endpoints)
- API documentation preview

## Project Structure

```
DevAPI_Index/
├── backend/          Express API server
├── frontend/         React SPA (Vite)
└── .gitignore
```

## Architecture

```mermaid
graph LR
    %% Custom Styling
    classDef user fill:#EDE9FE,stroke:#8B5CF6,stroke-width:2px,color:#2E1065;
    classDef admin fill:#DDD6FE,stroke:#7C3AED,stroke-width:2px,color:#2E1065;
    classDef ui fill:#A78BFA,stroke:#8B5CF6,stroke-width:2px,color:white;
    classDef server fill:#34D399,stroke:#059669,stroke-width:2px,color:#064E3B;
    classDef auth fill:#10B981,stroke:#059669,stroke-width:2px,color:#064E3B;
    classDef route fill:#6EE7B7,stroke:#10B981,stroke-width:2px,color:#064E3B;
    classDef db fill:#60A5FA,stroke:#3B82F6,stroke-width:2px,color:#172554;
    classDef external fill:#FB923C,stroke:#EA580C,stroke-width:2px,color:#7C2D12;

    %% Components
    USER((🧑 User)):::user
    ADMIN((🛡️ Admin)):::admin
    PAGES[📄 Pages<br/>Home · Browse · Dashboard]:::ui
    DETAIL[🔎 ApiDetail · Bookmarks<br/>SubmitApi · Login/Register]:::ui
    ADMINUI[🗂️ Admin Moderation<br/>Queue]:::ui
    SERVER[⚙️ REST API Server<br/>server.js]:::server
    AUTH[🔐 Auth Middleware<br/>JWT + bcrypt]:::auth
    RAUTH[/auth/]:::route
    RAPIS[/apis/]:::route
    RBOOK[/bookmarks/]:::route
    RREV[/reviews/]:::route
    RADMIN[/admin/]:::route
    UDB[(👥 Users)]:::db
    ADB[(🧩 APIs)]:::db
    CDB[(🏷️ Categories)]:::db
    RDB[(⭐ Reviews)]:::db
    EXTAPI[🌐 Public APIs<br/>test-in-browser]:::external

    %% Data Flow
    USER -- "Browse & search" --> PAGES
    USER -- "View docs · Rate · Bookmark<br/>Submit new API" --> DETAIL
    ADMIN -- "Approve/reject submissions" --> ADMINUI
    PAGES -- "HTTP REST" --> SERVER
    DETAIL --> SERVER
    ADMINUI --> SERVER
    SERVER -- "Protect routes" --> AUTH
    SERVER --> RAUTH
    SERVER --> RAPIS
    SERVER --> RBOOK
    SERVER --> RREV
    SERVER --> RADMIN
    RAUTH --> UDB
    RAPIS --> ADB
    RAPIS --> CDB
    RBOOK --> UDB
    RREV --> RDB
    RADMIN --> ADB
    DETAIL -- "Try API endpoints in browser" --> EXTAPI
```
