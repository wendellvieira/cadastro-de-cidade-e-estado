FROM node:12.8-alpine

WORKDIR /node-app

ENV WEB_INT_PORT 8080

ENV API_URL 'http://localhost:5000'

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE $WEB_INT_PORT

CMD [ "npm", "run", "serve"]