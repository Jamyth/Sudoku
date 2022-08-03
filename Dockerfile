FROM nginx:alpine

COPY ./build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
RUN  ls /usr/share/nginx/html/index.html