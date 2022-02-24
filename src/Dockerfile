FROM node:14

RUN mkdir -p /src/spp
WORKDIR /src/app
COPY packege*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node","src/app.js" ]
