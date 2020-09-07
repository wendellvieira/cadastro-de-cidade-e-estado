FROM node:12.8-alpine

WORKDIR /node-app

ARG WEB_INT_PORT

ARG API_URL

RUN echo "VUE_APP_SERVER_URI=$API_URL" > .env

# CMD cat .env

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE $WEB_INT_PORT

CMD [ "npm", "run", "serve"]