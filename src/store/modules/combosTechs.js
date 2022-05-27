export default {
  state: {
    combos: {},
  },
  getters: {
    combos(state) {
      return state.combos;
    },
  },
  mutations: {
    LOAD_COMBOS(state, combos) {
      state.combos = combos;
    },
  },
  actions: {
    setCombos({ commit }, combos) {
      commit("LOAD_COMBOS", combos);
    },
  },
};
