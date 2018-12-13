export const MODULE_PATH = "system";
export enum actionTypes {
  INIT = "INIT",
  UPDATE_THEMES = "UPDATE_THEMES",
  UPDATE_LANGUAGE = "UPDATE_LANGUAGE",
}

const R = require('ramda');

export interface IThemes {
  name: string;
  value: string;
  color: string;
}

const initialState = {
  theme: 'Pink' as string,
  themes:[
    { name: 'Pink', value: 'Pink', color: '#e91e63' },
    { name: 'Orange', value: 'Orange', color: '#ff5722' },
    { name: 'Green', value: 'Green', color: '#4caf50' },
  ] as IThemes[],
  
  language: 'zh_CN' as string,
};

const state = R.clone(initialState);

const actions = {
  [actionTypes.INIT]({ state }:any) {
    R.assoc(state, R.clone(initialState));
  },

};

const mutations = {

  [actionTypes.UPDATE_THEMES](state:any,data:any) {
    state.theme = data;
  },
  [actionTypes.UPDATE_LANGUAGE](state:any,data:any) {
    state.language = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};