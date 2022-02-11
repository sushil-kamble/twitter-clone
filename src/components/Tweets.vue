<template>
  <div class="flex border-b-2 p-4">
    <div class="mr-4 flex-none">
      <router-link :to="{ name: 'Profile', params: { id: tweet.handle } }">
        <img
          :src="tweet.avatar"
          class="h-12 w-12 rounded-full flex-none border-2"
        />
      </router-link>
    </div>
    <div class="flex-1">
      <span
        class="font-bold mr-2 cursor-pointer"
        @click="$router.push({ name: 'Profile', params: { id: tweet.handle } })"
        >{{ tweet.name }}
      </span>
      <span class="mr-2">@{{ tweet.handle }}</span> ·
      <span>{{ tweet.timestamp }}</span>
      <p>
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
        <button
          :class="`flex items-center gap-4 ${tweet.liked && 'text-red-600'}`"
          @click="toogleLike"
        >
          <i class="bx bx-heart text-2xl"></i>
          <span class="text-secondary text-base">{{ tweet.likes }}</span>
        </button>
        <button class="flex items-center gap-4">
          <i class="bx bx-upload text-2xl mr-6"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toogleLike() {
      this.$store.commit("toogleLike", this.tweet.id);
    },
  },
};
</script>