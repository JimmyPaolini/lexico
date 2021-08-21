# context must be one folder level up
FROM node:15-alpine
RUN apk add --update nodejs npm curl

WORKDIR /Lexico
COPY package*.json ./
RUN npm install

WORKDIR /Lexico/web
COPY web/package*.json ./
RUN npm install

ARG FULL_BUILD
COPY . ../
RUN NEXT_ENV=build FULL_BUILD=$FULL_BUILD npm run build

EXPOSE 3000
HEALTHCHECK CMD curl --fail http://web:3000/ || exit 1
CMD NODE_ENV=production npm run start