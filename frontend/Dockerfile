# Development stage
FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]