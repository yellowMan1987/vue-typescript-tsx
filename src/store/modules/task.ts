export const MODULE_PATH = "task";
export enum actionTypes {
  INIT = "INIT",
  UPDATE_TASK = "UPDATE_TASK",
}

const R = require('ramda');

export interface ILists {
 
}
 
export interface ICard {

}

const initialState = {
  taskList: [],
};

const state = R.clone(initialState);

const actions = {
  [actionTypes.INIT]({ state }:any) {
    R.assoc(state, R.clone(initialState));
  },

};

const mutations = {

  [actionTypes.UPDATE_TASK](state:any,data:any) {
    state.taskList = data;
  },

};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};