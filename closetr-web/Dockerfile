# Build off NGINX image (alphine version makes it lightweight)
FROM nginx:alpine

# Copy config file
COPY nginx.conf /etc/nginx/nginx.conf

# Set working directory and copy PROD build of the angular project
WORKDIR /usr/share/nginx/html/
COPY dist/ /usr/share/nginx/html/
