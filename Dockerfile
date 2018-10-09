FROM node:8
WORKDIR /app
COPY . /app
RUN npm install && npm run client-install
ENV NODE_ENV=docker
CMD node server.js
EXPOSE 3000