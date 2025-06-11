# Dockerfile

# ---- Build Stage ----
# Build the React app
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Production Stage ----
# Setup the final production container
FROM node:18-alpine

WORKDIR /app

# Copy the server and production dependencies from the build stage
COPY --from=build /app/build ./build
COPY --from=build /app/server.js ./
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./

# Install only the production dependencies needed for the server
RUN npm install --omit=dev

# Expose the port the server is running on
EXPOSE 8080

# The command to start the server
CMD ["node", "server.js"]