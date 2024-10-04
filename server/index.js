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
export const getSkill = (id, params) => {
    return get('/skill/' + id, params);
};

export const getSkillPokemon = (id, params) => {
    return get('/skill/' + id+'/pokemon', params);
};

export const getItemsList = (params) => {
    return get('/item', params);
};

export const getItem = (id, params) => {
    return get('/item/' + id, params);
};

export const getAbilityList = (params) => {
    return get('/ability', params);
};


export const getAbility = (id, params) => {
    return get('/ability/' + id, params);
};

export const getPokemonDetails = (id) => {
    return get('/pokemon/' + id);
};
export const getPokemonDetailsForms = (id) => {
    return get('/pokemon/' + id+'/forms');
};