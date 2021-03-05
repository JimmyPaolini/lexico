# context must be one folder level up
FROM node:15-alpine
RUN apk add --update nodejs npm

WORKDIR /code
COPY package*.json ./
RUN npm install

WORKDIR /code/web
COPY web/package*.json ./
RUN npm install

COPY . ../
RUN npm run build

EXPOSE 3000
CMD npm run start