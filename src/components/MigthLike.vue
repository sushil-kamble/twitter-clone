<template>
  <div>
    <h1 class="pb-2 border-b-2">You Might Like</h1>
    <div v-for="user in users" :key="user.id" class="mt-2">
      <FollowCard
        :id="user.id"
        :name="user.name"
        :handle="user.handle"
        :following="user.following"
        @toggle="handleToggle"
        small
      />
    </div>
  </div>
</template>

<script>
import FollowCard from "./FollowCard.vue";
export default {
  components: { FollowCard },
  data() {
    return {
      users: [
        {
          id: 1,
          name: "Angular",
          handle: "sushilkamble",
          following: false,
        },
        {
          id: 2,
          name: "Vue",
          handle: "vue",
          following: true,
        },
      ],
    };
  },
  methods: {
    handleToggle(id) {
      const user = this.users.find((user) => user.id === id);
      user.following = !user.following;
    },
  },
};
</script>