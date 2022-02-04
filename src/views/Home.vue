<template>
  <div>
    <TweetInput />
    <div v-for="tweet in filterTweets" :key="tweet.id">
      <Tweets :tweet="tweet" />
    </div>
  </div>
</template>

<script>
import TweetInput from "../components/TweetInput.vue";
import Tweets from "../components/Tweets.vue";
import { mapGetters } from "vuex";
export default {
  components: { TweetInput, Tweets },
  computed: {
    ...mapGetters(["getUser", "getUsers", "getTweets"]),
    filterTweets() {
      return this.getTweets
        .filter(
          (tweet) =>
            this.getUser.following.includes(tweet.user) ||
            tweet.user === this.getUser.id
        )
        .map((x) => {
          const { name, handle, avatar } = this.getUsers.find(
            (user) => user.id === x.user
          );
          return {
            ...x,
            name,
            handle,
            avatar,
          };
        })
        .reverse();
    },
  },
};
</script>