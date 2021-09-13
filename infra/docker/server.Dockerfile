# context must be one folder level up
FROM node:15-alpine
RUN apk add --update nodejs npm curl

WORKDIR /Lexico
COPY package*.json ./
RUN npm install

WORKDIR /Lexico/server
COPY server/package*.json ./
RUN npm install

COPY . ../
RUN npm run tsc

EXPOSE 3001
HEALTHCHECK CMD curl --fail http://server:3001/health || exit 1
ENV NODE_ENV=production
CMD npm run start