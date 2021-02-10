server {
listen [::]:443 ssl ipv6only=on;
listen 443 ssl;

listen [::]:500 ssl ipv6only=on;
listen 500 ssl;

listen 80;

server_name 194-58-104-192.ovz.vps.regruhosting.ru;

root /root/crm.osfix.ru;
index index.html;

ssl_certificate /etc/letsencrypt/live/194-58-104-192.ovz.vps.regruhosting.ru/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/194-58-104-192.ovz.vps.regruhosting.ru/privkey.pem;
include /etc/letsencrypt/options-ssl-nginx.conf;
ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

access_log /var/log/nginx/crm.osfix.ru.access.log;
error_log /var/log/nginx/crm.osfix.ru.error.log;
location / {
  try_files $uri /index.html =404;
  include       /etc/nginx/mime.types;

	# kill cache
        add_header Last-Modified $date_gmt;
        add_header Cache-Control 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
        if_modified_since off;
        expires off;
        etag off;

}
}
