import type { Metadata } from "next"
import { ReactLenis } from 'lenis/react'
import "./globals.css"

export const metadata: Metadata = {
  title: "AuthPool — Authentication, perfected.",
  description:
    "A plug-and-play Node.js authentication server. OAuth, JWT, CSRF, RBAC, rate limiting — production-ready in one function call.",
  keywords: ["authentication", "oauth", "jwt", "nodejs", "passport", "mongodb", "npm"],
  authors: [{ name: "Ashish Bhati", url: "https://github.com/ashbhati26" }],
  openGraph: {
    title: "AuthPool — Authentication, perfected.",
    description: "One function. OAuth, JWT, CSRF, RBAC. Production-ready auth for Node.js.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body>
        <ReactLenis root />
        {children}</body>
    </html>
  )
}