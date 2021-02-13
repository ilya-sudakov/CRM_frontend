FROM node:10-alpine as builder

COPY package.json ./

RUN npm install

RUN npm rebuild node-sass

RUN npm install -g webpack

RUN npm install -g jest

WORKDIR /CRM_frontend

COPY . .

RUN npm run mkdir-built

RUN npm run test -- --silent

RUN npm run webpack:prod

FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/app.conf /etc/nginx/sites-enabled/194-58-104-192.ovz.vps.regruhosting.ru

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /CRM_frontend/src/main/resources/static/built /root/crm.osfix.ru

EXPOSE 80