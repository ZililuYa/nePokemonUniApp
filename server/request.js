// request.js

// 设置 API 基础 URL (可根据环境切换)
const BASE_URL = 'http://192.168.1.2:3000'; // 你的 API 基础 URL

// 封装请求方法
const request = (url, method, data, headers = {}) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: BASE_URL + url, method: method, data: data, header: {
                'Content-Type': 'application/json', // 默认的请求头
                ...headers
            }, success: (res) => {
                // 处理成功逻辑，例如：判断状态码是否为200
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else {
                    // 非200的情况
                    reject(res.data);
                }
            }, fail: (err) => {
                // 请求失败，抛出错误
                reject(err);
            }
        });
    });
};

// GET 请求
export const get = (url, params = {}, headers = {}) => {
    return request(url, 'GET', params, headers);
};

// POST 请求
export const post = (url, data = {}, headers = {}) => {
    return request(url, 'POST', data, headers);
};

// 其他请求方式根据需要扩展
