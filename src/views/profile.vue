<template>
  <div>
    <div v-if="profileUser">
      <div class="mb-24">
        <div class="cover">
          <img src="../assets/banner.png" alt="banner" id="banner-img" />
          <img
            :src="profileUser.avatar"
            alt="avatar"
            class="profile border-2 rounded-full"
          />
        </div>
      </div>
      <div class="px-4 pb-2 border-b-2">
        <h2 class="font-bold">{{ profileUser.handle }}</h2>
        <p>@{{ profileUser.handle }}</p>
        <p class="text-sm text-gray-500">
          {{ profileUser.bio }}
        </p>
        <div class="mt-2 flex gap-4">
          <p>
            <span class="mr-1 font-bold">
              {{ profileUser.following.length }} </span
            ><span>Following</span>
          </p>
          <p>
            <span class="mr-1 font-bold">
              {{ profileUser.followers.length }} </span
            ><span>Followers</span>
          </p>
        </div>
      </div>

      <div v-for="tweet in filteredTweets" :key="tweet.id">
        <Tweets :tweet="tweet" />
      </div>
      <div v-if="filteredTweets.length === 0" class="p-3">
        <h2>Follow the user to see their Tweets</h2>
      </div>
    </div>
    <div v-else class="px-4">
      <h1>Page Not Found</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tweets from "../components/Tweets.vue";
export default {
  name: "Profile",
  components: { Tweets },
  data() {
    return {
      profileData: null,
      tweets: [],
    };
  },
  mounted() {
    if (this.allTweets.length === 0) {
      this.$store.dispatch("loadTweets");
    }
  },
  computed: {
    ...mapGetters(["currentUser", "allUsers", "allTweets"]),
    profileUser() {
      return this.allUsers.find(
        (user) => user.handle === this.$route.params.handle
      );
    },
    filteredTweets() {
      return this.allTweets.filter(
        (tweet) => tweet.user.handle === this.$route.params.handle
      );
    },
  },
};
</script>

<style scoped>
.cover {
  position: relative;
}
.profile {
  position: absolute;
  width: 150px;
  height: 150px;
  bottom: -75px;
  left: 1em;
  z-index: 10;
}
#banner-img {
  height: 200px;
  width: 100%;
}
</style>
