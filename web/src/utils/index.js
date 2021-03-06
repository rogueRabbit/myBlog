import { cookie } from 'cookie_js';
import { message } from 'antd';
class Util {

    static get(url, params) {
        if (params) {
            url = url + '?'+ this.param(params);
        }
        return fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then((resp) => {
            if (resp.status >= 200 && resp.status < 300) {
                return resp;
            }
            throw new Error(resp.statusText);
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if (res.return_code === -9999) { // 未检查到登录态
                cookie.set('isLogin', 0);
                cookie.remove('userName');
                message.info('未检查到您的登录态，页面自动跳回首页!');
                let returnUrl = window.location.protocol + '//' + window.location.host;
                window.location.href = returnUrl;
            } 
            return res;
        }).catch(() => {
            console.log('出错了');
        })
    }

    static post(url, params) {
        return fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'include',
            body: params ? this.param(params) : '',
        }).then((resp) => {
            if(resp.status >= 200 && resp.status < 300) {
                return resp;
            }
            throw new Error(resp.statusText);
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if (res.return_code) {
                if (res.return_code === -9999) { // 未检查到登录态
                    cookie.set('isLogin', 0);
                    cookie.remove('userName');
                    message.info('未检查到您的登录态，页面自动跳回首页!');
                    let returnUrl = window.location.protocol + '//' + window.location.host;
                    window.location.href = returnUrl;
                }
            }
            return res;
        }).catch(() => {
            console.log('出错了');
        })
    }

    static fetch(url, method = 'get', params) {
        let options = {
            method: method,
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'inclued'
        };
        if (method.toLowerCase() === 'post') {
            options['body'] = this.param(params);
            options['header']['Content-Type'] = 'applicatopn/x-www-form-urlencoded';
        } else {
            options['headers']['Content-Type'] = 'application/json';
            if (params) {
                url = url + '?' + this.param(params);
            }
        }

        return fetch(url, options).then((resp) => {
            if (resp.status >= 200 && Response.status < 300) {
                return resp;
            }
            throw new Error(resp.statusText);
        }).then((resp) => {
            return resp.json();
        }).catch((error) => {
            console.log(error);
        })
    }

    static param(obj) {
        let pairs = [];
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                let k = encodeURIComponent(prop);
                let v = encodeURIComponent(typeof obj[prop] !== 'undefined' ? obj[prop] : '');
                pairs.push(k + '=' + v);
            }
        }
        return pairs.join('&');
    }

    static getUrlParam(url, name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let r = url.substr(url.indexOf('\?') + 1).match(reg);
        if (r != null) {
            let rUrl = decodeURIComponent(unescape(r[2]));
            // 临时处理路由导致的#/情况
            if (rUrl.substring(rUrl.length - 2) === '#/') {
                rUrl = rUrl.substring(0, rUrl.length - 2);
            }
            return rUrl;
        }
        return null;
    }
}

export default Util;