const db = require('../config/db');
const Sequelize = db.sequelize;
const User = Sequelize.import('../schema/user.js');

const moment = require('moment');

User.sync({force: false});

class UserModel {

    // 添加用户
    static async create(user) {
        let { userName, password, remarks } = user;
        let createTime = moment().format('YYYY-MM-DD HH:MM:SS');

        await User.create({
            userName,
            password,
            createTime,
            remarks,
        })

        return true;
    }

    // 查询用户列表
    static async queryUserlist() {
        return await User.findAll({
            attributes: ['id', 'userName', 'createTime', 'remarks']
        })
    }

    // 查询单个用户
    static async findUserById(id) {
        return await User.findByPk(id);
    }

    // 根据用户名查找用户
    static async findUserByName(userName) {
        return await User.findOne({
            where: {
                userName
            }
        })
    }

    // 删除用户
    static async delete(id) {
        await User.destroy({
            where: {
                id,
            }
        })
        return true
    }
}

module.exports = UserModel;