<template>
  <div>
    <h1 class="pb-2 border-b-2">What's happening</h1>
    <div v-for="(event, id) in events" :key="id" class="mt-2">
      <EventCard />
    </div>
  </div>
</template>

<script>
import EventCard from "./EventCard.vue";
export default {
  components: { EventCard },
  data() {
    return {
      events: [
        {
          status: "Cricket Trending",
          title: "#IPLAuction2022",
          tweets: "3.5K",
        },
        {
          status: "Trending in India",
          title: "#GATE2022",
          tweets: "12.8K",
        },
      ],
    };
  },
};
</script>