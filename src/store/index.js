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
    SET_SELECTED(state, obj) {
      // This is overly complicated but as everything it will do at first
      // And I'll forget about it and never refactor it...
      var selectedTechs = [];
      console.log(obj.value.length);
      for (let i = 0; i < obj.value.length; i++) {
        for (let [key, value] of Object.entries(state.techniques)) {
          if (key == obj.value[i]) {
            if (!value.name) {
              for (let [key1, value1] of Object.entries(value)) {
                key1;
                if (!value1.name) {
                  for (let [key2, value2] of Object.entries(value1)) {
                    key2;
                    selectedTechs.push(value2);
                  }
                } else {
                  selectedTechs.push(value1);
                }
              }
              continue;
            }
          } else {
            for (let [key1, value1] of Object.entries(value)) {
              if (key1 == obj.value[i]) {
                if (!value1.name) {
                  for (let [key2, value2] of Object.entries(value1)) {
                    key2;
                    selectedTechs.push(value2);
                  }
                } else {
                  selectedTechs.push(value1);
                }
              } else {
                for (let [key2, value2] of Object.entries(value1)) {
                  if (key2 == obj.value[i]) selectedTechs.push(value2);
                }
              }
            }
          }
        }
      }
      state.selected[obj.numberTree] = selectedTechs;
    },
  },
  actions: {
    setTechniques({ commit }, tech) {
      commit("LOAD_TECHNIQUES", tech);
    },
    setSelected({ commit }, obj) {
      commit("SET_SELECTED", obj);
    },
  },
  modules: {},
});
