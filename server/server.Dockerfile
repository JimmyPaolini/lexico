# context must be one folder level up
FROM node:15-alpine
RUN apk add --update nodejs npm curl

WORKDIR /code
COPY package*.json ./
RUN npm install

WORKDIR /code/server
COPY server/package*.json ./
RUN npm install

COPY . ../
RUN npm run tsc

EXPOSE 3001
HEALTHCHECK CMD curl --fail http://localhost:3001/ || exit 1
CMD npm run start