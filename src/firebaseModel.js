import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from "./firebaseSettings.js";
import store from "./store/index.js";
firebase.initializeApp(firebaseConfig);
var database = getDatabase();
const storage = firebase.storage();

const fetchImageUrl = (race, gender, _class, number) => {
  return storage
    .ref()
    .child(`icon/${race}/${gender}/${_class}/${number}.png`)
    .getDownloadURL();
};

function fetchAllData() {
  onValue(ref(database, "/techniques"), (snapshot) => {
    if (snapshot.val()) {
      store.dispatch("setTechniques", snapshot.val());
    }
  });
}
export { fetchImageUrl, fetchAllData };
