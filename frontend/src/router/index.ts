// type Router = TypesConfig extends Record<"Router", infer T> ? T : _RouterClassic;
import { ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import WadsView from "../views/WadsView.vue";
import RegisterView from "../views/RegisterView.vue";
import UsersView from "@/views/UsersView.vue";
import LoginView from "@/views/LoginView.vue";
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
    },
    {
      path: "/users",
      name: "users",
      component: UsersView
    },
    {
        path: "/register",
        name: "register",
        component: RegisterView
    },
    {
        path: "/login",
        name: "login",
        component: LoginView
    }
  ]
});

export default router;