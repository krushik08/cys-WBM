# Use the official Node.js 14 image as a base
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend directory to the container
COPY . .

# Build the React app for production
RUN npm run build

# Use nginx as the production server
FROM nginx:alpine

# Copy the built React app from the 'build' directory to nginx's html directory
FROM nginx:stable-alpine as serve
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx server when the container starts
CMD ["nginx", "-g", "daemon off;"]
