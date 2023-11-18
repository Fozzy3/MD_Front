# Stage 1
FROM node:18-alpine as node
WORKDIR /app
COPY . .
RUN npm install
RUN chown -R node /app/node_modules
RUN npm install -g ts-node nodemon

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/front-modulo-web /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
