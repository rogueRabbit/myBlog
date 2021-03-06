const db = require('../config/db');
const Sequelize = db.sequelize;
const Article = Sequelize.import('../schema/article.js');
const Label =  Sequelize.import('../schema/label.js');
const moment = require('moment');

Article.sync({force: false});
const labelNameNew = Label.belongsTo(Article, { as: 'labels', foreignKey: 'relationLabel', targetKey: 'id'});


class ArticleModel {

    // 添加文章
    static async createArticle(article) {
        let { title, content, relationLabel, sort, publishMan, status, remark } = article;
        let publishTime = moment().format('YYYY-MM-DD HH:MM:SS');
        await Article.create({
            title, 
            content, 
            relationLabel, 
            sort, 
            publishMan,
            publishTime, 
            status,
            remark
        })
        return true;
    }

    // 修改文章
    static async updateArticle(article) {
        let { id, title, content, relationLabel, sort, publishMan, status, remark } = article;
        await Article.update({
            title: title,
            content: content,
            relationLabel: relationLabel,
            sort: sort,
            publishMan: publishMan,
            status: status,
            remark: remark,
        }, {
            where: {
                id
            },
            fields: ['title', 'content', 'relationLabel', 'sort', 'publishMan', 'status', 'remark']
        });
        return true
    }

    // 查询所有的文章
    static async queryAllArticle(queryParams) {
        if (queryParams.status) {
            let { status } = queryParams;
            return await Article.findAll({
                where: {
                  status: status
                },
                order: [
                    ['publishTime', 'DESC'],
                ]
              });
        } else {
            return await Article.findAll({
                attributes: ['id', 'title', 'relationLabel', 'sort', 'publishMan', 'publishTime', 'status', 'content', 'remark'],
                include: [labelNameNew],
                order: [
                    ['sort', 'ASC'],
                ]
            })
        }
    }

    // 根据主键查询文章
    static async findById(id) {
        return await Article.findByPk(id);
    }

    // 删除文章
    static async delete(id) {
        return await Article.destroy({
            where: {
                id
            }
        })
    }

    // 下架文章
    static async shelfArticle(article) {
        let { id, status } = article;
        await Article.update({
            status: status,
        }, {
            where: {
                id
            },
            fields: ['status']
        });
        return true
    }

    // 查询某个标签的文章
    static async queryArticleByLabel(article) {
        let { relationLabel } = article;
        return await Article.findAll({
            where: {
                relationLabel: relationLabel
            }
        });
    }

}

module.exports = ArticleModel;