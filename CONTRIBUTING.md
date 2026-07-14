# Contributing to SaaS Launch Kit

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

1. **Fork & clone** the repository
2. **Install dependencies**: `npm install`
3. **Set up environment**: Copy `.env.example` to `.env.local` and fill in values
4. **Set up database**: `npx prisma db push && npm run db:seed`
5. **Start dev server**: `npm run dev`

## Project Structure

```
src/
├── app/                  # Next.js App Router pages & API routes
│   ├── (auth)/           # Auth pages (login, signup)
│   ├── (dashboard)/      # Protected dashboard pages
│   └── api/              # API endpoints
├── components/           # React components
│   ├── ui/               # Base UI primitives
│   ├── dashboard/        # Dashboard-specific components
│   ├── auth/             # Auth forms
│   ├── billing/          # Billing & pricing
│   └── charts/           # Data visualization
├── lib/                  # Core utilities & configs
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Prisma client
│   ├── stripe.ts         # Stripe configuration
│   ├── email.ts          # Email templates
│   └── utils.ts          # Shared utilities
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── config/               # App configuration
```

## Guidelines

- **TypeScript**: All code must be typed. No `any` unless absolutely necessary.
- **Components**: Use functional components with hooks.
- **Styling**: Use Tailwind CSS utility classes. Follow existing patterns.
- **API Routes**: Use Zod for request validation. Return consistent error shapes.
- **Database**: All schema changes go through Prisma migrations.
- **Tests**: Write tests for new features. Run `npm test` before submitting.

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes with clear commit messages
3. Run `npm run lint && npm run type-check && npm test`
4. Push and open a PR against `main`
5. Fill out the PR template with description and screenshots

## Code of Conduct

Be respectful and constructive. We're all here to build great software.
