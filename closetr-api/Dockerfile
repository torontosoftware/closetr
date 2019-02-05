# build from node image (version 8)
FROM node:8

# Create app directory
WORKDIR /app/

# Install app dependencies
COPY package*.json /app/

# install node modules
RUN npm install

# Bundle app course
COPY . /app/

# App connects internally to container port 8080
EXPOSE 8080

# Start the app in the container
CMD [ "npm", "start" ]
