const db = require('../config/db');
const Sequelize = db.sequelize;
const Note = Sequelize.import('../schema/note.js');
const moment = require('moment');

Note.sync({force: false});


class NoteModel {

    // 添加笔记
    static async createNote(note) {
        let { noteTitle, content, status } = note;
        let createTime = moment().format('YYYY-MM-DD HH:MM:SS');
        await Note.create({
            noteTitle, 
            content, 
            status, 
            createTime
        })
        return true;
    }

    // 修改笔记
    static async updateNote(note) {
        let { id, noteTitle, content, status } = note;
        await Note.update({
            noteTitle: noteTitle,
            content: content,
            status: status,
        }, {
            where: {
                id
            },
            fields: ['noteTitle', 'content', 'status']
        });
        return true
    }

    // 查询所有的笔记
    static async queryAllNote(queryParams) {
        if (queryParams.status) {
            let { status } = queryParams;
            return await Note.findAll({
                where: {
                  status: status
                }
              });
        } else {
            return await Note.findAll()
        }
    }

    // 根据主键查询笔记
    static async findById(id) {
        return await Note.findByPk(id);
    }

    // 下架笔记
    static async shelfNote(note) {
        let { id, status } = note;
        await Note.update({
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

module.exports = NoteModel;