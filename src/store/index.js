import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const getItem = JSON.parse(localStorage.getItem("user") || false);

export default new Vuex.Store({
  state: {
    user: {
      id: 0,
      name: getItem?.name || "",
      handle: getItem?.handle || "",
      avatar:
        "https://pbs.twimg.com/profile_images/1183019941085110272/VUyStWen_400x400.jpg",
      bio: "Full Stack Developer | Passionate about Technology",
      following: [],
      followers: 0,
      isLoggedIn: !!getItem
    },
    users: [
      {
        id: 1,
        name: "Dev Ed",
        handle: "deved",
        avatar:
          "https://pbs.twimg.com/profile_images/1371172008457871360/vRZsFE07_400x400.jpg",
        bio: "Content Creator, Owner of https://developedbyed.com",
        followers: 10500,
        following: true
      },
      {
        id: 2,
        name: "Brad Traversy",
        handle: "traversymedia",
        avatar:
          "https://pbs.twimg.com/profile_images/856983737426423809/6jebtwP-_400x400.jpg",
        bio: "Fullstack web developer and educator Freelance Mastery http://freelancemastery.dev",
        followers: 9500,
        following: false
      },
      {
        id: 3,
        name: "Evan You",
        handle: "youyuxi",
        avatar:
          "https://pbs.twimg.com/profile_images/1206997998900850688/cTXTQiHm_400x400.jpg",
        bio: "Husband, father of two, independent open source developer. Creator / project lead of @vuejs, @vite_js and connoisseur of sushi. Chinese-only alt: @yuxiyou",
        followers: 6700,
        following: false
      },
      {
        id: 4,
        name: "Vue.js",
        handle: "vuejs",
        avatar:
          "https://pbs.twimg.com/profile_images/875996174305472512/upM71pVR_400x400.jpg",
        bio: "Progressive JavaScript framework for building modern web interfaces. Created by @youyuxi, maintained by http://vuejs.org/v2/guide/team.",
        followers: 9900,
        following: true
      },
      {
        id: 5,
        name: "Angular",
        handle: "angular",
        avatar:
          "https://pbs.twimg.com/profile_images/727278046646915072/cb8U-gL6_400x400.jpg",
        bio: "The modern web developer's platform.",
        followers: 5500,
        following: false
      }
    ],
    tweets: [
      {
        id: 1,
        user: 1,
        handle: "deved",
        timestamp: "10h",
        content:
          "We tried Svelte, definitely going to build our Course platform using it this year.",
        likes: 185,
        liked: true
      },
      {
        id: 2,
        user: 1,
        handle: "deved",
        timestamp: "9h",
        content:
          "Really excited the start working on Javascript Animation Course! Release date around end of Nov.",
        likes: 509,
        liked: false
      },
      {
        id: 3,
        user: 2,
        handle: "traversymedia",
        timestamp: "8h",
        content:
          "Every language is good for specific things. They can not be ranked in a general sense. They are just tools, not sports teams.",
        likes: 1700,
        liked: false
      },
      {
        id: 4,
        user: 2,
        timestamp: "5h",
        content:
          "Has anyone watched Archive81 on Netflix yet? I watched two episodes last night and really liked it. If you like horror/thriller/suspense, check it out.",
        likes: 534,
        liked: false
      },
      {
        id: 5,
        user: 3,
        handle: "youyuxi",
        timestamp: "5h",
        content:
          "Ok, just want to get this out so I can enjoy the holidays: A preview of the new Vue 3 docs that we've been working on: ",
        likes: 1200,
        liked: true
      },
      {
        id: 6,
        user: 3,
        handle: "youyuxi",
        timestamp: "4h",
        content:
          "Just migrated the Vue issue helper (a 4-year old vue-cli + Vue 2 app) to Vite + vite-plugin-vue2 in less than 30 minutes Victory hand",
        likes: 318,
        liked: false
      },
      {
        id: 7,
        user: 3,
        handle: "youyuxi",
        timestamp: "3h",
        content:
          "The full build on Netlify (including vm spin-up + cache restore + deps install etc.) got 5x faster :D",
        likes: 101,
        liked: false
      },
      {
        id: 8,
        user: 4,
        handle: "vuejs",
        timestamp: "2h",
        content:
          "Due to the change of `latest` tag on npm, this will cause breakage to CDN links that do not specify a version range. Please make sure to add an explicit version to your production CDN links!",
        likes: 504,
        liked: true
      },
      {
        id: 9,
        user: 4,
        handle: "vuejs",
        timestamp: "2h",
        content:
          "What is one thing that you wish the Vue docs explained better?",
        likes: 415,
        liked: true
      },
      {
        id: 10,
        user: 5,
        handle: "angular",
        timestamp: "2h",
        content:
          "Sparkles Angular 13.2 is out! Sparkles Check out our in-depth articles about what's new in  @angular and the CLI!",
        likes: 87,
        liked: false
      },
      {
        id: 11,
        user: 5,
        handle: "angular",
        timestamp: "1h",
        content:
          "Angular v13.2 FormControls can now be reset to their initial value, giving developers more control of reactive forms when building applications. ",
        likes: 237,
        liked: false
      }
    ]
  },
  getters: {
    getUser(state) {
      const following = state.users
        .filter(user => user.following)
        .map(x => x.id);
      return { ...state.user, following };
    },
    getUsers(state) {
      const user = {
        id: state.user.id,
        name: state.user.name,
        handle: state.user.handle,
        avatar: state.user.avatar
      };

      return [user, ...state.users];
    },
    getTweets(state) {
      return state.tweets;
    }
  },
  mutations: {
    setUser(state, name) {
      state.user.name = name;
      state.user.handle = name.replaceAll(" ", "").toLowerCase();
      state.user.isLoggedIn = true;
      localStorage.setItem(
        "user",
        JSON.stringify({ name: state.user.name, handle: state.user.handle })
      );
    },
    resetUser(state) {
      state.user.name = "";
      state.user.handle = "";
      state.user.isLoggedIn = false;
      localStorage.removeItem("user");
    },
    toggleFollow(state, id) {
      const index = id - 1;
      const user = state.users[index];
      if (user.following) {
        user.following = false;
        user.followers--;
        state.user.following = state.user.following.filter(x => x !== user.id);
      } else {
        user.following = true;
        user.followers++;
        state.user.following.push(user.id);
      }
    },
    toogleLike(state, id) {
      const index = id - 1;
      const tweet = state.tweets[index];
      if (tweet.liked) {
        tweet.likes--;
        tweet.liked = false;
      } else {
        tweet.likes++;
        tweet.liked = true;
      }
    },
    addTweet(state, content) {
      const tweet = {
        id: state.tweets.length + 1,
        user: state.user.id,
        handle: state.user.handle,
        timestamp: "Now",
        content,
        likes: 0,
        liked: false
      };
      state.tweets.push(tweet);
    }
  },
  actions: {},
  modules: {}
});
