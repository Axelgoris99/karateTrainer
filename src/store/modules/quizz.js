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
    SET_HIGHSCORE(state, payload) {
      if (payload.highScore > state.highScore) {
        state.highScore = payload.highScore;
      }
    },
    SET_NBQMAX(state, payload) {
      if (payload.nbQ > state.nbQMax) {
        state.nbQMax = payload.nbQ;
      }
    },
  },
  actions: {
    setHighScore({ commit }, val) {
      commit("SET_HIGHSCORE", { highScore: val });
    },
    setNbQMax({ commit }, nb) {
      commit("SET_NBQMAX", { nbQ: nb });
    },
  },
};
