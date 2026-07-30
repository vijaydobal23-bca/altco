# ── Stage 1: Build the React frontend ────────────────────────────────────────
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Install frontend dependencies
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend source and build
# Output goes to ../backend/public (i.e. /app/backend/public)
COPY frontend/ ./
RUN npm run build

# ── Stage 2: Production backend ───────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app/backend

# Install backend dependencies
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Copy backend source
COPY backend/ ./

# Copy the built frontend from stage 1 into backend/public
COPY --from=frontend-builder /app/backend/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
