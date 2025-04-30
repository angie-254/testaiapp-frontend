# Campaign Tracker Frontend

> **Project Context**: This is a demonstration application developed as part of a technical interview assessment, completed within a 24-hour timeframe.While it implements the core functionalities specified in the interview requirements, it is not intended to represent a full production application. The focus was on demonstrating technical capabilities, code quality, and implementation of specific features as per the interview instructions.

## Live Demo

**Live Application**: [https://testaiapp-frontend.vercel.app](https://testaiapp-frontend.vercel.app)

> **⚠️ Important**: The backend is hosted on a free tier service that goes to sleep after inactivity. When you first access the application, **please wait for about 2 minutes** while the backend server "wakes up". After this initial wait, the application will function normally and respond quickly to all requests.

> **Note**: The application is fully functional for the requested features. You can explore the campaigns and test the submission functionality right away!

## Features

- Campaign List View: Browse all active campaigns with deadlines and status
- Campaign Details View: View campaign requirements and submit content
- Submission Tracking: Monitor submission status and history
- Responsive Design: Mobile-friendly user interface
- Real-time Status Updates: Instant feedback on submission status

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui Components
- React Query (TanStack Query)
- Axios

## Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd campaign-tracker/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=https://testaiapp-backend.onrender.com
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── app/                    # Next.js app router pages
├── components/            # Reusable UI components
├── lib/                   # Utility functions and hooks
│   ├── hooks/            # Custom React hooks
│   └── axios.ts          # API client configuration
├── public/               # Static assets
└── styles/              # Global styles
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Deployment

The frontend is deployed on Vercel. Any push to the main branch will trigger automatic deployment.
