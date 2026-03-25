import {
  BookOpen,
  Bug,
  FileCode,
  FileText,
  Globe,
  HelpCircle,
  Key,
  Lock,
  Mail,
  Package,
  RefreshCw,
  Shield,
  ShieldCheck,
  Terminal,
  UserCheck,
  Zap,
} from "lucide-react";
import type { ElementType } from "react";

export type DocItem    = { heading: string; body: string };
export type DocStep    = { text: string };

export type DocSection = {
  id: string;
  label: string;
  icon: ElementType;
  custom?: boolean;
  content: {
    eyebrow: string;
    title: string;
    intro: string;
    whatItDoes: string;
    steps: DocStep[];
    whyItMatters: string;
    highlights: string[];
    items: DocItem[];
  };
};

// ─── Sidebar groups ─────────────────────────────────────────────────────────
export const DOC_GROUPS: { label: string; ids: string[] }[] = [
  { label: "Getting Started", ids: ["overview", "installation", "quickstart"] },
  { label: "Authentication",  ids: ["local-auth", "google-oauth", "jwt-tokens", "refresh-tokens"] },
  { label: "Security",        ids: ["csrf", "rate-limiting", "rbac", "brute-force"] },
  { label: "Configuration",   ids: ["config-reference", "env-vars", "redis"] },
  { label: "Support",         ids: ["faq", "contact", "bugs"] },
  { label: "Legal",           ids: ["privacy", "terms"] },
];

