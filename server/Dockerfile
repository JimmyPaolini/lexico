# context must be one folder level up
FROM node:14-alpine
RUN apk add npm

WORKDIR /code/server
COPY server/package*.json ./
RUN npm install

COPY . ../
RUN npm run tsc

EXPOSE 3001
CMD yarn start