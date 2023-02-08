FROM node:18-alpine AS installer
RUN apk add --update nodejs npm curl
WORKDIR /app
COPY package*.json .
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=installer /app/node_modules ./node_modules
COPY . .
RUN npm run tsc

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app .
ENV NODE_ENV=production
EXPOSE 3001
CMD npm run start