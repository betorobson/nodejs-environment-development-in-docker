FROM node:18-alpine

# WORKDIR /usr/src/app

# ADD package*.json ./
# RUN npm install

COPY . .

# RUN npm t

CMD [ "npm", "start" ]
