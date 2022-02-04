<template>
  <div>
    <p class="text-sm text-gray-500">{{ status }}</p>
    <p class="font-bold">{{ title }}</p>
    <p class="text-sm text-gray-500">{{ tweets }}</p>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    status: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tweets: {
      type: String,
      required: true,
    },
  },
};
</script>