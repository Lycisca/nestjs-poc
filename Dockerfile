FROM node:10.12.0-slim

ENV NODE_ENV=production

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci --only=production
COPY . .
RUN npm run prestart:prod
CMD ["npm", "run", "start:prod"]
