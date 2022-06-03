import { createStore } from "vuex";
import combosTechs from "./modules/combosTechs";
import allTechs from "./modules/allTechs";
import selectedTechs from "./modules/selectedTechs";
import quizz from "./modules/quizz";

export default createStore({
  strict: process.env.NODE_ENV !== "production",
  modules: { combosTechs, allTechs, selectedTechs, quizz },
});
