FROM node:14-alpine

RUN mkdir /app

COPY index.js /app
COPY package.json /app

WORKDIR /app

RUN npm install

EXPOSE 8080

CMD ["node", "index.js"]