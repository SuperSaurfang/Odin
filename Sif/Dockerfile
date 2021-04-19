FROM node:latest AS build
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build-minor


FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/dist/ /var/www/html