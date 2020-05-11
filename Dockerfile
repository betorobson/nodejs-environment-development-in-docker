FROM node:12-alpine

WORKDIR /usr/src/app

ADD package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]
