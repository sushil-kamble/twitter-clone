<template>
  <div>
    <TweetInput />
    <div v-for="tweet in allTweets" :key="tweet.id">
      <Tweets :tweet="tweet" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TweetInput from "../components/TweetInput.vue";
import Tweets from "../components/Tweets.vue";

export default {
  components: { TweetInput, Tweets },
  created() {
    this.$store.dispatch("loadTweets");
  },
  computed: {
    ...mapGetters(["currentUser", "allTweets"]),
  },
};
</script>
