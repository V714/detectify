FROM node:16

WORKDIR /app
COPY . .

RUN npm install

RUN npm run build --prod

FROM nginx:1.23.4-alpine-slim
COPY --from=0 /app/dist/detectify /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
