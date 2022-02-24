<template>
  <div class="border-l-2 pl-4">
    <div class="fixed" style="width: 300px">
      <WhatsHappening class="bg-gray-50 rounded-lg p-3 mb-4" />
      <FollowComponent class="bg-gray-50 rounded-lg p-3" v-if="isLoggedIn" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FollowComponent from "./FollowComponent.vue";
import WhatsHappening from "./WhatsHappening.vue";
export default {
  components: { FollowComponent, WhatsHappening },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>
