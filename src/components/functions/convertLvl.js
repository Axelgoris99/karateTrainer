function convertLvl(color) {
  const grades = ["blanc", "jaune", "orange", "vert", "bleu", "marron", "noir"];
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
