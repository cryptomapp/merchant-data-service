# Use an official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /merchant-data-service

# Copy package.json and package-lock.json to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

CMD ["yarn", "start"]

EXPOSE 3000
