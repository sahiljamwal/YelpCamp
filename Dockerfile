FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm i && npm prune --prod

COPY . .

EXPOSE 5000

CMD [ "npm","start" ]