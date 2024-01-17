FROM node:lts-buster-slim

RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

CMD [ "http-server", "build" ]