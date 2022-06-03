import firebase from "firebase/compat/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import "firebase/compat/storage";
import { getDatabase, ref, onValue, get } from "firebase/database";
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
  get(ref(database, "/techniques")).then((snapshot) => {
    if (snapshot.val()) {
      var promises = [];
      var val = { ...snapshot.val() };
      for (let [key, value] of Object.entries(val)) {
        key;
        for (let [key2, value2] of Object.entries(value)) {
          key2;
          const promiseSon = fetchSoundUrl(value2.name)
            .then((url) => (value2["sound"] = url))
            .catch(() => (value2["sound"] = require("./assets/error.ogg")));
          promises.push(promiseSon);
          const promiseImage = fetchImageUrl(value2.name)
            .then((url) => (value2["image"] = url))
            .catch(() => (value2["image"] = require("./assets/logoApk.png")));
          promises.push(promiseImage);
        }
      }
      Promise.all(promises).then(() => {
        store.dispatch("allTechs/setTechniques", val);
      });
    }
  });
  onValue(ref(database, "/enchainements"), (snapshot) => {
    if (snapshot.val()) {
      store.dispatch("combosTechs/setCombos", snapshot.val());
    }
  });
}
export { fetchImageUrl, fetchSoundUrl, fetchAllData };