export const DOCS: DocSection[] = [

  // ── 1. Overview ─────────────────────────────────────────────────────────────
  {
    id: "overview", label: "What is AuthPool", icon: BookOpen,
    content: {
      eyebrow: "Overview",
      title: "What is AuthPool",
      intro: "AuthPool is a plug-and-play Node.js authentication server. Call one function and you get Google OAuth, email/password login, JWT tokens, refresh rotation, CSRF protection, rate limiting, brute-force lockout, and RBAC — all production-ready.",
      whatItDoes: "Authentication is one of the most security-critical and tedious parts of any application. AuthPool solves it once: install the package, provide three environment variables, call startAuthServer(), and you have a complete auth backend. Every security layer is on by default — no configuration required to be production-safe.",
      steps: [
        { text: "npm install authpool" },
        { text: "Create a .env file with MONGO_URI, JWT_SECRET, and SESSION_SECRET." },
        { text: "Call startAuthServer() in your server entry point." },
        { text: "Your server is live at http://localhost:5000 with all routes registered." },
        { text: "Use /auth/google for OAuth, or POST /auth/register for email/password." },
        { text: "Attach the returned accessToken as Authorization: Bearer <token> on protected routes." },
        { text: "Call POST /auth/refresh when the token expires — the httpOnly cookie handles it automatically." },
      ],
      whyItMatters: "Most teams spend days wiring Passport, JWT, CSRF, sessions, and refresh tokens together — and still get something wrong. AuthPool is the result of solving all of those problems once, correctly.",
      highlights: [
        "One function call — startAuthServer() wires everything together",
        "Production-grade security — bcrypt, JWT rotation, CSRF, helmet, brute-force lockout",
        "MongoDB-backed — sessions and refresh tokens survive server restarts",
        "TypeScript types included — full autocomplete via types/index.d.ts",
        "Extensible — onReady hook lets you add custom routes after startup",
      ],
      items: [
        { heading: "Who it's for", body: "Node.js developers who need solid auth without building it from scratch — side projects, MVPs, or production apps." },
        { heading: "Requirements", body: "Node.js 18+, MongoDB (local or Atlas). Google OAuth and Redis are optional." },
        { heading: "License", body: "MIT — free forever. No paywalls, no tiers, no credit card." },
      ],
    },
  },

  // ── 2. Installation ─────────────────────────────────────────────────────────
  {
    id: "installation", label: "Installation", icon: Package,
    content: {
      eyebrow: "Getting Started",
      title: "Installation",
      intro: "Install the package, create a .env file, and you're done. No scaffolding, no generated config files, no peer dependencies to chase.",
      whatItDoes: "Running npm install authpool pulls in Express, Passport, Mongoose, jsonwebtoken, bcryptjs, helmet, csrf-csrf, express-rate-limit, connect-mongo, and ioredis. You don't install any of these separately — AuthPool manages them internally and exposes a single configuration surface.",
      steps: [
        { text: "npm install authpool" },
        { text: "Copy .env.example to .env in your project root." },
        { text: "Set MONGO_URI to your MongoDB connection string." },
        { text: "Set JWT_SECRET to a random string — 32+ characters recommended." },
        { text: "Set SESSION_SECRET to a different random string." },
        { text: "Run your server — look for 'MongoDB connected' and 'AuthPool running' in the logs." },
      ],
      whyItMatters: "A slow or complicated installation is a signal that the library will be painful to maintain. The path from npm install to a running server should take under two minutes.",
      highlights: [
        "Single install — all runtime dependencies are bundled",
        "Works with .env or inline config — pass values in code or via environment variables",
        "Node 18+ required — uses native crypto.randomUUID()",
        "MongoDB Atlas compatible — any valid connection string works",
      ],
      items: [
        { heading: "npm install authpool", body: "Installs the package and all runtime dependencies. No separate installs needed for Express, Passport, or jsonwebtoken." },
        { heading: ".env setup", body: "MONGO_URI, JWT_SECRET, and SESSION_SECRET are required. Google OAuth credentials are optional — omit them for local-auth-only setups." },
        { heading: "Local MongoDB", body: "Run a local instance with: docker run -d -p 27017:27017 mongo:7" },
      ],
    },
  },

  // ── 3. Quickstart ───────────────────────────────────────────────────────────
  {
    id: "quickstart", label: "Quickstart", icon: Zap,
    content: {
      eyebrow: "Getting Started",
      title: "Quickstart",
      intro: "The minimum viable AuthPool server is three lines. The full production configuration is about thirty. Both call the same function.",
      whatItDoes: "startAuthServer() is an async function that connects to MongoDB, registers Passport strategies, applies all security middleware, mounts all auth routes, and starts listening. It returns { app, server } so you have full access to the Express instance after startup. Anything you don't configure falls back to a safe default.",
      steps: [
        { text: "Create a server.js file and require authpool at the top." },
        { text: "Call startAuthServer() with mongoURI, jwtSecret, and sessionSecret." },
        { text: "Run: node server.js" },
        { text: "Test: GET http://localhost:5000/ should return { status: 'ok', package: 'authpool' }." },
        { text: "Register a user: POST /auth/register with { email, password, name } in the body." },
        { text: "Use the returned accessToken as Authorization: Bearer <token> on protected routes." },
        { text: "Add your own routes via the onReady callback." },
      ],
      whyItMatters: "The quickstart is the first thing a developer sees. If it takes more than five minutes to get a running server, most will move on. AuthPool's entire public API is one function with optional parameters.",
      highlights: [
        "startAuthServer() is the entire public API — one function, optional config",
        "Returns { app, server } for post-startup customisation",
        "All routes are live immediately — no manual route registration",
        "onReady hook gives you the fully configured Express app",
      ],
      items: [
        { heading: "Minimal server", body: "const { startAuthServer } = require('authpool');\nstartAuthServer({ mongoURI: '...', jwtSecret: '...', sessionSecret: '...' });" },
        { heading: "Custom routes", body: "Pass onReady: (app) => { app.get('/api/data', myMiddleware, handler) }. The Express app already has all AuthPool routes mounted." },
        { heading: "Changing the port", body: "Pass port: 3001 in the config object, or set PORT in your .env file. Defaults to 5000." },
      ],
    },
  },

  // ── 4. Local Auth ───────────────────────────────────────────────────────────
  {
    id: "local-auth", label: "Email & Password", icon: UserCheck,
    content: {
      eyebrow: "Authentication",
      title: "Email & Password Login",
      intro: "AuthPool ships a complete local auth flow out of the box. Registration, login, bcrypt hashing, and brute-force protection are all handled automatically.",
      whatItDoes: "POST /auth/register creates a new user with a bcrypt-hashed password (12 salt rounds) and returns an access token immediately. POST /auth/login verifies credentials using Passport's LocalStrategy. Passwords use select: false on the Mongoose schema so they are never returned by any query. The login route has per-IP brute-force tracking — after 5 failures the IP is locked for 15 minutes.",
      steps: [
        { text: "POST /auth/register with body: { email, password, name }" },
        { text: "Email and password must be present. Password must be at least 8 characters." },
        { text: "Returns 409 if the email is already registered." },
        { text: "On success: { accessToken, roles } is returned and a refreshToken cookie is set." },
        { text: "POST /auth/login with body: { email, password }" },
        { text: "Returns 401 on wrong credentials. The failure is counted toward brute-force tracking." },
        { text: "After 5 failures from the same IP, returns 429 with the remaining lock duration." },
      ],
      whyItMatters: "Getting password hashing, schema hygiene, and brute-force protection right requires attention to several easy-to-miss details. AuthPool handles all of them correctly by default.",
      highlights: [
        "bcrypt with 12 salt rounds — strong enough for production",
        "select: false on the password field — never accidentally leaked in API responses",
        "Minimum 8-character password enforced at registration",
        "Brute-force lockout after 5 failures per IP — 15-minute cooldown",
      ],
      items: [
        { heading: "POST /auth/register", body: "Body: { email, password, name }. Returns: { accessToken, roles }. Sets refreshToken cookie. 409 on duplicate email, 400 if password is under 8 characters." },
        { heading: "POST /auth/login", body: "Body: { email, password }. Returns: { accessToken, roles }. Sets refreshToken cookie. 401 on wrong credentials, 429 after 5 failures." },
        { heading: "Password storage", body: "Hashed with bcrypt (12 rounds) via a Mongoose pre-save hook. The raw password is never stored or logged." },
      ],
    },
  },

  // ── 5. Google OAuth ─────────────────────────────────────────────────────────
  {
    id: "google-oauth", label: "Google OAuth", icon: Globe,
    content: {
      eyebrow: "Authentication",
      title: "Google OAuth",
      intro: "Google OAuth is built in with Passport's GoogleStrategy. Point your users at /auth/google and the entire flow — redirect, callback, user upsert, token issue — is handled automatically.",
      whatItDoes: "Navigating to GET /auth/google redirects the user to Google's consent screen. After approval, Google redirects to /auth/google/callback where AuthPool upserts the user in MongoDB and issues an access token and refresh cookie. A transformUser hook lets you control exactly what fields get stored before the upsert.",
      steps: [
        { text: "Create a Google OAuth app at console.cloud.google.com." },
        { text: "Set the redirect URI to: http://localhost:5000/auth/google/callback" },
        { text: "Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL to .env." },
        { text: "Navigate to /auth/google or link your frontend button to that URL." },
        { text: "After consent, the callback returns { accessToken, roles } and sets the refresh cookie." },
      ],
      whyItMatters: "OAuth done wrong can leak user data or be vulnerable to CSRF. AuthPool uses Passport's battle-tested GoogleStrategy and adds a transformUser hook so you control exactly what lands in your database.",
      highlights: [
        "Zero setup beyond Client ID and Secret — strategy, callback, and upsert are pre-built",
        "User upsert — creates new users, updates returning users' profile data automatically",
        "transformUser hook — customise what fields are saved before the database write",
        "Works alongside local auth — one user can log in via Google or email/password",
      ],
      items: [
        { heading: "GET /auth/google", body: "Redirects to Google's consent screen. No frontend configuration needed beyond linking to this URL." },
        { heading: "GET /auth/google/callback", body: "Handles the OAuth callback. Returns { accessToken, roles } and sets the refresh cookie. Redirects to /auth/failure on error." },
        { heading: "transformUser hook", body: "Pass transformUser: (profile, provider) => ({...}) to startAuthServer(). Return an object with at least googleId or email to add custom fields before the DB write." },
      ],
    },
  },

  // ── 6. JWT Tokens ───────────────────────────────────────────────────────────
  {
    id: "jwt-tokens", label: "JWT Access Tokens", icon: Key,
    content: {
      eyebrow: "Authentication",
      title: "JWT Access Tokens",
      intro: "Access tokens expire in 15 minutes and carry enough payload for RBAC checks without a database round trip on every request.",
      whatItDoes: "Every successful login returns an access token in the JSON body. The payload includes id, name, profilePic, roles, and tokenVersion. The verifyJWT middleware validates the signature, checks tokenVersion against a 30-second Redis (or in-process) cache, and attaches the payload to req.user. If tokenVersion doesn't match the database, the token is rejected — this is how logout-all invalidation works.",
      steps: [
        { text: "After login, extract accessToken from the JSON response." },
        { text: "Store it in memory — React state, Zustand, or a module variable. Do not use localStorage." },
        { text: "Attach to every API call: Authorization: Bearer <accessToken>" },
        { text: "When you receive a 401 'Token is invalid or expired', the token has expired." },
        { text: "Call POST /auth/refresh silently — the cookie is sent automatically by the browser." },
        { text: "Swap the stored token with the new one from the refresh response, then retry." },
      ],
      whyItMatters: "The 15-minute expiry is a deliberate choice. A stolen access token has a short damage window. Paired with refresh token rotation, you get strong security without asking users to re-authenticate frequently.",
      highlights: [
        "15-minute expiry — limits the damage window from a stolen token",
        "tokenVersion field — one DB write invalidates all issued tokens for a user",
        "30-second user cache — reduces DB load without sacrificing correctness",
        "Roles in payload — no DB call needed for RBAC checks",
      ],
      items: [
        { heading: "Payload", body: "{ id, name, profilePic, tokenVersion, roles, iat, exp }. Accessible as req.user on any verifyJWT-protected route." },
        { heading: "GET /auth/protected", body: "Test route that returns { message, user } if the Bearer token is valid. Use it to verify your Authorization header is correct." },
        { heading: "GET /auth/me", body: "Returns the full MongoDB user record (password excluded). Useful for profile pages that need fields not in the JWT payload." },
      ],
    },
  },

  // ── 7. Refresh Tokens ───────────────────────────────────────────────────────
  {
    id: "refresh-tokens", label: "Refresh Tokens", icon: RefreshCw,
    content: {
      eyebrow: "Authentication",
      title: "Refresh Token Rotation",
      intro: "Refresh tokens live in httpOnly cookies and rotate on every use. A stolen token is dead the moment the legitimate client refreshes.",
      whatItDoes: "After login, a 30-day refresh token is signed, SHA-256 hashed, and stored in MongoDB. The raw token is sent as an httpOnly, SameSite=Strict cookie on the /auth path. When POST /auth/refresh is called, AuthPool verifies the signature, looks up the hash, checks it isn't revoked or expired, revokes it, and issues a fresh pair. GET /auth/logout revokes the current token and destroys the session. POST /auth/logout-all increments tokenVersion and revokes every refresh token for that user across all devices.",
      steps: [
        { text: "The refresh cookie is set automatically after login — no JavaScript handling needed." },
        { text: "When your access token expires, call POST /auth/refresh with credentials: 'include'." },
        { text: "The cookie is sent automatically. The response returns a new { accessToken }." },
        { text: "Swap the stored access token and retry the original request." },
        { text: "To log out: GET /auth/logout — revokes the token and clears the cookie." },
        { text: "To log out all devices: POST /auth/logout-all with a valid Bearer token." },
      ],
      whyItMatters: "Refresh token rotation means a stolen token has a one-time-use window. The moment the legitimate client refreshes, the stolen token is dead. This is a significant improvement over static long-lived tokens.",
      highlights: [
        "httpOnly cookie — JavaScript on the page cannot read or steal the token",
        "SHA-256 hashed in the database — useless if the database is breached",
        "Rotation on every use — replayed stolen tokens are immediately rejected",
        "MongoDB TTL index — expired tokens are automatically deleted",
      ],
      items: [
        { heading: "POST /auth/refresh", body: "No body needed — cookie is sent automatically by the browser. Returns { accessToken }. Old token is revoked and a new cookie is set." },
        { heading: "GET /auth/logout", body: "Revokes the current refresh token, destroys the session, and clears the cookie. No auth header required." },
        { heading: "POST /auth/logout-all", body: "Requires a valid Bearer token. Increments tokenVersion and revokes every refresh token for that user across all devices." },
      ],
    },
  },

  // ── 8. CSRF ─────────────────────────────────────────────────────────────────
  {
    id: "csrf", label: "CSRF Protection", icon: ShieldCheck,
    content: {
      eyebrow: "Security",
      title: "CSRF Protection",
      intro: "AuthPool uses the double-submit cookie pattern via csrf-csrf. Every state-changing request must include a CSRF token matching the value in the cookie. GET requests are always exempt.",
      whatItDoes: "When a GET request hits any /auth route, AuthPool signs a CSRF token, sets it as a cookie (authpool.csrf), and echoes it in the x-csrf-token response header. For POST requests, AuthPool reads the token from the x-csrf-token request header and verifies it against the cookie. If they don't match, the request is rejected with 403. GET /auth/csrf is a dedicated endpoint for fetching a fresh token explicitly.",
      steps: [
        { text: "Call GET /auth/csrf — the x-csrf-token response header contains your token." },
        { text: "Store the token in your frontend state." },
        { text: "Include it on every POST to /auth/*: add header x-csrf-token with the token value." },
        { text: "Include credentials: 'include' on your fetch calls so the cookie is sent." },
        { text: "On 403, fetch a fresh token from GET /auth/csrf and retry the request." },
        { text: "To disable for API-only backends: pass csrf: { enabled: false } to startAuthServer()." },
      ],
      whyItMatters: "CSRF attacks trick a logged-in user's browser into making requests using their cookies. The double-submit pattern stops this because an attacker's page can send the cookie but cannot read it to construct the matching header.",
      highlights: [
        "Double-submit cookie — no session dependency, works with any frontend",
        "Auto-issued on GETs — every GET response includes a fresh token in the header",
        "Configurable header name and cookie name",
        "csrf-csrf replaces the deprecated csurf package",
      ],
      items: [
        { heading: "GET /auth/csrf", body: "Returns { csrfToken, header } and sets the authpool.csrf cookie. Call this if you need a token before making your first GET to an /auth route." },
        { heading: "Disabling", body: "Pass csrf: { enabled: false } — safe for mobile APIs or fully server-rendered frontends." },
        { heading: "Custom names", body: "csrf: { headerName: 'x-my-token', cookieName: 'my.csrf' } — change both the header and cookie names." },
      ],
    },
  },

  // ── 9. Rate Limiting ────────────────────────────────────────────────────────
  {
    id: "rate-limiting", label: "Rate Limiting", icon: Shield,
    content: {
      eyebrow: "Security",
      title: "Rate Limiting & Slowdown",
      intro: "Three separate limiters with different thresholds. Credential routes are strict. Token routes are generous. Everything gets a global ceiling.",
      whatItDoes: "The global limiter (300 req/15 min) applies to every request. The credential limiter (30 req/min) applies only to /auth/login and /auth/register — the routes where an attacker would guess passwords. The token limiter (60 req/min) applies to /auth/refresh and /auth/logout-all. The slowdown middleware adds an artificial delay after 3 rapid credential requests. When Redis is configured, all limiters share state across multiple server instances.",
      steps: [
        { text: "Rate limiting is on by default — no configuration required." },
        { text: "To tighten login limits: pass rateLimit: { auth: { windowMs: 60000, max: 5 } } to startAuthServer()." },
        { text: "To loosen global limits: pass rateLimit: { global: { windowMs: 900000, max: 1000 } }." },
        { text: "To adjust slowdown: pass rateLimit: { slowdown: { delayAfter: 2, delayMs: 500 } }." },
        { text: "For multi-server deployments, configure Redis so all instances share the same counters." },
      ],
      whyItMatters: "A single rate limit on all routes either blocks legitimate users or leaves credential routes too open. Separate instances with different thresholds mean the strictness matches the actual risk level of each route.",
      highlights: [
        "Three separate limiter instances — global, credential, and token — tuned independently",
        "Slowdown middleware — adds artificial delay before the hard block fires",
        "Redis-backed in production — counters survive restarts and scale across processes",
        "Every threshold is configurable via startAuthServer()",
      ],
      items: [
        { heading: "Global", body: "Default: 300 requests per 15 minutes from any single IP. Applies to all routes. Override with rateLimit.global." },
        { heading: "Credential", body: "Default: 30 requests per minute. Applies to /auth/login and /auth/register only. Override with rateLimit.auth." },
        { heading: "Slowdown", body: "Default: delay after 3 rapid requests, 300ms each. Applies to credential routes only. Override with rateLimit.slowdown." },
      ],
    },
  },

  // ── 10. RBAC ────────────────────────────────────────────────────────────────
  {
    id: "rbac", label: "Role-Based Access", icon: Lock,
    content: {
      eyebrow: "Security",
      title: "Role-Based Access Control",
      intro: "Every user has a roles array embedded in their JWT. The authorizeRoles middleware checks it with zero database calls.",
      whatItDoes: "Users are created with roles: ['user'] by default. The JWT payload includes the roles array so authorizeRoles() can check permissions without any DB round trip — it is a pure in-memory Set lookup. Chain verifyJWT and authorizeRoles on any route you want to protect. The check is OR-based. To promote a user, update their roles in MongoDB and call POST /auth/logout-all to force a token refresh that picks up the new roles immediately.",
      steps: [
        { text: "Users are created with roles: ['user'] by default." },
        { text: "Require the middleware from the package source to use in your own routes." },
        { text: "Chain on a route: verifyJWT(JWT_SECRET), authorizeRoles(['admin'])" },
        { text: "To promote a user: update their roles array in MongoDB directly." },
        { text: "Call POST /auth/logout-all so the user's next token includes the updated roles." },
        { text: "A user without a required role receives: 403 Forbidden: insufficient role." },
      ],
      whyItMatters: "Role checks that hit the database on every request add latency to every authenticated route. Embedding roles in the JWT means the check is a zero-latency in-memory operation.",
      highlights: [
        "Roles in JWT payload — no DB call for role checks",
        "OR-based matching — a user with any required role is allowed",
        "Case-insensitive — 'Admin' and 'admin' are treated identically",
        "GET /auth/admin is a built-in example route to test against",
      ],
      items: [
        { heading: "authorizeRoles(['admin'])", body: "Allows users whose roles array contains 'admin'. Returns 403 Forbidden for everyone else." },
        { heading: "Multiple roles", body: "authorizeRoles(['admin', 'editor']) allows any user with at least one of those roles. It is an OR check, not AND." },
        { heading: "Updating roles", body: "Update roles in MongoDB directly. Call POST /auth/logout-all to force the new roles into the next token immediately." },
      ],
    },
  },

  // ── 11. Brute Force ─────────────────────────────────────────────────────────
  {
    id: "brute-force", label: "Brute-Force Protection", icon: Shield,
    content: {
      eyebrow: "Security",
      title: "Brute-Force Lockout",
      intro: "Failed login attempts are tracked per IP. After 5 failures the IP is locked for 15 minutes. Redis makes the counters survive restarts and work across multiple servers.",
      whatItDoes: "Every POST /auth/login that returns a 401 increments a counter keyed by IP address and email. After 5 failures the key is locked with a 15-minute TTL. Any login attempt during the lockout window returns a 429 with the remaining duration. A successful login clears the counter immediately. With Redis, counters persist across restarts and are shared between server instances. Without Redis, they live in an in-process Map — correct for a single process but reset on restart.",
      steps: [
        { text: "Brute-force protection is active by default on POST /auth/login — nothing to configure." },
        { text: "After 5 failed logins from the same IP, the next attempt returns 429." },
        { text: "The 429 response includes the remaining lock duration in minutes." },
        { text: "A successful login clears the failure counter immediately for that IP." },
        { text: "For production, configure Redis so counters persist across restarts." },
      ],
      whyItMatters: "Rate limiting counts total requests. Brute-force protection counts failures per target. A patient attacker who stays under the rate limit can still make thousands of attempts over time — per-IP failure tracking stops that.",
      highlights: [
        "Per-IP tracking — keyed by IP and email together for precision",
        "Redis-backed in production — counters survive restarts and work across instances",
        "Graceful in-memory fallback for single-server setups",
        "Successful login clears the counter — legitimate users are not permanently locked out",
      ],
      items: [
        { heading: "Threshold", body: "Default: 5 failed attempts triggers a 15-minute lockout for that IP." },
        { heading: "429 response", body: "{ error: 'Account temporarily locked. Try again in N minute(s).' }" },
        { heading: "Redis requirement", body: "Without Redis, counters are in-process and reset on restart. For production, pass redis: { url: 'redis://...' } to startAuthServer()." },
      ],
    },
  },

  // ── 12. Config Reference ────────────────────────────────────────────────────
  {
    id: "config-reference", label: "Config Reference", icon: FileCode,
    content: {
      eyebrow: "Configuration",
      title: "Full Config Reference",
      intro: "startAuthServer() accepts a single plain JavaScript object. Every field is optional when the matching environment variable is set. Code values always take precedence over env vars.",
      whatItDoes: "The configuration object is the single control surface for AuthPool. Pass MongoDB URI, OAuth credentials, JWT and session secrets, port, CORS settings, rate limit thresholds, CSRF options, Redis connection details, a user transform hook, and a post-startup callback. Anything you omit falls back to the corresponding environment variable. Any env var you don't set falls back to a safe default where one exists.",
      steps: [
        { text: "mongoURI — MongoDB connection string. Falls back to MONGO_URI env var." },
        { text: "jwtSecret — JWT signing secret. Falls back to JWT_SECRET. Use 32+ random characters." },
        { text: "sessionSecret — Session cookie secret. Falls back to SESSION_SECRET." },
        { text: "googleClientID, googleClientSecret, googleCallbackURL — optional. Omit for local-auth-only." },
        { text: "port — Listening port. Defaults to 5000. Falls back to PORT env var." },
        { text: "corsOptions: { origin, methods, allowedHeaders, credentials }" },
        { text: "rateLimit: { global, auth, slowdown } — each sub-key is merged with defaults." },
        { text: "csrf: { enabled, headerName, cookieName, secret }" },
        { text: "redis: { url, host, port, enabled }" },
        { text: "transformUser(profile, provider) — called before OAuth user upsert." },
        { text: "onReady(app, server) — called after the server starts. Add custom routes here." },
      ],
      whyItMatters: "A library that requires a config file, a CLI step, or more than one imported symbol is harder to use and upgrade. AuthPool's entire configuration is a plain JavaScript object passed to one function.",
      highlights: [
        "Single config object — no config files, no CLI, no separate init step",
        "Code over env — inline values override .env, useful for test environments",
        "Safe defaults — every optional field has a reasonable fallback",
        "Fully typed in types/index.d.ts — autocomplete in VS Code and any TypeScript project",
      ],
      items: [
        { heading: "Required", body: "mongoURI (or MONGO_URI), jwtSecret (or JWT_SECRET), sessionSecret (or SESSION_SECRET). Missing any causes a clean exit with a list of what's missing." },
        { heading: "CORS", body: "corsOptions: { origin: 'http://localhost:3000', methods: ['GET', 'POST'], credentials: true }. Origin defaults to '*' if not provided." },
        { heading: "Rate limit overrides", body: "rateLimit: { auth: { max: 5 } } — only the keys you provide are overridden, the rest keep their defaults." },
      ],
    },
  },

  // ── 13. Environment Variables ────────────────────────────────────────────────
  {
    id: "env-vars", label: "Environment Variables", icon: Terminal,
    content: {
      eyebrow: "Configuration",
      title: "Environment Variables",
      intro: "AuthPool calls dotenv internally. Drop a .env file in your project root and AuthPool picks it up — you don't need to call require('dotenv') yourself.",
      whatItDoes: "The following variables are read automatically: MONGO_URI, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, JWT_SECRET, SESSION_SECRET, PORT, CSRF_SECRET, REDIS_URL, REDIS_HOST, REDIS_PORT. If a required variable is missing and no code-level value was provided, AuthPool logs a clear error listing every missing key and exits — you find out at startup, not in production.",
      steps: [
        { text: "MONGO_URI — MongoDB connection string (required)." },
        { text: "JWT_SECRET — JWT signing secret, 32+ random characters (required)." },
        { text: "SESSION_SECRET — Session signing secret, different from JWT_SECRET (required)." },
        { text: "GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL — optional OAuth credentials." },
        { text: "PORT — Listening port (default 5000)." },
        { text: "CSRF_SECRET — Separate CSRF secret; defaults to SESSION_SECRET if not set." },
        { text: "REDIS_URL — Full Redis connection URL, e.g. redis://localhost:6379" },
      ],
      whyItMatters: "Hardcoding secrets in source code is one of the most common Node.js security mistakes. AuthPool makes it easy to use environment variables correctly and fails loudly at startup when required values are missing.",
      highlights: [
        "dotenv loaded internally — no extra code needed in your server file",
        "Missing required vars cause a clean exit with a descriptive error listing each key",
        "Code values override env vars — useful for test environments",
        "CSRF_SECRET can be separate from SESSION_SECRET for defence in depth",
      ],
      items: [
        { heading: "Required", body: "MONGO_URI, JWT_SECRET, SESSION_SECRET. Missing any causes AuthPool to exit at startup with a clear list of what's missing." },
        { heading: "Google OAuth", body: "GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL. Only required when googleCallbackURL is passed in config. Omit all three for local-auth-only setups." },
        { heading: "Optional", body: "PORT (default 5000), CSRF_SECRET (falls back to SESSION_SECRET), REDIS_URL or REDIS_HOST + REDIS_PORT." },
      ],
    },
  },

  // ── 14. Redis ───────────────────────────────────────────────────────────────
  {
    id: "redis", label: "Redis", icon: Zap,
    content: {
      eyebrow: "Configuration",
      title: "Redis Integration",
      intro: "Redis is optional. Without it everything works in-process. With it, rate limiters, brute-force counters, and the JWT user cache all scale across multiple servers and survive restarts.",
      whatItDoes: "When Redis is configured, AuthPool connects via ioredis at startup. Brute-force counters are stored in Redis with TTL. Rate limiters use Redis as their backing store. The JWT verification middleware caches user records (id, tokenVersion, roles) in Redis for 30 seconds, eliminating the database call on most authenticated requests. If Redis is unavailable, AuthPool logs a warning and falls back to in-memory — no crash.",
      steps: [
        { text: "Run Redis locally: docker run -d -p 6379:6379 redis:7" },
        { text: "Set REDIS_URL=redis://localhost:6379 in your .env file." },
        { text: "Or pass it in code: redis: { url: 'redis://localhost:6379' } to startAuthServer()." },
        { text: "Restart your server — look for 'Redis connected' in the startup logs." },
        { text: "For Upstash, Redis Cloud, or ElastiCache: use the full URL with credentials." },
        { text: "To disable Redis even when REDIS_URL is set: pass redis: { enabled: false }." },
      ],
      whyItMatters: "In-memory state is correct for a single server but breaks when you run multiple instances or restart the process. A brute-force counter that resets on restart is not a brute-force counter. Redis is the right answer for any multi-server production deployment.",
      highlights: [
        "Graceful fallback — no Redis means in-memory, not a crash",
        "ioredis client — battle-tested, supports clustering and Sentinel",
        "Three uses — rate limiting, brute-force tracking, and JWT user cache",
        "30-second JWT cache — one DB read per 30 seconds per user instead of one per request",
      ],
      items: [
        { heading: "Connecting", body: "Pass redis: { url: 'redis://...' } or set REDIS_URL in .env. AuthPool connects at startup and logs the result." },
        { heading: "Disabling", body: "Pass redis: { enabled: false } to force in-memory mode even when REDIS_URL is set. Useful for test environments." },
        { heading: "Cloud Redis", body: "Works with any ioredis-compatible provider including Upstash, Redis Cloud, and AWS ElastiCache. Include auth credentials in the connection URL." },
      ],
    },
  },

  // ── Support / Legal ──────────────────────────────────────────────────────────
  {
    id: "faq", label: "FAQ", icon: HelpCircle, custom: true,
    content: { eyebrow: "Support", title: "FAQ", intro: "", whatItDoes: "", steps: [], whyItMatters: "", highlights: [], items: [] },
  },
  {
    id: "contact", label: "Contact", icon: Mail, custom: true,
    content: { eyebrow: "Support", title: "Contact", intro: "", whatItDoes: "", steps: [], whyItMatters: "", highlights: [], items: [] },
  },
  {
    id: "bugs", label: "Report a Bug", icon: Bug, custom: true,
    content: { eyebrow: "Support", title: "Report a Bug", intro: "", whatItDoes: "", steps: [], whyItMatters: "", highlights: [], items: [] },
  },
  {
    id: "privacy", label: "Privacy Policy", icon: Shield, custom: true,
    content: { eyebrow: "Legal", title: "Privacy Policy", intro: "", whatItDoes: "", steps: [], whyItMatters: "", highlights: [], items: [] },
  },
  {
    id: "terms", label: "Terms of Service", icon: FileText, custom: true,
    content: { eyebrow: "Legal", title: "Terms of Service", intro: "", whatItDoes: "", steps: [], whyItMatters: "", highlights: [], items: [] },
  },
];