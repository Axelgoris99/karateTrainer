import firebase from "firebase/compat/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import "firebase/compat/storage";
import { getDatabase, ref, onValue, get, set } from "firebase/database";
import firebaseConfig from "./firebaseSettings.js";
import store from "./store/index.js";
import { getAuth } from "firebase/auth";

const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
logEvent(analytics, "select_content");
var database = getDatabase();
const storage = firebase.storage();
const auth = getAuth();

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
  onValue(ref(database, "/palmares"), (snapshot) => {
    if (snapshot.val()) {
      store.dispatch("quizz/setPalmares", snapshot.val());
    }
  });
}

function addUserFirestore(user) {
  const mail = user.email.replace(/[^a-zA-Z0-9]/g, "");
  set(ref(database, "/usersByMail/" + mail + "/id"), user.uid).then(() =>
    set(ref(database, "/usersByMail/" + mail + "/name"), user.displayName)
  );
}

function updateFirebaseFromModel(payload) {
  let currentUser = getAuth().currentUser;
  let userId = currentUser.uid;
  // High Score For Quizz
  if (payload.highScore) {
    set(
      ref(database, "/users/" + userId + "/quizz/highScore"),
      payload.highScore
    );
  }
  // Number of Question for Quizz
  if (payload.nbQ) {
    set(ref(database, "/users/" + userId + "/quizz/nbQ"), payload.nbQ);
  }
  if (payload.lvl > -1) {
    set(ref(database, "/users/" + userId + "/lvl"), payload.lvl);
  }
  // if (payload.characterToRemove) {
  //   set(
  //     ref(
  //       database,
  //       "/users/" + userId + "/characters/" + payload.characterToRemove.name
  //     ),
  //     null
  //   );
  // }

  // Techs from Kihon Ippon Kumite
  if (payload.highScore) {
    set(
      ref(database, "/users/" + userId + "/quizz/highScore"),
      payload.highScore
    );
  }
  if (payload.kihonIppon) {
    set(
      ref(
        database,
        "/users/" +
          userId +
          "/kihonIppon/" +
          payload.kihonIppon.sideAndType +
          "/" +
          payload.kihonIppon.name
      ),
      payload.kihonIppon.value
    );
  }
  if (payload.palmares) {
    set(ref(database, "/palmares"), payload.palmares);
  }
}

function updateModelFromFirebase(store) {
  let userId = getAuth().currentUser.uid;
  store;

  // highScore;
  onValue(
    ref(database, "/users/" + userId + "/quizz/highScore"),
    (snapshot) => {
      if (snapshot.val()) {
        store.dispatch("quizz/setHighScore", snapshot.val());
      }
    }
  );

  // Nb Questions Answered Max
  onValue(ref(database, "/users/" + userId + "/quizz/nbQ"), (snapshot) => {
    if (snapshot.val()) {
      store.dispatch("quizz/setNbQMax", snapshot.val());
    }
  });

  //lvl techniques
  onValue(ref(database, "/users/" + userId + "/lvl"), (snapshot) => {
    if (snapshot.val() > -1) {
      store.dispatch("allTechs/setLvl", snapshot.val());
    }
  });

  // Kihon Ippon Kumite Techniques
  onValue(ref(database, "/users/" + userId + "/kihonIppon"), (snapshot) => {
    if (snapshot.val()) {
      store.dispatch("kihonIpponTechs/setTechs", snapshot.val());
    }
  });
}

export {
  fetchImageUrl,
  fetchSoundUrl,
  fetchAllData,
  updateFirebaseFromModel,
  updateModelFromFirebase,
  addUserFirestore,
  auth,
};
