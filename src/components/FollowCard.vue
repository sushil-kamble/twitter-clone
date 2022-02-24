<template>
  <div class="flex mb-2 justify-between">
    <img
      :src="avatar"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-2 cursor-pointer border-2"
      @click="
        $router.push({
          name: 'Profile',
          params: { handle: handle },
        })
      "
    />
    <div class="w-full">
      <div class="flex justify-between items-center">
        <div class="mr-4">
          <p class="">{{ name }}</p>
          <p class="text-sm">@{{ handle }}</p>
        </div>
        <button
          class="t-btn rounded-2xl bg-primary text-white text-sm"
          @click="handleToggle"
        >
          {{ following ? "Following" : "Follow" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name,
    id: {
      type: Number,
      required: true,
    },
    handle: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },

    following: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleToggle() {
      this.$store.dispatch("toggleFollow", this.id);
    },
  },
};
</script>
