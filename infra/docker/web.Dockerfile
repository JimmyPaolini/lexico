FROM node:15-alpine AS installer
RUN apk add --update nodejs npm curl
WORKDIR /app
COPY package*.json .
RUN npm ci

FROM node:15-alpine AS builder
WORKDIR /app
COPY --from=installer /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:15-alpine AS runner
WORKDIR /app
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
COPY --from=builder /app .
ENV NODE_ENV=production
EXPOSE 3000
CMD npm run start