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
    ADD_SELECTED(state, s) {
      state.selected.push(s);
    },
  },
  actions: {
    setTechniques({ commit }, tech) {
      commit("LOAD_TECHNIQUES", tech);
    },
    setSelected({ commit }, s) {
      commit("ADD_SELECTED", s);
    },
  },
  modules: {},
});
