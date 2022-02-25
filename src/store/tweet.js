const tweet = {
  state: () => ({ tweets: [] }),
  getters: {
    allTweets: (state) => {
      return state.tweets.reverse();
    },
  },
  mutations: {
    ADD_TWEETS(state, tweets) {
      state.tweets = tweets;
    },
    ADD_TWEET(state, tweet) {
      state.tweets = [...state.tweets, tweet];
    },
    TOGGLE_TWEET_LIKE(state, { id, userId }) {
      const tweet = state.tweets.find((tweet) => tweet.id === id);
      tweet.isLiked = !tweet.isLiked;
      if (tweet.isLiked) {
        tweet.tweetLikes.push(userId);
      } else {
        const index = tweet.tweetLikes.indexOf(userId);
        tweet.tweetLikes.splice(index, 1);
      }
    },
  },
  actions: {
    async loadTweets({ commit, rootState }) {
      const tweets = await fetch("http://localhost:3000/tweet/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${rootState.userModule.user.token}`,
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

    async postTweet({ commit, rootState }, payload) {
      const tweet = await fetch("http://localhost:3000/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${rootState.userModule.user.token}`,
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

    async toggleLike({ commit, rootState }, payload) {
      try {
        await fetch(`http://localhost:3000/tweet/like/${payload}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${rootState.userModule.user.token}`,
          },
        });
        commit("TOGGLE_TWEET_LIKE", {
          id: payload,
          userId: rootState.userModule.user.uid,
        });
      } catch (err) {
        console.log(err.message);
        return Promise.reject(err.message);
      }
    },
  },
};

export default tweet;
