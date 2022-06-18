# context must be one folder level up
FROM node:15-alpine
RUN apk add --update nodejs npm curl

WORKDIR /Lexico
COPY package*.json ./
RUN npm ci

WORKDIR /Lexico/web
COPY web/package*.json ./
RUN npm ci

COPY . ../
RUN NEXT_ENV=build npm run build

EXPOSE 3000
HEALTHCHECK CMD curl --fail http://web:3000/ || exit 1
ENV NODE_ENV=production
CMD npm run start