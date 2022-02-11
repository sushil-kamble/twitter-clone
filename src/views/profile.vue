<template>
  <div>
    <div v-if="getCurrentUser">
      <div class="mb-24">
        <div class="cover">
          <img src="../assets/banner.png" alt="banner" id="banner-img" />
          <img
            :src="getCurrentUser.avatar"
            alt="avatar"
            class="profile border-2 rounded-full"
          />
        </div>
      </div>
      <div class="px-4 pb-2 border-b-2">
        <h2 class="font-bold">{{ getCurrentUser.name }}</h2>
        <p>@{{ getCurrentUser.handle }}</p>
        <p class="text-sm text-gray-500">
          {{ getCurrentUser.bio }}
        </p>
        <div class="mt-2 flex gap-4">
          <p>
            <span class="mr-1 font-bold">
              {{
                getCurrentUser.handle === getUser.handle
                  ? getUser.following.length
                  : "-"
              }} </span
            ><span>Following</span>
          </p>
          <p>
            <span class="mr-1 font-bold">
              {{
                getCurrentUser.handle === getUser.handle
                  ? "-"
                  : getCurrentUser.followers
              }} </span
            ><span>Followers</span>
          </p>
        </div>
      </div>
      <div v-for="tweet in filteredTweets" :key="tweet.id">
        <Tweets :tweet="tweet" />
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

  computed: {
    ...mapGetters(["getUsers", "getUser", "getTweets"]),
    getCurrentUser() {
      return this.getUsers.find(
        (user) => user.handle === this.$route.params.id
      );
    },
    filteredTweets() {
      return this.getTweets
        .filter((tweet) => tweet.handle === this.$route.params.id)
        .map((x) => {
          const { name, avatar } = this.getUsers.find(
            (user) => user.id === x.user
          );
          return {
            ...x,
            name,
            avatar,
          };
        })
        .reverse();
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