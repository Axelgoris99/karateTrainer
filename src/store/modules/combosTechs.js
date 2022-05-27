import convertLvl from "../../components/functions/convertLvl";

export default {
  state: {
    combos: {},
    combosLvl: {},
  },
  getters: {
    combos(state) {
      return state.combos;
    },
    combosLvl(state) {
      return state.combosLvl;
    },
  },
  mutations: {
    LOAD_COMBOS(state, combos) {
      state.combos = combos;
    },
    SET_COMBOS_LVL(state, level) {
      state.combosLvl = {};
      var i = 0;
      for (let [key, value] of Object.entries(state.combos)) {
        key;
        if (convertLvl(value.lvl) <= level) {
          state.combosLvl[i] = value;
          i++;
        }
      }
    },
  },
  actions: {
    setCombos({ commit, rootGetters }, combos) {
      commit("LOAD_COMBOS", combos);
      commit("SET_COMBOS_LVL", rootGetters.lvl);
    },
    setCombosLvl({ commit, rootGetters }) {
      commit("SET_COMBOS_LVL", rootGetters.lvl);
    },
  },
};
