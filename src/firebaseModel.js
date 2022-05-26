import firebase from "firebase/compat/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import "firebase/compat/storage";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from "./firebaseSettings.js";
import store from "./store/index.js";
const app = firebase.initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
logEvent(analytics, "select_content");
var database = getDatabase();
const storage = firebase.storage();

const fetchImageUrl = (name) => {
  return storage.ref().child(`images/${name}.png`).getDownloadURL();
};

const fetchSoundUrl = (name) => {
  return storage.ref().child(`sounds/${name}.ogg`).getDownloadURL();
};

function fetchAllData() {
  onValue(ref(database, "/techniques"), (snapshot) => {
    if (snapshot.val()) {
      store.dispatch("setTechniques", snapshot.val());
    }
  });
}
export { fetchImageUrl, fetchSoundUrl, fetchAllData };
