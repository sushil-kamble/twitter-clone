<template>
  <div>
    <div class="block relative">
      <div class="cover">
        <img src="../assets/banner.png" alt="banner" />
      </div>
      <div class="profile">
        <img :src="getUser.avatar" alt="avatar" class="border-2" />
      </div>
    </div>
    <div class="px-4 pb-2 border-b-2">
      <h2 class="font-bold">{{ getUser.name }}</h2>
      <p>{{ getUser.handle }}</p>
      <p class="text-sm text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque sed
        nostrum cumque officia sit, asperiores doloribus libero ex? Eum, fuga.
      </p>
      <div class="mt-2 flex flex-wrap gap-4">
        <p class="flex items-center">
          <i class="bx bx-location-plus mr-1"></i> <span>Mumbai, India</span>
        </p>
        <p class="flex items-center">
          <i class="bx bx-link mr-1"></i>
          <a
            href="https://www.sushilkamble.me/"
            target="_blank"
            rel="noopener"
            class="text-primary hover:underline"
            >sushilkamble.me
          </a>
        </p>
        <p class="flex items-center">
          <i class="bx bx-cake mr-1"></i> <span>Born February 21, 2000</span>
        </p>
      </div>
      <p><i class="bx bx-calendar"></i> <span>Joined October 2019</span></p>
      <div class="mt-2 flex gap-4">
        <p>
          <span class="mr-1 font-bold">{{ getFollowing }}</span
          ><span>Following</span>
        </p>
        <p><span class="mr-1 font-bold">70</span><span>Followers</span></p>
      </div>
    </div>
    <WhoToFollow feedPage />
  </div>
</template>

<script>
import WhoToFollow from "@/components/WhoToFollow.vue";
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  components: { WhoToFollow },
  computed: {
    ...mapGetters(["getUser"]),
    getFollowing() {
      return this.getUser.following.length;
    },
  },
};
</script>

<style scoped>
.cover {
  height: 400px;
}
.profile {
  display: block;
  position: relative;
  width: 150px;
  height: 150px;
  margin: -280px 0 10px 20px;
  z-index: 10;
}
.cover img {
  height: 200px;
  width: 100%;
}
.profile img {
  max-width: 100%;
  max-height: 660px;
  border-radius: 50%;
  z-index: 10;
}
</style>