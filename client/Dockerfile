FROM node:20-alpine AS base

WORKDIR /usr/src/app/client
COPY ./client/package*.json ./
RUN npm install
COPY ./client ./

FROM base AS development
WORKDIR /usr/src/app/client
CMD ["npm", "start"]
