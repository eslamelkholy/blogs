FROM node:latest

LABEL author="Eslam Elkholy"

WORKDIR /var/www/blogs

COPY servers/auth/package.json .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["/bin/bash", "./docker/scripts/node.development.sh"]
