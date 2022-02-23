<template>
  <div>
    <div v-if="profileData">
      <div class="mb-24">
        <div class="cover">
          <img src="../assets/banner.png" alt="banner" id="banner-img" />
          <img
            :src="profileData.avatar"
            alt="avatar"
            class="profile border-2 rounded-full"
          />
        </div>
      </div>
      <div class="px-4 pb-2 border-b-2">
        <h2 class="font-bold">{{ profileData.handle }}</h2>
        <p>@{{ profileData.handle }}</p>
        <p class="text-sm text-gray-500">
          {{ profileData.bio }}
        </p>
        <div class="mt-2 flex gap-4">
          <p><span class="mr-1 font-bold"> - </span><span>Following</span></p>
          <p><span class="mr-1 font-bold"> - </span><span>Followers</span></p>
        </div>
      </div>
      <div v-for="tweet in tweets" :key="tweet.id">
        <Tweets :tweet="tweet" />
      </div>
    </div>
    <div v-else class="px-4">
      <h1>Page Not Found</h1>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
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
  async created() {
    const getUserData = await fetch(
      "http://localhost:3000/user/" + this.$route.params.handle,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const getUser = await getUserData.json();
    const getAllTweetsByUser = await fetch(
      "http://localhost:3000/tweet/all/" + getUser.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const allTweetsByUser = await getAllTweetsByUser.json();
    console.log(getUser, allTweetsByUser);
    this.profileData = getUser;
    this.tweets = allTweetsByUser;
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
