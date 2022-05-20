import { createStore } from "vuex";

export default createStore({
  state: {
    techniques: {},
    selected: [],
  },
  getters: {
    techniques(state) {
      return state.techniques;
    },
    selected(state) {
      return state.selected;
    },
  },
  mutations: {
    LOAD_TECHNIQUES(state, tech) {
      state.techniques = tech;
    },
    SET_SELECTED(state, obj) {
      state.selected[obj.numberTree] = obj.value;
    },
  },
  actions: {
    setTechniques({ commit }, tech) {
      commit("LOAD_TECHNIQUES", tech);
    },
    setSelected({ commit }, obj) {
      commit("SET_SELECTED", obj);
    },
  },
  modules: {},
});
