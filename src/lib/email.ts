import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@yourdomain.com"
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "SaaS Launch Kit"

export async function sendTeamInviteEmail(params: {
  to: string
  inviterName: string
  teamName: string
  inviteLink: string
}) {
  return resend.emails.send({
    from: `${APP_NAME} <${FROM_EMAIL}>`,
    to: params.to,
    subject: `You've been invited to join ${params.teamName}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #111; margin-bottom: 8px;">Join ${params.teamName}</h2>
        <p style="color: #666; line-height: 1.6;">
          ${params.inviterName} has invited you to join <strong>${params.teamName}</strong> on ${APP_NAME}.
        </p>
        <a href="${params.inviteLink}" 
           style="display: inline-block; background: #111; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; margin-top: 16px; font-weight: 500;">
          Accept Invitation
        </a>
        <p style="color: #999; font-size: 13px; margin-top: 32px;">
          This invitation will expire in 7 days. If you didn't expect this, you can ignore this email.
        </p>
      </div>
    `,
  })
}

export async function sendWelcomeEmail(params: { to: string; name: string }) {
  return resend.emails.send({
    from: `${APP_NAME} <${FROM_EMAIL}>`,
    to: params.to,
    subject: `Welcome to ${APP_NAME}!`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #111;">Welcome, ${params.name}! 🎉</h2>
        <p style="color: #666; line-height: 1.6;">
          Your account has been created. Here's how to get started:
        </p>
        <ol style="color: #444; line-height: 2;">
          <li>Create or join a team</li>
          <li>Invite your teammates</li>
          <li>Start building</li>
        </ol>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/overview" 
           style="display: inline-block; background: #111; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; margin-top: 16px; font-weight: 500;">
          Go to Dashboard
        </a>
      </div>
    `,
  })
}

export async function sendPasswordResetEmail(params: { to: string; resetLink: string }) {
  return resend.emails.send({
    from: `${APP_NAME} <${FROM_EMAIL}>`,
    to: params.to,
    subject: "Reset your password",
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #111;">Reset Your Password</h2>
        <p style="color: #666; line-height: 1.6;">
          Click the button below to reset your password. This link expires in 1 hour.
        </p>
        <a href="${params.resetLink}" 
           style="display: inline-block; background: #111; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; margin-top: 16px; font-weight: 500;">
          Reset Password
        </a>
        <p style="color: #999; font-size: 13px; margin-top: 32px;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  })
}
