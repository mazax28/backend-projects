# Use an official node runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app 

COPY package*.json .

# Install any needed packages specified in package.json
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "./src/server.js"]