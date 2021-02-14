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

FROM nginx:stable

ARG CERTBOT_EMAIL=info@domain.com

ARG DOMAIN_LIST

RUN apt-get update \
    && apt-get install -y cron certbot python-certbot-nginx bash wget \
    # && certbot certonly --standalone --test-cert --agree-tos -m "${CERTBOT_EMAIL}" -n -d ${DOMAIN_LIST} \
    && rm -rf /var/lib/apt/lists/* \
    && echo "@monthly certbot renew --nginx --dry-run >> /var/log/cron.log 2>&1" >/etc/cron.d/certbot-renew \
    && crontab /etc/cron.d/certbot-renew

VOLUME /etc/letsencrypt

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/* 

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./.nginx/conf.d/app.conf /etc/nginx/sites-enabled/194-58-104-192.ovz.vps.regruhosting.ru

COPY --from=builder /CRM_frontend/src/main/resources/static/built /usr/share/nginx/html/
COPY --from=builder /CRM_frontend/src/main/resources/templates/firebase-messaging-sw.js /usr/share/nginx/html/
COPY --from=builder /CRM_frontend/src/main/resources/templates/manifest.json /usr/share/nginx/html/

EXPOSE 80 443

CMD [ "sh", "-c", "cron && nginx -g 'daemon off;'" ]