# context must be one folder level up
FROM node:15-alpine
RUN apk add --update nodejs npm curl

WORKDIR /code
COPY package*.json ./
RUN npm install

WORKDIR /code/web
COPY web/package*.json ./
RUN npm install

COPY . ../
RUN npm run build

EXPOSE 3000
HEALTHCHECK CMD curl --fail http://localhost:3000/ || exit 1
CMD npm run start