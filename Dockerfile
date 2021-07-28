FROM node:14

WORKDIR /app

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install
# RUN npm ci --only=production

COPY . .

