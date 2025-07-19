# EduVibe - Student-Mentor Platform

A modern web application connecting students with mentors for personalized learning experiences.

## 🚀 Features

- **Authentication System**: Secure Supabase-based authentication with role-based access control
- **User Onboarding**: Streamlined onboarding flow for students and mentors
- **Protected Routes**: Automatic redirection based on user roles and authentication status
- **Responsive Design**: Modern UI built with Next.js and Tailwind CSS
- **Database Integration**: PostgreSQL with Prisma ORM for data management

## 🏗️ Architecture

### Authentication Flow

1. **Sign Up/In**: Users authenticate via Supabase (Google, GitHub, email)
2. **Role Assignment**: New users get `GUEST` role automatically
3. **Onboarding**: GUEST users are redirected to role selection
4. **Profile Setup**: Users complete role-specific onboarding forms
5. **Dashboard Access**: Users access role-appropriate dashboard

### User Roles

- **GUEST**: New users who need to complete onboarding
- **STUDENT**: Users seeking mentorship
- **MENTOR**: Users providing mentorship

### Route Protection

- **Public Routes**: Landing page, sign-in
- **Protected Routes**: Dashboard, onboarding (require authentication)
- **Role-Specific Routes**: Student/Mentor onboarding (require specific roles)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication callbacks
│   │   └── user/          # User management APIs
│   ├── dashboard/         # Protected dashboard
│   ├── onboarding/        # User onboarding flow
│   ├── sign-in/           # Authentication pages
│   └── unauthorized/      # Access denied page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── landing/          # Landing page components
│   ├── auth-provider.tsx # Authentication context
│   └── route-guard.tsx   # Route protection component
├── hooks/                # Custom React hooks
│   └── use-supabase-auth.ts # Authentication hook
├── lib/                  # Utility libraries
│   ├── supabase/         # Supabase client configuration
│   ├── prisma.ts         # Database client
│   ├── user.ts           # Server-side user management
│   └── user-utils.ts     # Client-side user utilities
└── prisma/               # Database schema and migrations
```

## 🔧 Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Supabase project

### Environment Variables

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_database_url
```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

## 🔐 Authentication Implementation

### Key Components

1. **AuthProvider** (`components/auth-provider.tsx`)
   - Provides authentication context throughout the app
   - Manages user session and profile state

2. **useSupabaseAuth Hook** (`hooks/use-supabase-auth.ts`)
   - Handles authentication state management
   - Provides role-based access control helpers
   - Manages user profile fetching with fallback

3. **RouteGuard** (`components/route-guard.tsx`)
   - Protects routes based on authentication and roles
   - Handles automatic redirections
   - Shows loading states during auth checks

4. **API Routes**
   - `/api/user/profile`: Fetch/create user profiles
   - `/api/user/role`: Update user roles
   - `/auth/callback`: Handle Supabase auth redirects

### Security Features

- **Server-side authentication**: Uses `getUser()` instead of `getSession()` for better security
- **Role-based access control**: Automatic redirection based on user roles
- **Protected API routes**: All user management APIs require authentication
- **Fallback profiles**: Graceful handling of database connection issues

## 🎯 Usage

### For Students

1. Sign up/in with Google or email
2. Complete onboarding form with academic details
3. Access student dashboard
4. Browse and book mentor sessions

### For Mentors

1. Sign up/in with Google or email
2. Complete onboarding form with professional details
3. Access mentor dashboard
4. Manage sessions and student interactions

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

Ensure all required environment variables are set in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
