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
          Handle
        </label>
        <input
          class="t-input block w-full"
          type="text"
          id="name"
          placeholder="Handle"
          v-model="handle"
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
      handle: "",
      password: "",
      message: "",
    };
  },
  methods: {
    handleLogin() {
      this.$store
        .dispatch("loginUser", {
          handle: this.handle,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          this.message = err;
        });
    },
  },
};
</script>
