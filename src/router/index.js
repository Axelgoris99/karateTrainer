import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store/index.js";

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/home/directional",
    name: "directional",
    component: () =>
      import(
        /* webpackChunkName: "directional" */ "../views/KihonDirectionalView.vue"
      ),
  },
  // {
  //   path: "/home/standing",
  //   name: "standing",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "standing" */ "../views/KihonStandingView.vue"
  //     ),
  // },
  {
    path: "/home/ipponkumite",
    name: "ipponkumite",
    component: () =>
      import(
        /* webpackChunkName: "ipponkumite" */ "../views/KihonIpponKumiteView.vue"
      ),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/grades",
    name: "grades",
    component: () =>
      import(/* webpackChunkName: "grades" */ "../views/SeriousView.vue"),
  },
  {
    path: "/lexique",
    name: "lexique",
    component: () =>
      import(/* webpackChunkName: "lexique" */ "../views/LexiqueView.vue"),
  },
  {
    path: "/quiz",
    name: "quiz",
    component: () =>
      import(/* webpackChunkName: "quiz" */ "../views/QuizView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/loginView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/profileView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeResolve((to) => {
  if (to.name === "profile" && !store.getters["auth/loggedIn"]) {
    return { name: "login" };
  }
  if (to.name === "login" && store.getters["auth/loggedIn"]) {
    return { name: "profile" };
  }
});
export default router;
