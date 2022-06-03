import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import naive from "naive-ui";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  auth,
  updateFirebaseFromModel,
  updateModelFromFirebase,
} from "./firebaseModel";
var unsubscribe;
auth.onAuthStateChanged((user) => {
  store.dispatch("auth/fetchUser", user);
  if (user) {
    updateModelFromFirebase(store);
    unsubscribe = store.subscribe((mutation) => {
      if (mutation.payload) {
        updateFirebaseFromModel(mutation.payload);
      }
    });
  } else if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
});

createApp(App).use(store).use(router).use(naive).mount("#app");
