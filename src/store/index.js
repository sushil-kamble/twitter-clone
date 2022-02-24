import Vue from "vue";
import Vuex from "vuex";
import jwt_decode from "jwt-decode";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    meta: null,
    tweets: [],
    users: [],
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    currentUser: (state) => {
      if (state.user) {
        return state.meta;
      }
      return null;
    },
    allUsers: (state) => {
      return state.users;
    },
    allTweets: (state) => {
      return state.tweets.reverse();
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_META(state, meta) {
      state.meta = meta;
    },
    ADD_TWEETS(state, tweets) {
      state.tweets = tweets;
    },
    ADD_TWEET(state, tweet) {
      state.tweets = [...state.tweets, tweet];
    },
    TOGGLE_TWEET_LIKE(state, id) {
      const tweet = state.tweets.find((tweet) => tweet.id === id);
      tweet.isLiked = !tweet.isLiked;
      if (tweet.isLiked) {
        tweet.tweetLikes.push(state.user.uid);
      } else {
        const index = tweet.tweetLikes.indexOf(state.user.uid);
        tweet.tweetLikes.splice(index, 1);
      }
    },
    RESET_USER(state) {
      state.user = null;
      state.meta = null;
      state.tweets = [];
      state.users = [];
    },
    SET_USERS(state, users) {
      state.users = users;
    },

    FOLLOW_USER(state, id) {
      const targetUser = state.users.find((user) => user.id === id);
      targetUser.following.push(state.user.uid);
      targetUser.isFollowing = true;
    },
    UNFOLLOW_USER(state, id) {
      const targetUser = state.users.find((user) => user.id === id);
      const index = targetUser.following.indexOf(state.user.uid);
      targetUser.following.splice(index, 1);
      targetUser.isFollowing = false;
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
    async getAllUsers({ commit, state }) {
      const users = await fetch("http://localhost:3000/user/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.user.token}`,
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

    // TWEETS SECTION

    async loadTweets({ commit, state }) {
      const tweets = await fetch("http://localhost:3000/tweet/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });
      try {
        const data = await tweets.json();
        commit("ADD_TWEETS", data);
      } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
      }
    },

    async postTweet({ commit, state }, payload) {
      const tweet = await fetch("http://localhost:3000/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify({ content: payload.content }),
      });
      try {
        const data = await tweet.json();
        commit("ADD_TWEET", data);
      } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
      }
    },

    async toggleLike({ commit, state }, payload) {
      try {
        await fetch(`http://localhost:3000/tweet/like/${payload}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        });
        commit("TOGGLE_TWEET_LIKE", payload);
      } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
      }
    },

    // FOLLOW SECTION
    async toggleFollow({ commit, dispatch, state }, payload) {
      const targetUser = state.users.find((user) => user.id === payload);
      if (!targetUser.isFollowing) {
        await fetch(`http://localhost:3000/follow/${payload}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.user.token}`,
          },
        });
        commit("FOLLOW_USER", payload);
      } else {
        await fetch(`http://localhost:3000/follow/${payload}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.user.token}`,
          },
        });
        commit("UNFOLLOW_USER", payload);
      }
      dispatch("loadTweets");
    },
  },
});

