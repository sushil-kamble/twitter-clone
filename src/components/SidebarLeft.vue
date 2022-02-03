<template>
  <div class="border-r-2">
    <ul class="flex flex-col gap-2 fixed">
      <li v-for="(link, idx) in links" :key="idx" class="flex items-center">
        <i :class="`${link.icon} mr-4 text-4xl`"></i>
        <router-link :to="link.to" class="text-2xl hidden md:block">{{
          link.text
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
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
};
</script>