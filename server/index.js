import {get} from './request';

export const getList = (params) => {
    return get('/pokemon', params);
};

export const getDetails = (params) => {
    return get('/get-info', params);
};