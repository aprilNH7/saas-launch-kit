export interface TeamInvite {
  id: string
  email: string
  role: 'ADMIN' | 'MEMBER' | 'VIEWER'
  status: 'PENDING' | 'ACCEPTED' | 'EXPIRED' | 'REVOKED'
  expiresAt: Date
  createdAt: Date
}
