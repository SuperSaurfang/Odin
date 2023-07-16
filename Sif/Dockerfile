FROM node:latest AS build
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build-minor


FROM nginx:alpine-perl
COPY nginx.conf /etc/nginx/nginx.conf
COPY cert/ /etc/nginx/cert
COPY --from=build /src/dist/ /var/www/html