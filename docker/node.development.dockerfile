FROM node:latest

LABEL author="Eslam Elkholy"

WORKDIR /var/www/blogs

COPY servers/blogs/package.json .

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["/bin/bash", "./docker/scripts/node.development.sh"]
