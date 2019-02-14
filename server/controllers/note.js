const noteModel = require('../modules/note');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret.json');
const bcrypt = require('bcryptjs');
const util = require('util');
const verify = util.promisify(jwt.verify);
const statusCode = require('../util/status-code');

class NoteController {

    // 新增或修改文章
    static async addOrModifyNote(ctx) {
        const note = ctx.request.body;
        ctx.response.status = 200;
        if (!ctx.session.userName) { // 检查登录态
            ctx.body = statusCode.ERROR_9999();
            return;
        }
        if ( !note.noteTitle || !note.content || !note.status) {
            ctx.body = statusCode.ERROR_1004();
        } else {
            if (note.id) { // 修改笔记
                const existNote = await noteModel.findById(note.id);
                if (existNote) {
                    await noteModel.updateNote(note);
                    ctx.body = statusCode.SUCCESS_200('修改笔记成功', {});
                } else {
                    ctx.body = statusCode.ERROR_1011();
                }
            } else { // 新增笔记
                await noteModel.createNote(note);
                ctx.body = statusCode.SUCCESS_200('新增文章成功', {});
            }
        }
    }

    // 查询所有的笔记
    static async queryAllNote(ctx) {
        ctx.response.status = 200;
        const queryParams = ctx.query;
        const noteList = await noteModel.queryAllNote(queryParams);
        ctx.body = statusCode.SUCCESS_200('success', {
            list: noteList
        })
    }

    // 上架/下架笔记
    static async shelfNote(ctx) {
        const note = ctx.query;
        ctx.response.status = 200;
        if (!ctx.session.userName) { // 检查登录态
            ctx.body = statusCode.ERROR_9999();
            return;
        }
        if (note.id && note.status) {
            let result = await noteModel.shelfNote(note);
            if (result) {
                ctx.body = statusCode.SUCCESS_200('下架笔记成功', {});
            } else {
                ctx.body = statusCode.ERROR_1012();
            }
        } else {
            ctx.body = statusCode.ERROR_1004();
        }
    }

    // 根据id查询笔记的详情
    static async queryNoteById(ctx) {
        const note = ctx.query;
        ctx.response.status = 200;
        if (note.id) {
            const data = await noteModel.findById(note.id);
            ctx.body = statusCode.SUCCESS_200('success', {
                noteDetail: data
            });
        } else {
            ctx.body = statusCode.ERROR_1004();
        }
    }
}

module.exports =  NoteController;