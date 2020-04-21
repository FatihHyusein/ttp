FROM node:12.16.2-alpine3.9 as clientBuilder
WORKDIR /app
COPY ./client .

RUN ls
RUN npm install
RUN npm run build

FROM node:12.16.2-alpine3.9
WORKDIR /usr/src/app

RUN node -v

COPY ./server .
COPY --from=clientBuilder /app/build ./static/build
RUN npm install

CMD ["npm", "start"]
