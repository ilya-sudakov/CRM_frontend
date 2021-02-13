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

# add www-data user
# RUN adduser -u 1010 -D -S -G www-data www-data && \
#     touch /var/run/nginx.pid && \
#     chown -R www-data:www-data /var/run/nginx.pid && \
#     chown -R www-data:www-data /var/cache/nginx

# USER www-data

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./.nginx/app.conf /etc/nginx/sites-enabled/194-58-104-192.ovz.vps.regruhosting.ru

COPY --from=builder /CRM_frontend/src/main/resources/static/built /root/crm.osfix.ru
COPY --from=builder /CRM_frontend/src/main/resources/static/built /usr/share/nginx/html/

EXPOSE 80