const moment = require('moment');


module.exports = function(sequelize, DataTypes) {
    return sequelize.define('label', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        labelName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        sort: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        createTime: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        createMan: {
            type: DataTypes.STRING(50),
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
}