FROM node:alpine

WORKDIR /usr/app

COPY backend/package.json ./

RUN yarn install

COPY backend .

EXPOSE 8080

CMD ["yarn", "dev"]