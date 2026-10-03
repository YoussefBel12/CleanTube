# CleanTube

A full-stack YouTube-inspired video-sharing platform built with **ASP.NET Core 8, React, and SQL Server**, following **Clean Architecture** and **CQRS** principles.

## Features

* 🔐 JWT authentication & user registration
* 📺 Channel creation and management
* 🎬 Video uploads with custom thumbnails
* ❤️ Video likes
* 🔔 Channel subscriptions
* 💬 Comments
* 🔎 Video search
* 👤 User profiles and channel pages
* 📱 Responsive dark-themed UI
* 🎨 Custom YouTube-inspired interface

## Tech Stack

### Backend

* **.NET 8 / ASP.NET Core**
* **Entity Framework Core**
* **SQL Server**
* **ASP.NET Core Identity**
* **JWT Authentication**
* **MediatR / CQRS**
* **FluentValidation**
* **AutoMapper**
* **Repository Pattern**
* **Clean Architecture**

### Frontend

* **React**
* **Vite**
* **React Router**
* **Axios**
* **Material UI (MUI)**
* **Emotion**

## Architecture

The backend follows a layered Clean Architecture structure:

```text
CleanTube
├── CleanTube.Api
├── CleanTube.Application
├── CleanTube.Domain
├── CleanTube.Infrastructure
└── cleantube-client
```

Dependency flow:

```text
API
 ↓
Application
 ↓
Domain

Infrastructure
 ↓
Application + Domain
```

This keeps business logic independent from frameworks, databases, and external infrastructure.

## Main Application Flow

```text
User
 │
 ▼
React Frontend
 │
 │ HTTP / REST API
 ▼
ASP.NET Core API
 │
 ▼
Application Layer
 │
 │ CQRS / MediatR
 ▼
Infrastructure
 │
 ▼
SQL Server
```

## Video Uploads

Videos and thumbnails are uploaded through the API and stored locally under:

```text
CleanTube.Api/wwwroot/uploads/
├── videos/
└── thumbnails/
```

Uploaded media is excluded from Git using `.gitignore`.

## Project Structure

### Backend

```text
CleanTube.Api
    API endpoints and application startup

CleanTube.Application
    Commands
    Queries
    DTOs
    Validators
    Interfaces
    Application logic

CleanTube.Domain
    Entities
    Core business models

CleanTube.Infrastructure
    EF Core
    Identity
    Repositories
    File storage
    External infrastructure
```

### Frontend

```text
cleantube-client
├── src
│   ├── components
│   ├── pages
│   ├── api
│   └── theme
```

## UI

CleanTube uses a dark, cinematic interface designed around a modern video-platform experience.

The UI includes:

* Responsive video grids
* Video cards with thumbnail previews
* Channel pages
* Subscription feed
* Video player page
* Authentication screens
* Creator upload interface
* Responsive sidebar and navigation

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YoussefBel12/CleanTube.git
cd CleanTube
```

### 2. Backend

Open the solution in Visual Studio and configure your SQL Server connection string in:

```text
CleanTube.Api/appsettings.json
```

Then apply the database migrations:

```bash
dotnet ef database update
```

Run the ASP.NET Core API.

### 3. Frontend

Navigate to the React application:

```bash
cd cleantube-client
npm install
npm run dev
```

The frontend will then be available through the Vite development server.

## What This Project Demonstrates

CleanTube was built to practice and demonstrate:

* Full-stack application development
* Clean Architecture
* CQRS with MediatR
* REST API design
* Authentication and authorization
* Entity Framework Core
* React application architecture
* File upload handling
* Repository pattern
* Frontend/backend integration
* Responsive UI development

## Author

**Youssef Belhcen**

GitHub: [YoussefBel12](https://github.com/YoussefBel12)

