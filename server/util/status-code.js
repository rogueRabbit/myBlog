const statusCode = {
    ERROR_1001: () => {
        return {
            return_code: -1001,
            return_message: '登录失败，用户不存在！',
            data: {}
        }
    },

    ERROR_1002: () => {
        return {
            return_code: -1002,
            return_message: '登录失败，用户名或密码错误，请检查',
            data: {}
        }
    },

    ERROR_1003: () => {
        return {
            return_code: -1003,
            return_message: '创建用户失败，用户名重复！',
            data: {}
        }
    },

    ERROR_1004: () => {
        return {
            return_code: -1004,
            return_message: '参数错误，请检查！',
            data: {}
        }
    },

    ERROR_1005: () => {
        return {
            return_code: -1005,
            return_message: '查询用户列表失败！',
            data: {}
        }
    },

    ERROR_1006: () => {
        return {
            return_code: -1006,
            return_message: '删除用户失败！',
            data: {}
        }
    },

    ERROR_1007: () => {
        return {
            return_code: -1007,
            return_message: '创建标签失败，标签名存在重复！',
            data: {}
        }
    },

    ERROR_1008: () => {
        return {
            return_code: -1008,
            return_message: '查询标签列表失败！',
            data: {}
        }
    },

    ERROR_1009: () => {
        return {
            return_code: -1009,
            return_message: '删除标签失败！',
            data: {}
        }
    },

    ERROR_1010: () => {
        return {
            return_code: -1010,
            return_message: '修改标签失败，未找到要删除的标签！',
            data: {}
        }
    },

    ERROR_1011: () => {
        return {
            return_code: -1011,
            return_message: '修改文章失败，未找到要删除的文章！',
            data: {}
        }
    },

    ERROR_1012: () => {
        return {
            return_code: -1012,
            return_message: '下架文章失败！',
            data: {}
        }
    },

    ERROR_9999: () => {
        return {
            return_code: -9999,
            return_message: '未检查到您的登录态，请先去登录！',
            data: {}
        }
    },

    SUCCESS_200: (return_message, data) => {
        return {
            return_code: 0,
            return_message,
            data,
        }
    },
    
    ERROR_401: (msg) => {
        return {
            code: 401,
            msg
        }
    },

    ERROR_403: (msg) => {
        return {
            code: 403,
            msg
        }
    },

    ERROR_404: (msg) => {
        return {
            code: 404,
            msg
        }
    },

    ERROR_412: (msg) => {
        return {
            code: 412,
            msg
        }
    },
}

module.exports = statusCode