import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/register.vue")
  },
  {
    path: "/:id?",
    name: "Profile",
    component: () => import("../views/profile.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const user = localStorage.getItem("user");

  if (requiresAuth && !user) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
