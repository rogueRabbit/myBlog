const userModel = require('../modules/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret.json');
const bcrypt = require('bcryptjs');
const util = require('util');
const verify = util.promisify(jwt.verify);
const statusCode = require('../util/status-code');

class UserController {

    static async create(ctx) {
        const user = ctx.request.body;
        ctx.response.status = 200;
        if (!ctx.session.userName) { // 检查登录态
            ctx.body = statusCode.ERROR_9999();
            return;
        }
        if (user.userName && user.password) {
            const existUser = await userModel.findUserByName(user.userName);

            if(existUser) {
                ctx.body = statusCode.ERROR_1003();
            } else {
                // 加密密码
                const salt = bcrypt.genSaltSync();
                const hash = bcrypt.hashSync(user.password, salt);
                user.password = hash;

                // 创建用户
                await userModel.create(user);
                const newUser = await userModel.findUserByName(user.userName);

                const userToken = {
                    userName: newUser.userName,
                    id: newUser.id
                }

                const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'});
                ctx.body = statusCode.SUCCESS_200('创建用户成功', token);
            }
        } else {
            ctx.body = statusCode.ERROR_1004();
        }

        
    }

    // 登录
    static async login(ctx) {
        const data = ctx.query;
        const user = await userModel.findUserByName(data.userName);
        ctx.response.status = 200;
        if (user) {
            if (bcrypt.compareSync(data.password, user.password)) {
                const userToken = {
                    userName: user.userName,
                    id: user.id
                }
                const token = jwt.sign(userToken, secret.sign, {expiresIn: '1h'});
                ctx.body = statusCode.SUCCESS_200('登录成功', {
                    id: user.id,
                    userName: user.userName,
                    token: token
                })
                // 将userName存储到session中
                ctx.session.userName = user.userName;
                console.log('--'+ctx.session.userName);
            } else {
                ctx.body = statusCode.ERROR_1002();
            }
        } else {
            ctx.body = statusCode.ERROR_1001();
        }
    }

    // 查询所有的用户
    static async queryUserList(ctx) {
        let userList = ctx.query;
        ctx.response.status = 200;
        if (!ctx.session.userName) { // 检查登录态
            ctx.body = statusCode.ERROR_9999();
            return;
        }
        if (userList) {
            const data = await userModel.queryUserlist();
            ctx.body = statusCode.SUCCESS_200('success', {
                list: data
            })
        } else {
            ctx.body = statusCode.ERROR_1005();
        }
    }

    // 删除用户
    static async deleteUser(ctx) {
        let data = ctx.query;
        let id = data.id;
        if (!ctx.session.userName) { // 检查登录态
            ctx.body = statusCode.ERROR_9999();
            return;
        }
        if (id) {
            const result = await userModel.delete(id);
            if (result) {
                ctx.body = statusCode.SUCCESS_200('success', {});
            } else {
                ctx.body = statusCode.ERROR_1006();
            }
        } else {
            ctx.body = statusCode.ERROR_1004();
        }
    }

    // 注销用户
    static async userLouout(ctx) {
        ctx.session.userName = null;
        ctx.response.status = 200;
        ctx.body = statusCode.SUCCESS_200('注销成功', {});
    }
}

module.exports = UserController;