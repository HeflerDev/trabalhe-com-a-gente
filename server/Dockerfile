FROM node:20-alpine AS base
#
# NOTE:
# This file uses multi-stage setup and follow 
# the best practices, using lower permission user.
# This is better not only for development, but also 
# for security
#
WORKDIR /usr/src/app/server
COPY ./server/package*.json ./
RUN npm install
COPY ./server ./
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

FROM node:20-alpine AS build
WORKDIR /usr/src/app/client
COPY ./client/package*.json ./
RUN npm ci 
COPY ./client ./
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /usr/src/app/server
COPY --from=base /usr/src/app/server ./
COPY --from=build /usr/src/app/client/dist ./src/public
CMD ["npm", "run", "prd"]

FROM node:20-alpine AS development
WORKDIR /usr/src/app/server
COPY --from=base /usr/src/app/server ./
CMD ["npm", "run", "dev"]
