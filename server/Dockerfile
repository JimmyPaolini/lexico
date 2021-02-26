FROM node:14

WORKDIR /server

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run tsc

EXPOSE 3001

CMD yarn start