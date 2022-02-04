<template>
  <div class="border-l-2 pl-4">
    <div class="fixed" style="width: 300px">
      <WhatsHappening class="bg-gray-50 rounded-lg p-3 mb-4" />
      <MightLike class="bg-gray-50 rounded-lg p-3" v-if="getUser.isLoggedIn" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MightLike from "./MightLike.vue";
import WhatsHappening from "./WhatsHappening.vue";
export default {
  components: { MightLike, WhatsHappening },
  computed: {
    ...mapGetters(["getUser"]),
  },
};
</script>
