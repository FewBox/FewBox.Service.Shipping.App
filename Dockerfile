FROM nginx
WORKDIR /usr/share/nginx/html
ADD . /usr/share/nginx/html
ADD nginx.conf /etc/nginx/nginx.conf