import jwt_decode from "jwt-decode";

const user = {
  state: () => ({ user: null, meta: null }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    currentUser: (state) => {
      if (state.user) {
        return state.meta;
      }
      return null;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_META(state, meta) {
      state.meta = meta;
    },
    RESET_USER(state) {
      state.user = null;
      state.meta = null;
      state.tweets = [];
      state.users = [];
      localStorage.removeItem("user");
    },
  },
  actions: {
    async registerUser({ commit }, payload) {
      const user = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      try {
        const data = await user.json();
        const decoded = jwt_decode(data.token);
        const getMetaData = await fetch("http://localhost:3000/user/meta", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        const metaData = await getMetaData.json();
        const userData = { token: data.token, ...decoded };
        localStorage.setItem("user", JSON.stringify(userData));
        commit("SET_USER", userData);
        commit("SET_META", metaData);
      } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
      }
    },
    async loginUser({ commit }, payload) {
      const user = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      try {
        const data = await user.json();
        const decoded = jwt_decode(data.token);
        const getMetaData = await fetch("http://localhost:3000/user/meta", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        const metaData = await getMetaData.json();
        const userData = { token: data.token, ...decoded };
        localStorage.setItem("user", JSON.stringify(userData));
        commit("SET_USER", userData);
        commit("SET_META", metaData);
      } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
      }
    },
    async metaDataOfCurrentUser({ commit }, payload) {
      const meta = await fetch("http://localhost:3000/user/meta", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${payload}`,
        },
      });
      try {
        const data = await meta.json();
        commit("SET_META", data);
      } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
      }
    },
  },
};

export default user;
