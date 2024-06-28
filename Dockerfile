FROM node:16.20.1-alpine

WORKDIR /code


COPY package.json /code/package.json

COPY package-lock.json /code/package-lock.json

COPY tsconfig.json /code/tsconfig.json 

RUN npm install -g npm@8.1.3
RUN npm install -g npm@10.8.1

RUN npm ci

COPY . /code

RUN npm run build

# EXPOSE 8000

# CMD [ "npm", "run", "dev" ]
CMD [ "node", "dist/server.js" ]

# # Use the official Node.js 16 image as the base image
# FROM node:16.20.1-alpine

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json files
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code to the container
# COPY . .

# # Build the TypeScript code
# RUN npm run build

# # Expose the port the app runs on
# EXPOSE 3000

# # Set the command to run the application
# CMD ["node", "dist/server.js"]