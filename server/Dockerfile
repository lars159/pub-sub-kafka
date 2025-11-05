# Build stage
FROM node:18 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Production stage
FROM node:18

WORKDIR /app
RUN apt-get update && apt-get install -y net-tools && rm -rf /var/lib/apt/lists/*
# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 8000

# Start the application
CMD ["npm", "start"]