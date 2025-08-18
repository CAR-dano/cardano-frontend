# Car-Dano Frontend

A Next.js-powered web application for car inspection management with blockchain integration. This project aims to provide a robust and secure platform for digital vehicle inspections, ensuring data integrity and transparency through blockchain technology.

## Table of Contents

- [Car-Dano Frontend](#car-dano-frontend)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Key Features](#key-features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Development Server](#running-the-development-server)
  - [Project Structure](#project-structure)
  - [Deployment](#deployment)
  - [Contributing](#contributing)
  - [License](#license)

## Project Overview

Car-Dano is a comprehensive vehicle inspection platform designed to streamline the process of collecting, managing, and certifying car inspection data. It supports multi-stage review workflows, generates detailed inspection reports with visual indicators, and leverages blockchain for immutable certification of inspection results. The platform also includes robust user management with role-based access control.

## Key Features

- **Secure Authentication System**: Implements secure login and role-based access control for different user types (e.g., administrators, inspectors, reviewers).
- **Comprehensive Inspection Workflow**: Facilitates digital data entry, multi-stage review, and approval processes for vehicle inspections.
- **Admin Dashboard**: Provides an intuitive interface for administrators to manage inspections, users, and view analytics.
- **Detailed Report Generation**: Generates multi-page, detailed inspection reports with visual aids and comprehensive data points.
- **Blockchain Integration**: Ensures the integrity and immutability of inspection data by securely minting results on a blockchain.
- **Mobile Responsiveness**: Offers a user-friendly and responsive interface optimized for mobile devices, catering to inspectors on the go.
- **Data Management**: Tools for managing inspection data, including failed data and database interactions.

## Technologies Used

This project is built with a modern web development stack to ensure performance, scalability, and maintainability.

- **Next.js 14**: A React framework for building fast, scalable, and SEO-friendly web applications, utilizing the App Router for efficient routing and data fetching.
- **Redux Toolkit**: A powerful and efficient state management library for React applications, including persisted storage for user sessions and data.
- **TailwindCSS**: A utility-first CSS framework for rapidly building custom designs directly in your HTML.
- **Radix UI**: A collection of unstyled, accessible UI components for building high-quality design systems.
- **Docker**: For containerized deployment, ensuring consistent environments across development and production.
- **TypeScript**: For type-safe code, enhancing code quality and developer experience.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

- Node.js (v18.x or later recommended)
- npm or Yarn
- Docker (optional, for containerized deployment)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/CAR-dano/car-dano-frontend.git
    cd car-dano-frontend
    ```

2.  Install project dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. The application will automatically reload if you make changes to the source code.

## Project Structure

The project follows a well-organized structure to facilitate development and maintenance:

```
src/
├── app/                  # Next.js App Router pages and layouts
│   ├── auth/             # Authentication-related pages (login, etc.)
│   ├── dashboard/        # Admin dashboard pages and sub-sections (blockchain, branch, data, inspector, review, usermanagement)
│   ├── cek-validitas/    # Page for checking validity
│   ├── preview/          # Report preview pages (dynamic routes for specific IDs)
│   ├── result/           # Inspection results pages
│   ├── favicon.ico       # Favicon for the application
│   ├── globals.css       # Global CSS styles
│   ├── layout.tsx        # Root layout for the application
│   ├── not-found.tsx     # Custom 404 page
│   ├── page.tsx          # Home page
│   └── providers.tsx     # Context providers (e.g., ThemeContext)
├── components/           # Reusable UI components categorized by functionality
│   ├── Admin/            # Components specific to the admin interface
│   ├── Auth/             # Authentication-related components (AuthGuard, AuthInitializer)
│   ├── Button/           # Various button components
│   ├── Dashboard/        # Dashboard-specific charts and components
│   ├── Dialog/           # Reusable dialogs and modals
│   ├── EditReview/       # Components for editing and reviewing data
│   ├── Form/             # Form-related components (inputs, dropdowns, dialogs)
│   ├── layout/           # Layout components
│   ├── Preview/          # Preview-specific components
│   ├── Table/            # Table components
│   └── ui/               # Shadcn/ui components or similar
├── contexts/             # React Context API providers
├── hooks/                # Custom React hooks
├── lib/                  # Core application logic, Redux store, and services
│   ├── features/         # Redux slices for state management
│   ├── services/         # API service integrations
│   └── store/            # Redux store configuration
└── utils/                # Utility functions and helper modules
    ├── Admin.ts          # Admin-related utilities
    ├── Auth.ts           # Authentication utilities
    ├── Car.ts            # Car-related data structures and functions
    ├── exampledata.json  # Example data
    ├── InspectionResult.ts # Inspection result data structures
    └── redirectUtils.ts  # Redirection utilities
```

## Deployment

The application can be easily deployed using Docker.

1.  Build the Docker image:

    ```bash
    docker build -t car-dano-frontend .
    ```

2.  Run the Docker container:
    ```bash
    docker run -p 3000:3000 car-dano-frontend
    ```
    The application will be accessible at `http://localhost:3000`.

For production deployments, consider using `docker-compose` for orchestrating multiple services, as defined in `docker-compose.yml`.

## Contributing

We welcome contributions to the Car-Dano Frontend project! Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and ensure they adhere to the project's coding standards.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
