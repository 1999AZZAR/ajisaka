# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy the nested src directory contents
COPY src/package.json src/package-lock.json ./
RUN npm ci

# Copy the rest of the application
COPY src/ .
RUN npm run build

# Stage 2: Serve the static files using Nginx
FROM nginx:alpine

# Copy the static assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
