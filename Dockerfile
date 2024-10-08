# Use the official Node.js image as a base
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json from the frontend directory
COPY ../../frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code from the frontend directory
COPY ../../frontend/ ./

# Expose the port your app runs on
EXPOSE 3000  

# Start the application
CMD ["npm", "start"]

