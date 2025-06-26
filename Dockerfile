FROM node:23-alpine

WORKDIR /app

RUN npm install -g mint

CMD ["mint", "dev"]