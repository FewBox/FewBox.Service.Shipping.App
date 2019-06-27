FROM nginx
WORKDIR /app
ADD . /usr/share/nginx/html
ADD nginx.conf /etc/nginx/nginx.conf