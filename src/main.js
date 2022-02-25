import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import store from "./store";

Vue.config.productionTip = false;

const user = JSON.parse(localStorage.getItem("user"));

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    // If token is expired, logout user
    if (user && Date.now() >= user.exp * 1000) {
      localStorage.removeItem("user");
      this.$router.push("/login");
      return;
    }
    this.$store.commit("SET_USER", user);
    if (user) {
      // Get user details by token
      this.$store.dispatch("metaDataOfCurrentUser", user.token);
    }
  },
}).$mount("#app");
