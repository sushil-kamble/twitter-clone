<template>
  <div class="border-r-2">
    <div class="flex flex-col fixed" v-if="currentUser" style="height: 88vh">
      <ul class="flex flex-col gap-3 flex-1">
        <router-link
          :to="
            link.to === '/profile'
              ? { name: 'Profile', params: { handle: currentUser.handle } }
              : link.to
          "
          class="flex items-center px-4 py-2 cursor-pointer rounded-r-2xl hover:text-primary"
          v-for="(link, idx) in links"
          :key="idx"
        >
          <i :class="`${link.icon} mr-4 text-3xl`"></i>
          <span class="text-2xl hidden md:block">
            {{ link.text }}
          </span>
        </router-link>
        <li
          class="flex items-center px-4 py-2 cursor-pointer rounded-r-2xl hover:bg-gray-100 text-red-500"
          @click="handleLogout"
        >
          <i class="bx bx-log-out mr-4 text-3xl"></i>
          <button class="text-2xl hidden md:block">Logout</button>
        </li>
      </ul>
      <div
        class="py-2 cursor-pointer flex hover:bg-gray-100 px-4 rounded-r-2xl"
        @click="
          $router.push({
            name: 'Profile',
            params: { handle: currentUser.handle },
          })
        "
      >
        <img
          class="rounded-full h-12 w-12 mr-4"
          :src="currentUser.avatar"
          alt="avatar"
        />
        <div class="hidden md:block">
          <p>{{ currentUser.name }}</p>
          <p>@{{ currentUser.handle }}</p>
        </div>
      </div>
    </div>
    <ul v-else class="flex flex-col gap-2 fixed">
      <router-link
        :to="{ name: 'Login' }"
        class="flex items-center py-2 cursor-pointer hover:bg-gray-100 px-4 rounded-r-2xl"
      >
        <i class="bx bx-log-in mr-4 text-4xl"></i>
        <span class="text-2xl hidden md:block">Login</span>
      </router-link>
      <router-link
        :to="{ name: 'Register' }"
        class="flex items-center py-2 cursor-pointer hover:bg-gray-100 px-4 rounded-r-2xl"
      >
        <i class="bx bx-edit-alt mr-4 text-4xl"></i>
        <span class="text-2xl hidden md:block">Register</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      links: [
        {
          text: "Home",
          to: "/",
          icon: "bx bx-home",
        },
        {
          text: "Explore",
          to: "/explore",
          icon: "bx bx-hash",
        },
        {
          text: "Notifications",
          to: "/notifications",
          icon: "bx bx-bell",
        },
        {
          text: "Message",
          to: "/message",
          icon: "bx bx-envelope",
        },
        {
          text: "Bookmarks",
          to: "/bookmarks",
          icon: "bx bx-book-content",
        },
        {
          text: "Lists",
          to: "/lists",
          icon: "bx bx-list-ul",
        },
        {
          text: "Profile",
          to: "/profile",
          icon: "bx bx-user",
        },
        {
          text: "More",
          to: "/more",
          icon: "bx bx-dots-horizontal",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    handleLogout() {
      this.$store.commit("RESET_USER");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
