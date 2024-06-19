# pull official base image
FROM node:20.14

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build"]