// export default new Vuex.Store({
//   state: {
//     user: {
//       id: 0,
//       name: getItem?.name || "",
//       handle: getItem?.handle || "",
//       avatar:
//         "https://pbs.twimg.com/profile_images/1183019941085110272/VUyStWen_400x400.jpg",
//       bio: "Full Stack Developer | Passionate about Technology",
//       following: [],
//       followers: 0,
//       isLoggedIn: !!getItem,
//     },
//     users: [
//       {
//         id: 1,
//         name: "Dev Ed",
//         handle: "deved",
//         avatar:
//           "https://yt3.ggpht.com/ytc/AKedOLSB-oR-xmvVSZXJ3gbK12uvv0AJUvajwxMie_R_uw=s176-c-k-c0x00ffffff-no-rj",
//         bio: "Content Creator, Owner of https://developedbyed.com",
//         followers: 10500,
//         following: true,
//       },
//       {
//         id: 2,
//         name: "Brad Traversy",
//         handle: "traversymedia",
//         avatar:
//           "https://pbs.twimg.com/profile_images/856983737426423809/6jebtwP-_400x400.jpg",
//         bio: "Fullstack web developer and educator Freelance Mastery http://freelancemastery.dev",
//         followers: 9500,
//         following: false,
//       },
//       {
//         id: 3,
//         name: "Evan You",
//         handle: "youyuxi",
//         avatar:
//           "https://pbs.twimg.com/profile_images/1206997998900850688/cTXTQiHm_400x400.jpg",
//         bio: "Husband, father of two, independent open source developer. Creator / project lead of @vuejs, @vite_js and connoisseur of sushi. Chinese-only alt: @yuxiyou",
//         followers: 6700,
//         following: false,
//       },
//       {
//         id: 4,
//         name: "Vue.js",
//         handle: "vuejs",
//         avatar:
//           "https://pbs.twimg.com/profile_images/875996174305472512/upM71pVR_400x400.jpg",
//         bio: "Progressive JavaScript framework for building modern web interfaces. Created by @youyuxi, maintained by http://vuejs.org/v2/guide/team.",
//         followers: 9900,
//         following: true,
//       },
//       {
//         id: 5,
//         name: "Angular",
//         handle: "angular",
//         avatar:
//           "https://pbs.twimg.com/profile_images/727278046646915072/cb8U-gL6_400x400.jpg",
//         bio: "The modern web developer's platform.",
//         followers: 5500,
//         following: false,
//       },
//     ],
//     tweets: [
//       {
//         id: 1,
//         user: 1,
//         handle: "deved",
//         timestamp: "10h",
//         content:
//           "We tried Svelte, definitely going to build our Course platform using it this year.",
//         likes: 185,
//         liked: true,
//       },
//       {
//         id: 2,
//         user: 1,
//         handle: "deved",
//         timestamp: "9h",
//         content:
//           "Really excited the start working on Javascript Animation Course! Release date around end of Nov.",
//         likes: 509,
//         liked: false,
//       },
//       {
//         id: 3,
//         user: 2,
//         handle: "traversymedia",
//         timestamp: "8h",
//         content:
//           "Every language is good for specific things. They can not be ranked in a general sense. They are just tools, not sports teams.",
//         likes: 1700,
//         liked: false,
//       },
//       {
//         id: 4,
//         user: 2,
//         timestamp: "5h",
//         content:
//           "Has anyone watched Archive81 on Netflix yet? I watched two episodes last night and really liked it. If you like horror/thriller/suspense, check it out.",
//         likes: 534,
//         liked: false,
//       },
//       {
//         id: 5,
//         user: 3,
//         handle: "youyuxi",
//         timestamp: "5h",
//         content:
//           "Ok, just want to get this out so I can enjoy the holidays: A preview of the new Vue 3 docs that we've been working on: ",
//         likes: 1200,
//         liked: true,
//       },
//       {
//         id: 6,
//         user: 3,
//         handle: "youyuxi",
//         timestamp: "4h",
//         content:
//           "Just migrated the Vue issue helper (a 4-year old vue-cli + Vue 2 app) to Vite + vite-plugin-vue2 in less than 30 minutes Victory hand",
//         likes: 318,
//         liked: false,
//       },
//       {
//         id: 7,
//         user: 3,
//         handle: "youyuxi",
//         timestamp: "3h",
//         content:
//           "The full build on Netlify (including vm spin-up + cache restore + deps install etc.) got 5x faster :D",
//         likes: 101,
//         liked: false,
//       },
//       {
//         id: 8,
//         user: 4,
//         handle: "vuejs",
//         timestamp: "2h",
//         content:
//           "Due to the change of `latest` tag on npm, this will cause breakage to CDN links that do not specify a version range. Please make sure to add an explicit version to your production CDN links!",
//         likes: 504,
//         liked: true,
//       },
//       {
//         id: 9,
//         user: 4,
//         handle: "vuejs",
//         timestamp: "2h",
//         content:
//           "What is one thing that you wish the Vue docs explained better?",
//         likes: 415,
//         liked: true,
//       },
//       {
//         id: 10,
//         user: 5,
//         handle: "angular",
//         timestamp: "2h",
//         content:
//           "Sparkles Angular 13.2 is out! Sparkles Check out our in-depth articles about what's new in  @angular and the CLI!",
//         likes: 87,
//         liked: false,
//       },
//       {
//         id: 11,
//         user: 5,
//         handle: "angular",
//         timestamp: "1h",
//         content:
//           "Angular v13.2 FormControls can now be reset to their initial value, giving developers more control of reactive forms when building applications. ",
//         likes: 237,
//         liked: false,
//       },
//     ],
//   },
//   getters: {
//     getUser(state) {
//       const following = state.users
//         .filter((user) => user.following)
//         .map((x) => x.id);
//       return { ...state.user, following };
//     },
//     getUsers(state) {
//       const user = {
//         id: state.user.id,
//         name: state.user.name,
//         handle: state.user.handle,
//         avatar: state.user.avatar,
//       };

//       return [user, ...state.users];
//     },
//     getTweets(state) {
//       return state.tweets;
//     },
//   },
//   mutations: {
//     setUser(state, name) {
//       state.user.name = name;
//       state.user.handle = name.replaceAll(" ", "").toLowerCase();
//       state.user.isLoggedIn = true;
//       localStorage.setItem(
//         "user",
//         JSON.stringify({ name: state.user.name, handle: state.user.handle })
//       );
//     },
//     resetUser(state) {
//       state.user.name = "";
//       state.user.handle = "";
//       state.user.isLoggedIn = false;
//       localStorage.removeItem("user");
//     },
//     toggleFollow(state, id) {
//       const index = id - 1;
//       const user = state.users[index];
//       if (user.following) {
//         user.following = false;
//         user.followers--;
//         state.user.following = state.user.following.filter(
//           (x) => x !== user.id
//         );
//       } else {
//         user.following = true;
//         user.followers++;
//         state.user.following.push(user.id);
//       }
//     },
//     toogleLike(state, id) {
//       const index = id - 1;
//       const tweet = state.tweets[index];
//       if (tweet.liked) {
//         tweet.likes--;
//         tweet.liked = false;
//       } else {
//         tweet.likes++;
//         tweet.liked = true;
//       }
//     },
//     addTweet(state, content) {
//       const tweet = {
//         id: state.tweets.length + 1,
//         user: state.user.id,
//         handle: state.user.handle,
//         timestamp: "Now",
//         content,
//         likes: 0,
//         liked: false,
//       };
//       state.tweets.push(tweet);
//     },
//   },
//   actions: {},
//   modules: {},
// });
