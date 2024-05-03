FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 9005

ENV NODE_ENV=production

CMD ["node", "main.js"]