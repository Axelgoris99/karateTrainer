import convertLvl from "../../components/functions/convertLvl";
export default {
  state: {
    techniques: {},
    techniquesLvl: {},
    count: 3,
    lvl: 6,
    helpTechValue: "",
    ready: false,
  },
  getters: {
    techniques(state) {
      return state.techniques;
    },
    techniquesLvl(state) {
      return state.techniquesLvl;
    },
    ready(state) {
      return state.ready;
    },
    nbTech(state) {
      return state.count;
    },
    lvl(state) {
      return state.lvl;
    },
    helpTech(state) {
      return state.helpTechValue;
    },
    sameTypeOfTechs: (state) => (typeYouWant) => {
      if (Object.prototype.hasOwnProperty.call(state.techniques, typeYouWant)) {
        return state.techniques[typeYouWant];
      } else {
        return "";
      }
    },

    tech: (state) => (techIndex) => {
      var tech;
      loop1: for (let [key, value] of Object.entries(state.techniques)) {
        if (techIndex == key) {
          tech = value;
          break loop1;
        } else {
          for (let [key1, value1] of Object.entries(value)) {
            if (techIndex == key1) {
              tech = value1;
              break loop1;
            }
          }
        }
      }
      return tech;
    },
  },
  mutations: {
    LOAD_TECHNIQUES(state, tech) {
      state.techniques = tech;
      state.ready = true;
    },
    SET_TECH_LVL(state) {
      for (let [key, value] of Object.entries(state.techniques)) {
        state.techniquesLvl[key] = {};
        for (let [key1, value1] of Object.entries(value)) {
          if (convertLvl(value1.lvl) <= state.lvl) {
            state.techniquesLvl[key][key1] = value1;
          }
        }
      }
    },

    SET_COUNT(state, val) {
      state.count = val;
    },

    SET_LVL(state, val) {
      state.lvl = val;
    },
    SET_HELP_TECH(state, name) {
      state.helpTechValue = name;
    },
  },
  actions: {
    setTechniques({ commit }, tech) {
      commit("LOAD_TECHNIQUES", tech);
      commit("SET_TECH_LVL");
    },

    setCount({ commit }, val) {
      commit("SET_COUNT", val);
    },

    setLvl({ commit, dispatch }, val) {
      commit("SET_LVL", val);
      commit("SET_TECH_LVL");
      dispatch("setCombosLvl");
    },
    setHelpTech({ commit }, name) {
      commit("SET_HELP_TECH", name);
    },
  },
};
