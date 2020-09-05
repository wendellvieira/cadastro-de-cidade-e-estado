FROM node:12.8-alpine

WORKDIR /node-app

ENV API_INT_PORT 5000

COPY ./package.json ./

RUN npm install

RUN npm i -g nodemon

COPY ./src ./src

COPY ./entry.js .

RUN npm run postinstall

EXPOSE ${API_INT_PORT}

CMD [ "nodemon", "-L", "--watch", ".", "entry.js" ]