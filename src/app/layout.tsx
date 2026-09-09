export const metadata = {
  title: "SaaS Launch Kit",
  description: "Ship your SaaS in days, not months.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
