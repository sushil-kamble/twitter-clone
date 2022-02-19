<template>
  <nav class="py-4 sticky top-0 z-20 transition-effect bg-white">
    <div class="main-set flex items-center justify-between">
      <div class="flex items-center">
        <i class="bx bxl-twitter text-xl md:text-3xl text-primary"></i>
        <h1 class="ml-2">Twitter Clone</h1>
      </div>
      <form class="lg:mr-28" @submit.prevent="handleSearch">
        <input
          type="text"
          class="t-input"
          placeholder="Search"
          v-model="search"
        />
        <button type="submit" class="t-btn bg-primary rounded text-white ml-4">
          Search
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    handleSearch() {
      this.$router.push({
        name: "Profile",
        params: { id: this.search.toLowerCase() },
      });
      this.search = "";
    },
  },
};
</script>
