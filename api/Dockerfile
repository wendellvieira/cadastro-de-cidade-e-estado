FROM node:12.8-alpine

WORKDIR /node-app

ARG API_SECRET
ENV API_SECRET $API_SECRET

ARG API_URL
ENV API_URL $API_URL

ARG API_INT_PORT
ENV API_INT_PORT $API_INT_PORT

ARG MONGO_URI
ENV MONGO_URI $MONGO_URI

ARG WEB_SECRET
ENV WEB_SECRET $WEB_SECRET

COPY ./package.json ./

RUN npm install

RUN npm i -g nodemon jest

COPY ./src ./src

COPY ./__tests__ ./__tests__

COPY ./entry.js .

COPY ./jest.config.js .

RUN npm run postinstall

EXPOSE $API_INT_PORT

CMD [ "nodemon", "-L", "--watch", ".", "entry.js", "--ignore", "__tests__"]