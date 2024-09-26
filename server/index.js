import {get} from './request';


/**
 * 获取列表
 @param {Object} params
 */
export const getList = (params) => {
    return get('/pokemon', params);
};

export const getSkillList = (params) => {
    return get('/skill', params);
};