import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import tweet from "./tweet";
import follow from "./follow";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userModule: user,
    tweetModule: tweet,
    followModule: follow,
  },
  state: {
    users: [],
  },
  getters: {
    allUsers: (state) => {
      return state.users;
    },
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    FOLLOW_USER(state, id) {
      const targetUser = state.users.find((user) => user.id === id);
      targetUser.following.push(state.userModule.user.uid);
      targetUser.isFollowing = true;
    },
    UNFOLLOW_USER(state, id) {
      const targetUser = state.users.find((user) => user.id === id);
      const index = targetUser.following.indexOf(state.userModule.user.uid);
      targetUser.following.splice(index, 1);
      targetUser.isFollowing = false;
    },
  },
  actions: {
    async getAllUsers({ commit, state }) {
      const users = await fetch("http://localhost:3000/user/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.userModule.user.token}`,
        },
      });
      try {
        const data = await users.json();
        commit("SET_USERS", data);
      } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
      }
    },
  },
});
