export default {
  state: {
    selected: [],
    // The one with Descriptions filter duplicates
    listOfSelectedTechsWithDesc: [],
    // This one contains all of the techs that are going to be played!
    listOfSelectedTech: [],
  },
  getters: {
    selected(state) {
      return state.selected;
    },
    selectDesc(state) {
      return state.listOfSelectedTechsWithDesc;
    },
    selectList(state) {
      return state.listOfSelectedTech;
    },
  },
  mutations: {
    SET_SELECTED(state, listObj) {
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
      var techniques = listObj[0];
      var obj = listObj[1];
      var selectedTechs = [];
      for (let i = 0; i < obj.value.length; i++) {
        for (let [key, value] of Object.entries(techniques)) {
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
  },
  actions: {
    setSelected({ commit, rootGetters }, obj) {
      commit("SET_SELECTED", [rootGetters.techniques, obj]);
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
  },
};
