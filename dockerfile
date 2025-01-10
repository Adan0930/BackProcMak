FROM node:22

WORKDIR /Backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm","run","dev"]