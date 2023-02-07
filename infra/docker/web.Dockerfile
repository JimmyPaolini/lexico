# context must be one folder level up
FROM node:15-alpine AS installer
RUN apk add --update nodejs npm curl
WORKDIR /app
COPY web/package*.json .
RUN npm ci

FROM node:15-alpine AS builder
WORKDIR /app
COPY --from=installer /app/node_modules ./node_modules
COPY web .
RUN npm run build

FROM node:15-alpine AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app .
ENV NODE_ENV=production
EXPOSE 3000
CMD node server.js