FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
COPY dist/ ./dist/

RUN npm run create:env
RUN npm ci --only=production

EXPOSE 8080

CMD [ "npm", "run", "start:prod"]