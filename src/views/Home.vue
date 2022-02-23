<template>
  <div>
    <TweetInput />
    <!-- <div v-for="tweet in filterTweets" :key="tweet.id">
      <Tweets :tweet="tweet" />
    </div> -->
  </div>
</template>

<script>
import TweetInput from "../components/TweetInput.vue";
export default {
  components: { TweetInput },
};
</script>
