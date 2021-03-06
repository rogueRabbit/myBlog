const label = require('./label');
const moment = require('moment');

module.exports =  function(sequelize, DataTypes){
    const article = sequelize.define('article', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        remark: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        content: {
            type: DataTypes.TEXT(),
            allowNull: false
        },
        relationLabel: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        sort: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        publishMan: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        publishTime: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD');
            }
        }
    })
    return article;
}
