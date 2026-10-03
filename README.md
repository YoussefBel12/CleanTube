CleanTube

CleanTube is a full-stack video-sharing platform inspired by modern video platforms such as YouTube. The project was built to practice and demonstrate real-world ASP.NET Core and React.js development, with a strong focus on Clean Architecture, CQRS, authentication, API design, and modern frontend development.

Technology Stack
Backend
.NET 8 / ASP.NET Core Web API
Entity Framework Core
SQL Server
ASP.NET Core Identity
JWT Authentication
MediatR / CQRS
FluentValidation
AutoMapper
Repository + Unit of Work patterns
RESTful APIs
Frontend
React.js
Vite
React Router
Axios
Material UI (MUI)
Responsive and component-based UI
Architecture

The backend follows a Clean Architecture structure:

CleanTube
├── CleanTube.Domain
├── CleanTube.Application
├── CleanTube.Infrastructure
└── CleanTube.Api

Dependencies are kept separated:

API
 ↓
Application
 ↓
Domain

Infrastructure
 ↓
Application + Domain

The Domain contains the core entities and business concepts without depending on external technologies.

The Application layer contains use cases, CQRS commands and queries, DTOs, validation, repository abstractions, and application logic.

The Infrastructure layer handles external concerns such as Entity Framework Core, SQL Server, Identity, JWT-related infrastructure, file storage, and repository implementations.

The API layer exposes the application through REST endpoints and handles HTTP-specific concerns.

Main Features
Authentication
User registration
User login
JWT-based authentication
ASP.NET Core Identity
Protected authenticated operations
Channels
Create a channel
View channel information
Customize the user's channel
Display uploaded videos
Display subscriber information
Video Management
Upload videos
Upload custom thumbnails
Store uploaded media on the server
Video playback
Video metadata
Video descriptions
Channel ownership
Video listing and retrieval
Comments
Display comments for videos
Display comment authors
Display creation dates
Authenticated users can interact with the comment system
Likes
Like videos
Remove likes
Display like counts
Check whether the current user has liked a video
Subscriptions
Subscribe to channels
Unsubscribe from channels
Display subscriber counts
Retrieve videos from subscribed channels
Search
Search videos by query
Display matching videos through the React interface
Frontend Experience

The frontend was designed as a unified dark, cinematic media platform rather than a collection of default Material UI screens.

It includes:

Responsive navigation
Collapsible sidebar
Search interface
Video cards
Video player page
Channel pages
Subscription feed
Creator upload studio
Login and registration screens
Loading states
Empty states
Responsive layouts
Consistent typography, spacing, colors, and interactions
File Upload System

Videos and thumbnails are uploaded through multipart form requests.

The backend generates unique filenames and stores the media under:

wwwroot/uploads/videos
wwwroot/uploads/thumbnails

The API then exposes these files through ASP.NET Core static file middleware.

Uploaded media is excluded from Git through .gitignore, preventing large video files from being committed to the repository.

Development Approach

The project was developed around real application flows rather than static UI demonstrations.

For example:

Register
   ↓
Login
   ↓
Create Channel
   ↓
Upload Video
   ↓
Video appears on Channel
   ↓
Other users can watch
   ↓
Like / Comment / Subscribe
   ↓
Video appears in subscription feed

This allows the different parts of the application to interact through actual backend APIs and database relationships.

What the Project Demonstrates

CleanTube demonstrates experience with:

Designing a multi-layered .NET application
Applying Clean Architecture principles
Building REST APIs
CQRS with MediatR
Repository and Unit of Work patterns
Entity Framework Core and SQL Server
Authentication and authorization
JWT token handling
ASP.NET Core Identity
File uploads and static media serving
React component architecture
React Router navigation
Axios API integration
Responsive UI development
Building complete end-to-end application workflows

Overall, CleanTube is a full-stack project combining a structured ASP.NET Core backend with a modern React frontend, designed to demonstrate practical software architecture and end-to-end application development rather than simply reproduce a visual YouTube interface.
