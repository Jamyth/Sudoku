FROM nginx:alpine

RUN  cat ./build/index.html
COPY ./build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf