# context must be one folder level up
FROM node:14-alpine
RUN apk add npm

WORKDIR /code/web
COPY web/package*.json ./
RUN npm install

COPY . ../
RUN npm run build

EXPOSE 3000
CMD yarn start