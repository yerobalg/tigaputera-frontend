# Use node as the base image
FROM node:20.3.1-alpine as build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files to the container
COPY . .

# Build the React application
RUN npm run build

# Install serve to serve the built React app
RUN npm install -g serve

# Expose port 3000 for Node.js server
EXPOSE 3000

# Start the Node.js server to serve the built React app
CMD ["serve", "-s", "build", "-l", "3000"]
