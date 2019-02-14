const db = require('../config/db');
const Sequelize = db.sequelize;
const Label = Sequelize.import('../schema/label.js');
const moment = require('moment');

Label.sync({force: false});

class LabelModel {

    // 添加标签
    static async createLabel(label) {
        let { labelName, sort, createMan, status } = label;
        let createTime = moment().format('YYYY-MM-DD HH:MM:SS');
        await Label.create({
            labelName,
            sort,
            createTime,
            createMan,
            status
        })
        return true;
    }

    // 修改标签
    static async updateLable(label) {
        let { id, labelName, sort } = label;
        await Label.update({
            labelName: labelName,
            sort: sort
        }, {
            where: {
                id
            },
            fields: ['labelName', 'sort']
        });
        return true
    }

    // 查询所有的标签
    static async queryAllLabel(){
        return await Label.findAll({
            attributes: ['id', 'labelName', 'sort', 'createTime', 'createMan'],
            order: [
                ['sort', 'ASC'],
            ]
        })
    }

    // 查询单个标签
    static async findLabelById(id) {
        return await Label.findByPk(id);
    }

    // 删除标签
    static async delete(id) {
        await Label.destroy({
            where: {
                id
            }
        })
    }

    // 根据标签名查找标签
    static async findLabelByName(labelName) {
        return await Label.findOne({
            where: {
                labelName
            }
        })
    }

    // 统计每个标签的数目
    static async queryLabelCount() {
        // await Label.
    }
}

module.exports = LabelModel;