# ---------- Stage 1: Build the Frontend ----------
FROM node:20-alpine AS frontend-builder

# We set WORKDIR to /app/frontend so that relative paths like "../backend/public"
# resolve cleanly within the container.
WORKDIR /app/frontend

COPY ./frontend/package*.json ./
RUN npm install

COPY ./frontend .

# The build will place files in /app/backend/public inside this build stage
RUN npm run build


# ---------- Stage 2: Setup the Backend ----------
FROM node:20-alpine

WORKDIR /app

COPY ./backend/package*.json ./
RUN npm install

# Copy the backend source
COPY ./backend/src ./src
COPY ./backend/server.js ./server.js

# Copy the freshly built frontend static files from Stage 1
COPY --from=frontend-builder /app/backend/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
