<template>
  <div>
    <h1 class="mb-2 border-b-2 p-4">Login</h1>
    <form @submit.prevent="handleLogin" class="p-4 border-b-2">
      <div>
        <label
          class="inline-flex items-center text-sm font-bold mb-2"
          for="name"
        >
          <i class="bx bx-envelope mr-1"></i>
          Name
        </label>
        <input
          class="t-input block w-full"
          type="text"
          id="name"
          placeholder="Name"
          v-model="name"
        />
      </div>
      <div class="my-4">
        <label
          class="inline-flex items-center text-sm font-bold mb-2"
          for="password"
        >
          <i class="bx bx-key mr-1"></i>
          Password
        </label>
        <input
          class="t-input block w-full"
          type="password"
          id="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button
        type="submit"
        class="t-btn inline-flex items-center bg-primary text-white rounded-lg"
      >
        <i class="bx bx-log-in mr-4"></i>
        Login
      </button>
    </form>
    <p
      v-if="message.length > 0"
      class="p-4 m-2 text-red-500 font-bold bg-gray-100 rounded-lg"
    >
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
      message: "",
    };
  },
  methods: {
    handleLogin() {
      if (this.name.length > 0 && this.password === "admin") {
        this.$store.commit("setUser", this.name);
        this.$router.push("/");
      } else {
        this.message = "Invalid credentials";
      }
    },
  },
};
</script>