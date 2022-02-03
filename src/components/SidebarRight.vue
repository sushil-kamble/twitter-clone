<template>
  <div class="border-l-2 pl-4">
    <div class="fixed" style="width: 300px">
      <WhatsHappening class="bg-gray-50 rounded-lg p-3 mb-4" />
      <MigthLike class="bg-gray-50 rounded-lg p-3" />
    </div>
  </div>
</template>

<script>
import MigthLike from "./MigthLike.vue";
import WhatsHappening from "./WhatsHappening.vue";
export default {
  components: { MigthLike, WhatsHappening },
};
</script>
