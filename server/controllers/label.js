const labelModel = require('../modules/label');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret.json');
const bcrypt = require('bcryptjs');
const util = require('util');
const verify = util.promisify(jwt.verify);
const statusCode = require('../util/status-code');

class LabelController {

    // 创建或修改标签
    static async addOrModifyLabel(ctx) {
        const label = ctx.request.body;
        ctx.response.status = 200;
        if (!ctx.session.userName) { // 检查登录态
            ctx.body = statusCode.ERROR_9999();
            return;
        }
        label.createMan = ctx.session.userName;
        if (label.labelName && label.sort) {
            if (label.id) { // 修改标签
                const existLabel = await labelModel.findLabelById(label.id);
                if (existLabel) {
                    await labelModel.updateLable(label);
                    ctx.body = statusCode.SUCCESS_200('修改标签成功', {});
                } else {
                    ctx.body = statusCode.ERROR_1010();
                }
            } else { // 创建标签
                const existLabel = await labelModel.findLabelByName(label.labelName);
                if (existLabel) {
                    ctx.body = statusCode.ERROR_1007();
                } else {
                    // 创建标签
                    await labelModel.createLabel(label);
                    ctx.body = statusCode.SUCCESS_200('创建标签成功', {});
                }
            }
        } else {
            ctx.body = statusCode.ERROR_1004();
        }
    }

    // 查询所有的标签
    static async queryLabelList(ctx) {
        let labelList = ctx.query;
        ctx.response.status = 200;
        if (labelList) {
            const data = await labelModel.queryAllLabel();
            ctx.body = statusCode.SUCCESS_200('success', {
                list: data
            })
        } else {
            ctx.body = statusCode.ERROR_1008();
        }
    }

    // 删除标签
    static async deleteLabel(ctx) {
        let data = ctx.query;
        if (!ctx.session.userName) { // 检查登录态
            ctx.body = statusCode.ERROR_9999();
            return;
        }
        let id = data.id;
        if (id) {
            const result = labelModel.delete(id);
            if (result) {
                ctx.body = statusCode.SUCCESS_200('success', {});
            } else {
                ctx.body = statusCode.ERROR_1009();
            }
        } else {
            ctx.body = statusCode.ERROR_1004();
        }
    }
}

module.exports = LabelController;