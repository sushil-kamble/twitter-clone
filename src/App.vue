<template>
  <div>
    <Navbar />
    <div class="flex min-page main-set">
      <SidebarLeft class="w-1/6 md:w-1/4" />
      <div class="flex-1">
        <router-view class="min-page" />
      </div>
      <SidebarRight class="w-1/3 hidden lg:block" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import SidebarLeft from "./components/SidebarLeft.vue";
import SidebarRight from "./components/SidebarRight.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    SidebarLeft,
    SidebarRight,
  },
};
</script>

<style scoped>
.min-page {
  min-height: 75vh;
}
</style>

