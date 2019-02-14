const Sequelize = require('sequelize');

const sequelize = new Sequelize('myblog', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    dialectOptions: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire:30000,
        idle: 10000
    },
    timezone: '+08:00'
});

module.exports = {
    sequelize
}