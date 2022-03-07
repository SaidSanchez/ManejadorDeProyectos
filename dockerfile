FROM node
MAINTAINER Alan Sanchez Andres Romero
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD npm start 
