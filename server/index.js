import {get} from './request';

export const getList = () => {
    return get('/get-list');
};