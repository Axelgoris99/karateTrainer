import { createStore } from "vuex";

export default createStore({
  state: {
    techniques: {},
    selected: [],
    count: 3,
    grades: ["blanc", "jaune", "orange", "vert", "bleu", "marron", "noir"],
    lvl: 0,
    listOfSelectedTechsWithDesc: [],
    listOfSelectedTech: [],
  },
  getters: {
    techniques(state) {
      return state.techniques;
    },
    selected(state) {
      return state.selected;
    },
    nbTech(state) {
      return state.count;
    },
    selectDesc(state) {
      return state.listOfSelectedTechsWithDesc;
    },
    selectList(state) {
      return state.listOfSelectedTech;
    },
    lvl(state) {
      return state.grades[state.lvl];
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
    },
    SET_SELECTED(state, obj) {
      // This is overly complicated but as everything it will do at first
      // And I'll forget about it and never refactor it...
      // Basically, here :
      /*
        We check if the key correspond to one of the top level.
        If yes, we had everything that is inside this top level so that's why we go through it.
        If no, we go one level deeper and check if the key correspond.
        If yes, ...
        If no, one level deeper, so on and so forth.
        Could have made it recursive.
      */
      var selectedTechs = [];
      for (let i = 0; i < obj.value.length; i++) {
        for (let [key, value] of Object.entries(state.techniques)) {
          if (key == obj.value[i]) {
            for (let [key1, value1] of Object.entries(value)) {
              key1;
              selectedTechs.push(value1);
            }
          } else {
            for (let [key1, value1] of Object.entries(value)) {
              if (key1 == obj.value[i]) {
                selectedTechs.push(value1);
              }
            }
          }
        }
      }
      state.selected[obj.numberTree] = selectedTechs;
    },
    SET_COUNT(state, val) {
      state.count = val;
    },
    ADD_SELECTEDDESC(state, val) {
      state.listOfSelectedTechsWithDesc.push(val);
    },
    ADD_SELECTEDLIST(state, val) {
      state.listOfSelectedTech.push(val);
    },
    CLEAR_SELECTEDDESC(state) {
      state.listOfSelectedTechsWithDesc = [];
    },
    CLEAR_SELECTEDLIST(state) {
      state.listOfSelectedTech = [];
    },
    SET_LVL(state, val) {
      state.lvl = val;
    },
  },
  actions: {
    setTechniques({ commit }, tech) {
      commit("LOAD_TECHNIQUES", tech);
    },
    setSelected({ commit }, obj) {
      commit("SET_SELECTED", obj);
    },
    unsetSelected({ commit }) {
      commit("SET_SELECTED", { value: [], numberTree: 0 });
      commit("SET_SELECTED", { value: [], numberTree: 1 });
      commit("SET_SELECTED", { value: [], numberTree: 2 });
      commit("SET_SELECTED", { value: [], numberTree: 3 });
      commit("SET_SELECTED", { value: [], numberTree: 4 });
      commit("SET_SELECTED", { value: [], numberTree: 5 });
      commit("SET_SELECTED", { value: [], numberTree: 6 });
      commit("SET_SELECTED", { value: [], numberTree: 7 });
      commit("SET_SELECTED", { value: [], numberTree: 8 });
      commit("CLEAR_SELECTEDDESC");
      commit("CLEAR_SELECTEDLIST");
    },
    setCount({ commit }, val) {
      commit("SET_COUNT", val);
    },
    addTechDesc({ commit }, val) {
      commit("ADD_SELECTEDDESC", val);
    },
    addTech({ commit }, val) {
      commit("ADD_SELECTEDLIST", val);
    },
    clearTechDesc({ commit }) {
      commit("CLEAR_SELECTEDDESC");
    },
    clearTech({ commit }) {
      commit("CLEAR_SELECTEDLIST");
    },
    setLvl({ commit }, val) {
      commit("SET_LVL", val);
    },
  },
  modules: {},
});
