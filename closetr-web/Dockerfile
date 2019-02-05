# build from node image (version 8)
FROM node:8

# Create app directory
RUN mkdir /app/
WORKDIR /app/

# add .bin in node modules folder to path
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
COPY package*.json /app/

# install node modules and angular
RUN npm install
RUN npm install -g @angular/cli@7.0.4

# copy files to container
COPY . /app/

# App connects internally to container port 4200
EXPOSE 4200

# Start the app in the container
CMD [ "npm", "start" ]
