FROM node:14-alpine
WORKDIR /code

COPY package*.json ./
COPY tsconfig.json ./

RUN apk add npm
RUN npm install

COPY . .
RUN yarn tsc
RUN yarn build

EXPOSE 3000
CMD yarn start