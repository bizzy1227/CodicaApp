FROM node:16.13.1-alpine3.14
WORKDIR /app
COPY . .
RUN yarn install
EXPOSE 4000
CMD PORT=4000 ; yarn typeorm migration:run ; yarn start:dev