import store from "../../store/index";
import convertLvl from "./convertLvl";
const grades = ["blanc", "jaune", "orange", "vert", "bleu", "marron", "noir"];

function getList(name) {
  var obj = store.getters.sameTypeOfTechs(name);
  var array = [];
  for (let i = 0; i < grades.length; i++) {
    array.push([]);
  }
  if (!obj) {
    return null;
  }
  for (let [key, value] of Object.entries(obj)) {
    key;
    array[convertLvl(value.lvl)].push(value);
  }
  console.log(array);
  return array;
}

export default getList;
