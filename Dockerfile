# Use node as the base image
FROM node:20.3.1-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json ./
COPY package-lock.json ./

# Install dependencies using npm
RUN npm install

# Copy all files to the container
COPY . .

# Build the React application
RUN npm run build

# Stage two, use nginx to serve the built React application
FROM nginx:alpine

# Copy the build output from the previous stage into nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for HTTP access
EXPOSE 80

# Default command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]
