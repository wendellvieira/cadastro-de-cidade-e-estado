FROM node:12.8-alpine

WORKDIR /node-app

ENV WEB_INT_PORT 5000

ENV API_URI ""

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE ${WEB_INT_PORT}

CMD [ "npm", "run", "serve"]