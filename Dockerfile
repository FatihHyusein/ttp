FROM node:10-alpine as clientBuilder
WORKDIR /app
COPY ./client .

RUN yarn install
RUN npm run build

FROM keymetrics/pm2:10-slim
WORKDIR /usr/src/app

RUN node -v

COPY ./server .
COPY --from=clientBuilder /app/build ./static/build
RUN npm install

CMD ["npm", "start"]
