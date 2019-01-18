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
            return res;
        }).catch(() => {
            alert('出错了');
        })
    }

    static post(url, params) {
        return fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
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
            return res;
        }).catch(() => {
            alert('出错了');
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
}

export default Util;