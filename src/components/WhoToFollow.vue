<template>
  <div>
    <h1 class="px-4 my-2">Who to Follow</h1>
    <div v-for="user in users" :key="user.id">
      <FollowCard
        :id="user.id"
        :name="user.name"
        :handle="user.handle"
        :bio="user.bio"
        :following="user.following"
        @toggle="handleToggle"
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
          name: "Sushil Kamble",
          handle: "sushilkamble",
          bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, qui! Deleniti incidunt aspernatur repellat blanditiis pariatur, doloremque cum dignissimos quos?",
          following: true,
        },
        {
          id: 2,
          name: "Sushil Kamble",
          handle: "sushilkamble",
          bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, qui! Deleniti incidunt aspernatur repellat blanditiis pariatur, doloremque cum dignissimos quos?",
          following: true,
        },
        {
          id: 3,
          name: "Sushil Kamble",
          handle: "sushilkamble",
          bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, qui! Deleniti incidunt aspernatur repellat blanditiis pariatur, doloremque cum dignissimos quos?",
          following: false,
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