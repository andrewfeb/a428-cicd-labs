FROM node:lts-buster-slim

RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

EXPOSE 8080
CMD ["http-server", "build"]