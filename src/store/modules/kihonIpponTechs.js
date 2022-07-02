export default {
  namespaced: true,
  state: {
    techs: { RightAtk: {}, LeftAtk: {}, RightDef: {}, LeftDef: {} },
  },
  getters: {
    rightAtk(state) {
      return state.techs.RightAtk;
    },
    leftAtk(state) {
      return state.techs.LeftAtk;
    },
    rightDef(state) {
      return state.techs.RightDef;
    },
    leftDef(state) {
      return state.Techs.RightDef;
    },
    tech: (state) => (nameTech, right, def) => {
      let sideAndType;
      if (right) {
        sideAndType = "Right";
      } else {
        sideAndType = "Left";
      }
      if (def) {
        sideAndType = sideAndType + "Def";
      } else {
        sideAndType = sideAndType + "Atk";
      }
      return state.techs[sideAndType][nameTech];
    },
  },
  mutations: {
    SET_TECH(state, obj) {
      state.techs[obj.kihonIppon.sideAndType] = {};
      state.techs[obj.kihonIppon.sideAndType][obj.kihonIppon.name] =
        obj.kihonIppon.value;
    },
  },
  actions: {
    setTech({ commit }, obj) {
      commit("SET_TECH", { kihonIppon: obj });
    },

    setTechs({ dispatch }, val) {
      for (let [key, value] of Object.entries(val)) {
        for (let [key2, value2] of Object.entries(value)) {
          let obj = { name: key2, value: value2, sideAndType: key };
          dispatch("setTech", obj);
        }
      }
    },
  },
};
