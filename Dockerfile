# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and build the project
COPY . .
RUN npm run build

# Stage 2: Serve the static files using Nginx
FROM nginx:alpine

# Copy the static assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
