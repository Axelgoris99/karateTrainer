const grades = ["jaune", "orange", "vert", "bleu", "marron", "noir", "noir+"];
function convertLvl(color) {
  var lvl;
  loop: for (let i = 0; i < grades.length; i++) {
    if (color == grades[i]) {
      lvl = i;
      break loop;
    }
  }
  return lvl;
}

export default convertLvl;
