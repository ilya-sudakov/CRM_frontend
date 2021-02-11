FROM node:10-alpine as builder

COPY package.json ./

RUN npm install

RUN npm rebuild node-sass

RUN npm install -g webpack

WORKDIR /CRM_frontend

COPY . .

RUN npm run mkdir-built

RUN npm run webpack:prod

FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /CRM_frontend/src/main/resources/static/built /var/www
COPY --from=builder /CRM_frontend/src/main/resources/static/built /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]