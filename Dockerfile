FROM node:latest
WORKDIR /api
COPY package.json ./
RUN npm install
COPY . ./
CMD npm run start:dev
EXPOSE 3000
