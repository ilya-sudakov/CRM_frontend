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

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/* 

RUN chmod +x ./init-letsencrypt.sh

RUN sudo ./init-letsencrypt.sh

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./.nginx/app.conf /etc/nginx/sites-enabled/194-58-104-192.ovz.vps.regruhosting.ru


COPY --from=builder /CRM_frontend/src/main/resources/static/built /usr/share/nginx/html/
COPY --from=builder /CRM_frontend/src/main/resources/templates/firebase-messaging-sw.js /usr/share/nginx/html/
COPY --from=builder /CRM_frontend/src/main/resources/templates/manifest.json /usr/share/nginx/html/

EXPOSE 80
EXPOSE 443