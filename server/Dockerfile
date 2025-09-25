FROM node:20-alpine AS base

WORKDIR /usr/src/app/server
COPY ./server/package*.json ./
RUN npm install
COPY ./server ./
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

FROM node:20-alpine AS production
WORKDIR /usr/src/app/server
COPY --from=base /usr/src/app/server ./
CMD ["node", "./src/index.js"]

FROM node:20-alpine AS development
WORKDIR /usr/src/app/server
COPY --from=base /usr/src/app/server ./
CMD ["npm", "run", "dev"]
