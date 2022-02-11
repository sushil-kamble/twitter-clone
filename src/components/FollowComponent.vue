<template>
  <div>
    <h1 class="pb-2 border-b-2">Who to follow</h1>
    <div v-for="user in filterUsers" :key="user.id" class="mt-2">
      <FollowCard
        :id="user.id"
        :name="user.name"
        :avatar="user.avatar"
        :handle="user.handle"
        :following="user.following"
        @toggle="handleToggle"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FollowCard from "./FollowCard.vue";
export default {
  components: { FollowCard },
  computed: {
    ...mapGetters(["getUsers"]),
    filterUsers() {
      return this.getUsers.filter((user) => !user.mainPage && user.id !== 0);
    },
  },
  methods: {
    handleToggle(id) {
      this.$store.commit("toggleFollow", id);
    },
  },
};
</script>