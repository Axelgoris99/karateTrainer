export default {
  namespaced: true,
  state: {
    highScore: 0,
    nbQMax: 0,
    palmares: {},
  },
  getters: {
    highScore(state) {
      return state.highScore;
    },
    nbQMax(state) {
      return state.nbQMax;
    },
    palmares(state) {
      return state.palmares;
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
    SET_PALMARES(state, payload) {
      state.palmares = payload.palmares;
    },
  },
  actions: {
    setHighScore({ commit, state, dispatch, rootGetters }, val) {
      commit("SET_HIGHSCORE", { highScore: val });
      if (rootGetters["auth/loggedIn"]) {
        if (val > state.palmares.one.score) {
          let newPalm = {};
          newPalm["one"] = {
            name: rootGetters["auth/name"],
            score: val,
          };
          newPalm["two"] = state.palmares.one;
          newPalm["three"] = state.palmares.two;
          dispatch("setPalmares", newPalm);
          return;
        }
        if (val > state.palmares.two.score) {
          let newPalm = {};
          newPalm["two"] = {
            name: rootGetters["auth/name"],
            score: val,
          };
          newPalm["one"] = state.palmares.one;
          newPalm["three"] = state.palmares.two;
          dispatch("setPalmares", newPalm);
          return;
        }
        if (val > state.palmares.three.score) {
          let newPalm = {};
          newPalm["two"] = state.palmares.two;
          newPalm["one"] = state.palmares.one;
          newPalm["three"] = {
            name: rootGetters["auth/name"],
            score: val,
          };
          dispatch("setPalmares", newPalm);
        }
      }
    },
    setNbQMax({ commit }, nb) {
      commit("SET_NBQMAX", { nbQ: nb });
    },
    setPalmares({ commit }, val) {
      console.log(val);
      commit("SET_PALMARES", { palmares: val });
    },
  },
};
