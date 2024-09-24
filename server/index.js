import {get} from './request';

export const getList = () => {
    return get('/get-list');
};

export const getDetails = (params) => {
    return get('/get-info', params);
};