FROM nginx:alpine
COPY ./www /usr/share/nginx/html
COPY ./nginx-angular.conf /etc/nginx/conf.d/default.conf
