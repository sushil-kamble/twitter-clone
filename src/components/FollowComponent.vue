<template>
  <div>
    <h1 class="pb-2 border-b-2">Who to follow</h1>
    <div v-for="user in filterUsers" :key="user.id" class="mt-2">
      <FollowCard
        :id="user.id"
        :name="user.name"
        :avatar="user.avatar"
        :handle="user.handle"
        :following="user.isFollowing"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FollowCard from "./FollowCard.vue";
export default {
  components: { FollowCard },
  created() {
    this.$store.dispatch("getAllUsers");
  },
  computed: {
    ...mapGetters(["currentUser", "allUsers"]),
    filterUsers() {
      return this.allUsers.filter((user) => user.id !== this.currentUser.id);
    },
  },
};
</script>
