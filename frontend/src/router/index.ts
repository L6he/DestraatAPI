// type Router = TypesConfig extends Record<"Router", infer T> ? T : _RouterClassic;
import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import WadsView from "../views/WadsView.vue";
// teiste vaadete impordid käivad siia ka
const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      redirect: "/wads"
    },
    {
      path: "/wads",
      name: "wads",
      component: WadsView
    }
  ]
});

export default router;