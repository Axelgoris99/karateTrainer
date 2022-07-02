export default {
  namespaced: true,
  state: {
    rightAtk: {},
    leftAtk: {},
    rightDef: {},
    leftDef: {},
  },
  getters: {
    rightAtk(state) {
      return state.rightAtk;
    },
    leftAtk(state) {
      return state.leftAtk;
    },
    rightDef(state) {
      return state.rightDef;
    },
    leftDef(state) {
      return state.leftDef;
    },
    tech: (state) => (nameTech, right, def) => {
      var returnValue;
      switch (right) {
        case true:
          switch (def) {
            case true:
              returnValue = state.rightDef[nameTech];
              break;
            case false:
              returnValue = state.rightAtk[nameTech];
              break;
          }
          break;
        case false:
          switch (def) {
            case true:
              returnValue = state.leftDef[nameTech];
              break;
            case false:
              returnValue = state.leftAtk[nameTech];
              break;
          }
          break;
      }
      return returnValue;
    },
  },
  mutations: {
    SET_RIGHT_ATK(state, obj) {
      state.rightAtk[obj.name] = obj.value;
    },
    SET_RIGHT_DEF(state, obj) {
      state.rightDef[obj.name] = obj.value;
    },
    SET_LEFT_ATK(state, obj) {
      state.leftATk[obj.name] = obj.value;
    },
    SET_LEFT_DEF(state, obj) {
      state.leftDef[obj.name] = obj.value;
    },
  },
  actions: {
    setRightAtk({ commit }, obj) {
      commit("SET_RIGHT_ATK", obj);
    },
    setLeftAtk({ commit }, obj) {
      commit("SET_LEFT_ATK", obj);
    },
    setRightDef({ commit }, obj) {
      commit("SET_RIGHT_DEF", obj);
    },
    setLeftDef({ commit }, obj) {
      commit("SET_LEFT_DEF", obj);
    },

    setTechs({ dispatch }, val) {
      for (let [key, value] of Object.entries(val)) {
        for (let [key2, value2] of Object.entries(value)) {
          let str = "set" + key;
          let obj = { name: key2, value: value2 };
          dispatch(str, obj);
        }
      }
    },
  },
};
