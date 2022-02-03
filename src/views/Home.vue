<template>
  <div>
    <TweetInput />
    <Tweets />
    <Tweets />
    <Tweets />
    <Tweets />
    <Tweets />
    <Tweets />
    <Tweets />
    <Tweets />
    <Tweets />
  </div>
</template>

<script>
import TweetInput from "../components/TweetInput.vue";
import Tweets from "../components/Tweets.vue";
export default {
  components: { TweetInput, Tweets },
};
</script>