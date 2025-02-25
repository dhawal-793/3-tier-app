# -------------- With Nginx ------------------
FROM node:18.20.4 AS stage1
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
ARG VITE_HOST
ENV VITE_HOST=${VITE_HOST}
EXPOSE 80
RUN npm run build

FROM nginx
COPY --from=stage1 /app/dist  /usr/share/nginx/html
COPY --from=stage1 /app/default.conf  /etc/nginx/conf.d/default.conf



# -------------- Without Nginx ------------------ [Use Any one of the style prefer nginx for optimized image]
# FROM node:18.20.4 AS stage1
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . .
# EXPOSE 80
# CMD [ "npm","run","dev" ]
