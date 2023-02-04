npx sequelize db:migrate
pm2 start ./src/config/pm2.config.js --name boilerplate --log /var/log/pm2/pm2.log --watch --no-daemon
