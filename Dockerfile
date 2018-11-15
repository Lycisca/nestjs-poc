FROM node:10.12.0-alpine as builder

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci
COPY . .
RUN npm run build:prod

# ======== Multi stage ==========
FROM node:10.12.0-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/schema.graphql /app/schema.graphql
COPY --from=builder /app/dist /app/dist

CMD ["npm", "run", "start:prod"]
