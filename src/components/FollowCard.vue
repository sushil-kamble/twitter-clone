<template>
  <div class="flex mb-2 justify-between">
    <img
      :src="avatar"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-2 cursor-pointer border-2"
      @click="
        $router.push({
          name: 'Profile',
          params: { id: handle },
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
      <p class="text-sm" v-if="bio">
        {{ bio }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
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
    bio: {
      type: String || null,
    },
    following: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleToggle() {
      this.$emit("toggle", this.id);
    },
  },
};
</script>