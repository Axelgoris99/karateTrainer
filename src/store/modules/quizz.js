export default {
  namespaced: true,
  state: {
    highScore: 0,
    nbQMax: 0,
  },
  getters: {
    highScore(state) {
      return state.highScore;
    },
    nbQMax(state) {
      return state.nbQMax;
    },
  },
  mutations: {
    SET_HIGHSCORE(state, val) {
      if (val > state.highScore) {
        state.highScore = val;
      }
    },
    SET_NBQMAX(state, nb) {
      if (nb > state.nbQMax) {
        state.nbQMax = nb;
      }
    },
  },
  actions: {
    setHighScore({ commit }, val) {
      commit("SET_HIGHSCORE", val);
    },
    setNbQMax({ commit }, nb) {
      commit("SET_NBQMAX", nb);
    },
  },
};
