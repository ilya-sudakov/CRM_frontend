FROM node:10-alpine as builder

COPY package.json package-lock.json ./

RUN npm install

WORKDIR /CRM_frontend

COPY . .

RUN npm run prod

FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /CRM_frontend/build /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]