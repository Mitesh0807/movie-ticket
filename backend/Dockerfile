# Development stage
FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

CMD ["npm",'run', "dev"]

# Production stage
FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY package-lock.json ./

COPY --from=development /usr/local/bin/yarn /usr/local/bin/yarn

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]