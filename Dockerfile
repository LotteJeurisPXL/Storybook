# Stage 1 – install & build
FROM node:24.13-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2 – serve the built output
FROM node:24.13-bookworm-slim AS runner

# Install a lightweight static server
RUN npm install -g serve@14.2.4

WORKDIR /app
COPY --from=builder /app/dist ./dist

EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]