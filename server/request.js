// request.js
import CryptoJS from './crypto-js';

// 设置 API 基础 URL (可根据环境切换)
// const BASE_URL = 'http://192.168.1.2:3000'; // 你的 API 基础 URL
const BASE_URL = 'http://47.98.174.14/front_api'; // 你的 API 基础 URL
// const BASE_URL = 'http://dex.fantasticmao.cn/front_api'; // 你的 API 基础 URL
const platform = uni.getSystemInfoSync().uniPlatform;


function decrypt(encryptedData, key) {
    // 使用 Base64 解码
    let encryptedHexStr = CryptoJS.enc.Base64.parse(encryptedData);

    // 将 key 转换为字节数组
    let keyUtf8 = CryptoJS.enc.Utf8.parse(key);

    // AES 解密
    let decrypted = CryptoJS.AES.decrypt({ciphertext: encryptedHexStr}, keyUtf8, {
        mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7
    });

    // 解密后的数据转换为字符串
    return decrypted.toString(CryptoJS.enc.Utf8);
}


// 封装请求方法
const request = (url, method, data, headers = {}) => {
    return new Promise((resolve, reject) => {
        console.log('-------->请求接口：', BASE_URL + url)
        uni.request({
            url: BASE_URL + url, method: method, data: data, header: {
                'Content-Type': 'application/json', // 默认的请求头
                platform, ...headers
            }, success: (res) => {
                // 处理成功逻辑，例如：判断状态码是否为200
                if (res.statusCode === 200) {
                    // console.log('接口返回：', res.data.data);
                    if (res.data.data) {
                        try {
                            res.data.data = JSON.parse(decrypt(res.data.data, `7WMLslVRhfLkAH0UquWshlXG+poT7w==`))
                            console.log('-------->返回数据：', res.data)
                        } catch (e) {
                            res.data.data = {};
                        }
                    }
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
