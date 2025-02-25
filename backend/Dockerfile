FROM node:18.20.4

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install
COPY . .

EXPOSE 3001
CMD [ "node", "index.js" ]
