export const API_ROUTES = {
  auth: { login: '/api/auth/login', signup: '/api/auth/signup', me: '/api/auth/me' },
  billing: { checkout: '/api/billing/checkout', portal: '/api/billing/portal' },
  teams: { list: '/api/teams', invite: '/api/teams/invite' },
  users: { profile: '/api/users/profile' },
} as const
