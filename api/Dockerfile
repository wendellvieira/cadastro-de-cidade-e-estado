FROM node:12.8-alpine

WORKDIR /node-app

ENV API_INT_PORT 5000

ENV MONGO_URI ""

COPY ./package.json ./

RUN npm install

RUN npm i -g nodemon jest

COPY ./src ./src

COPY ./__tests__ ./__tests__

COPY ./entry.js .

COPY ./jest.config.js .

RUN npm run postinstall

EXPOSE ${API_INT_PORT}

CMD [ "nodemon", "-L", "--watch", ".", "entry.js", "--ignore", "__tests__"]