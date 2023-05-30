FROM node:16 AS modules

WORKDIR /app

COPY ./package*.json ./
RUN npm i \
    && yarn install

FROM modules AS app

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["yarn","start"]