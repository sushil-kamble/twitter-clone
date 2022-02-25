<template>
  <div class="flex border-b-2 p-4">
    <div class="mr-4 flex-none">
      <router-link
        :to="{ name: 'Profile', params: { handle: tweet.user.handle } }"
      >
        <img
          :src="tweet.user.avatar"
          class="h-12 w-12 rounded-full flex-none border-2"
        />
      </router-link>
    </div>
    <div class="flex-1">
      <span
        class="font-bold mr-2 cursor-pointer"
        @click="
          $router.push({
            name: 'Profile',
            params: { handle: tweet.user.handle },
          })
        "
        >{{ tweet.user.name }}
      </span>
      <span class="mr-2">@{{ tweet.user.handle }}</span> ·
      <span>{{ formatDate(tweet.created_at) }}</span>
      <p class="whitespace-pre">
        {{ tweet.content }}
      </p>
      <div class="mt-2 flex justify-between">
        <button class="flex items-center gap-4">
          <i class="bx bx-comment-dots text-2xl"></i>
          <span class="text-secondary text-base"> - </span>
        </button>
        <button class="flex items-center gap-4">
          <i class="bx bx-trending-up text-2xl"></i>
          <span class="text-secondary text-base"> - </span>
        </button>
        <button class="flex items-center gap-4" @click="toogleLike">
          <i
            :class="`bx bx-heart text-2xl  ${tweet.isLiked && 'text-red-600'}`"
          ></i>
          <span class="text-secondary text-base">{{
            tweet.tweetLikes.length
          }}</span>
        </button>
        <button class="flex items-center gap-4">
          <i class="bx bx-upload text-2xl mr-6"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).format("lll");
    },
    toogleLike() {
      this.$store.dispatch("toggleLike", this.tweet.id);
    },
  },
};
</script>
