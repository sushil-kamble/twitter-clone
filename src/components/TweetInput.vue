<template>
  <div class="border-b-2 pb-4 px-1">
    <div class="flex" v-if="currentUser">
      <router-link :to="{ name: 'Profile' }">
        <img :src="currentUser.avatar" class="h-12 w-12 rounded-full mr-2"
      /></router-link>

      <textarea
        placeholder="What's happening?"
        class="flex-1 t-input"
        v-model="content"
      ></textarea>
    </div>
    <div class="flex justify-end mt-2">
      <button class="t-btn bg-primary text-white" @click="addTweet">
        Tweet
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TweetInput",
  data() {
    return {
      content: "",
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    addTweet() {
      this.$store.dispatch("postTweet", {
        content: this.content,
      });
    },
  },
};
</script>
