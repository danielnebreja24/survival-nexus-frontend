# Step 1: Use an official Node.js image as the base
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Step 4: Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Build the Next.js application
RUN yarn build

# Step 7: Expose the port that Next.js will run on
EXPOSE 3000

# Step 8: Define the command to run the application
CMD ["yarn", "start"]
