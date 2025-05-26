# Car-Dano Frontend

A Next.js-powered web application for car inspection management with blockchain integration.

## Project Overview

Car-Dano is a comprehensive vehicle inspection platform that allows:

- Digital inspection data collection and management
- Multi-stage review workflows
- Detailed inspection reports with visual indicators
- Blockchain certification of inspection results
- User management with role-based access

## Key Features

- **Authentication System**: Secure login and role-based user management
- **Inspection Workflow**: Data entry, review, and approval process
- **Dashboard**: Admin interface for inspection management
- **Report Generation**: Detailed multi-page inspection reports
- **Blockchain Integration**: Secure minting of inspection data
- **Mobile Responsiveness**: Inspector-friendly mobile interface

## Technologies

- **Next.js 14**: React framework with App Router
- **Redux Toolkit**: State management with persisted storage
- **TailwindCSS**: Utility-first styling
- **Radix UI**: Accessible UI components
- **Docker**: Containerized deployment

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Admin dashboard
│   ├── inspector-app/    # Mobile inspector interface
│   ├── preview/          # Report preview
│   └── result/           # Inspection results
├── components/           # Reusable components
├── lib/                  # Redux store and features
│   └── features/         # Redux slices
└── utils/                # Helper functions
```

## Deployment

The application can be deployed using Docker:

```bash
docker build -t car-dano-frontend .
docker run -p 3000:3000 car-dano-frontend
```

## License

[License details here]
