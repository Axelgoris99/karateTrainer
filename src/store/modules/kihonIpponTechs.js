export default {
  namespaced: true,
  state: {
    droite: {},
    gauche: {},
  },
  getters: {
    droite(state) {
      return state.droite;
    },
    gauche(state) {
      return state.gauche;
    },
  },
  mutations: {
    SET_RIGHT(state, obj) {
      state.droite = obj;
    },
  },
  actions: {
    setRight({ commit }, obj) {
      commit("SET_RIGHT", obj);
    },
  },
};
