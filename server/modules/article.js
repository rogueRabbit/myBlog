const db = require('../config/db');
const Sequelize = db.sequelize;
const Article = Sequelize.import('../schema/article.js');
const Label =  Sequelize.import('../schema/label.js');
const moment = require('moment');

Article.sync({force: false});

class ArticleModel {

    // 添加文章
    static async createArticle(article) {
        let { title, content, relationLabel, sort, publishMan, status } = article;
        let publishTime = moment().format('YYYY-MM-DD HH:MM:SS');
        await Article.create({
            title, 
            content, 
            relationLabel, 
            sort, 
            publishMan,
            publishTime, 
            status
        })
        return true;
    }

    // 修改文章
    static async updateArticle(article) {
        let { id, title, content, relationLabel, sort, publishMan, status } = article;
        await Article.update({
            title: title,
            content: content,
            relationLabel: relationLabel,
            sort: sort,
            publishMan: publishMan,
            status: status,
        }, {
            where: {
                id
            },
            fields: ['title', 'content', 'relationLabel', 'sort', 'publishMan', 'status']
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
                }
              });
        } else {
            return await Article.findAll({
                attributes: ['id', 'title', 'relationLabel', 'sort', 'publishMan', 'publishTime', 'status', 'content'],
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
}

module.exports = ArticleModel;