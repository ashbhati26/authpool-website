export const SITE = {
  name: "AuthPool",
  tagline: "Authentication, solved.",
  description: "A plug-and-play Node.js authentication server. OAuth, JWT, CSRF, RBAC — production-ready in one function call.",
  npm: "https://www.npmjs.com/package/authpool",
  github: "https://github.com/ashbhati26/authpool",
  docs: "/docs",
  version: "2.0.0",
}

export const NAV_LINKS = [
  { label: "Overview",  href: "#overview" },
  { label: "Features",  href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Security",  href: "#security" },
  { label: "Docs",      href: "/docs" },
]

export const STATS = [
  { value: "1", label: "function call", suffix: "" },
  { value: "14", label: "security layers", suffix: "+" },
  { value: "30", label: "automated tests", suffix: "" },
  { value: "0", label: "config files", suffix: "" },
]

export const FEATURES = [
  {
    number: "01",
    title: "Google OAuth",
    description: "Passport.js GoogleStrategy pre-configured. Redirect, callback, upsert — fully automatic. Drop in your Client ID and go.",
    tag: "OAuth",
  },
  {
    number: "02",
    title: "Email & Password",
    description: "bcrypt hashing (12 rounds), per-IP brute-force lockout after 5 failures, Mongoose schema with select: false on the password field.",
    tag: "Local Auth",
  },
  {
    number: "03",
    title: "JWT + Refresh Rotation",
    description: "15-minute access tokens. 30-day refresh tokens in httpOnly cookies, SHA-256 hashed in MongoDB. Rotate on every use.",
    tag: "Tokens",
  },
  {
    number: "04",
    title: "CSRF Protection",
    description: "Double-submit cookie pattern via csrf-csrf. Auto-issued on every GET. No sessions required. csurf is gone.",
    tag: "Security",
  },
  {
    number: "05",
    title: "Rate Limiting",
    description: "Three separate limiters: global, credential, and token — each tuned to the risk level of the route. Redis-backed in production.",
    tag: "DDoS",
  },
  {
    number: "06",
    title: "Role-Based Access",
    description: "Roles embedded in the JWT payload. authorizeRoles(['admin']) is a pure in-memory check — no database call.",
    tag: "RBAC",
  },
]

export const SECURITY_LAYERS = [
  { label: "bcrypt (12 rounds)",         desc: "Password hashing" },
  { label: "JWT HS256",                  desc: "Token signing" },
  { label: "Refresh token rotation",     desc: "Replay prevention" },
  { label: "SHA-256 token hashing",      desc: "DB breach protection" },
  { label: "httpOnly cookies",           desc: "XSS prevention" },
  { label: "Double-submit CSRF",         desc: "CSRF prevention" },
  { label: "Brute-force lockout",        desc: "5 strikes, 15 min lock" },
  { label: "Rate limiting",              desc: "3 separate limiters" },
  { label: "helmet middleware",          desc: "Secure HTTP headers" },
  { label: "MongoDB session store",      desc: "Persistent sessions" },
  { label: "Mongoose strict: true",      desc: "Schema injection guard" },
  { label: "tokenVersion bump",          desc: "Logout-all invalidation" },
  { label: "Redis-backed counters",      desc: "Multi-server sync" },
  { label: "select: false password",     desc: "Never leaked in queries" },
]

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Install",
    code: "npm install authpool",
    description: "One package. All dependencies bundled.",
  },
  {
    step: "02",
    title: "Configure",
    code: `MONGO_URI=mongodb://...
JWT_SECRET=your-secret
SESSION_SECRET=your-secret`,
    description: "Three env vars. Everything else has safe defaults.",
  },
  {
    step: "03",
    title: "Start",
    code: `const { startAuthServer } = require("authpool")

startAuthServer({
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
})`,
    description: "One function. All 14 security layers active.",
  },
]

export const FOOTER_LINKS = [
  {
    group: "Package",
    links: [
      { label: "npm",      href: "https://www.npmjs.com/package/authpool" },
      { label: "GitHub",   href: "https://github.com/ashbhati26/authpool" },
      { label: "Changelog",href: "/changelog" },
    ],
  },
  {
    group: "Docs",
    links: [
      { label: "Overview",       href: "/docs#overview" },
      { label: "Authentication", href: "/docs#local-auth" },
      { label: "Security",       href: "/docs#csrf" },
      { label: "Configuration",  href: "/docs#config-reference" },
    ],
  },
  {
    group: "Legal",
    links: [
      { label: "MIT License", href: "/license" },
      { label: "Privacy",     href: "/privacy" },
    ],
  },
]