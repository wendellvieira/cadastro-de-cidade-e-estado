FROM node:12.8-alpine

WORKDIR /node-app

COPY ./package.json ./

RUN npm install

RUN npm i -g nodemon

RUN npm run postinstall

COPY . .

EXPOSE ${API_INT_PORT}

CMD nodemon -L --watch . entry.js