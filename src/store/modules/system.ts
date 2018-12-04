import cloneDeep from "lodash.cloneDeep";
import assign from "lodash.assign";

export const MODULE_PATH = "system";
export enum actionTypes {
  INIT = "INIT",
  UPDATE_THEMES = "UPDATE_THEMES",

}

export const INIT = "INIT";
export const UPDATE_THEMES = "UPDATE_THEMES";
export const INIT_THEMES = "INIT_THEMES";



const initialState = {
  theme: 'red' as string,
};

const state = cloneDeep(initialState);

const actions = {
  [actionTypes.INIT]({ state }:any) {
    assign(state, cloneDeep(initialState));
  },

};

const mutations = {

  [actionTypes.UPDATE_THEMES](state:any,data:any) {
    // state.themeNum = new Date().getTime();
    state.theme = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};