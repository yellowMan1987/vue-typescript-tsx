import assign from "lodash/assign";
import cloneDeep from 'lodash/cloneDeep';

export const MODULE_PATH = "task";
export enum actionTypes {
  INIT = "INIT",
  UPDATE_TASK = "UPDATE_TASK",
  UPDATE_DROP_ID = "UPDATE_DROP_ID",
  ADD_LIST = 'ADD_LIST',
  ADD_CARD = 'ADD_CARD',
}


export interface ILists {
  id: number,
  // taskId: number,
  name: string,
  // des: string,
  // attachment: string,
  cards: ICard[],
}
 
export interface ICard {
  id: number,
  name: string,
  
}

const initialState = {
  taskList: [
    {
      id: 11,
      name: '待开始',
      cards: [
        {
          id: 111,
          name: '任务1'
        },
        {
          id: 112,
          name: '任务2'
        }
      ]
    },
    {
      id: 12,
      name: '进行中',
      cards: [
        {
          id: 121,
          name: '任务A'
        },
        {
          id: 122,
          name: '任务B'
        }
      ]
    },
    {
      id: 13,
      name: '已完成',
      cards: [
        {
          id: 131,
          name: '任务任务S'
        },
        {
          id: 132,
          name: '任务阿斯'
        }
      ]
    },
  ],

  dropId: 0,
};

const state = cloneDeep(initialState);

const actions = {
  [actionTypes.INIT]({ state }:any) {
    assign(state, cloneDeep(initialState));
  },

};

const mutations = {

  [actionTypes.UPDATE_TASK](state:any,data:any) {
    state.taskList = data;
  },
  [actionTypes.UPDATE_DROP_ID](state:any,data:any) {
    state.dropId = data;
  },

};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};