<template>
  <div>
    <h1 class="mb-2 border-b-2 p-4">Register</h1>
    <form @submit.prevent="handleRegister" class="p-4 border-b-2">
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
      <div class="my-4">
        <label
          class="inline-flex items-center text-sm font-bold mb-2"
          for="confirmPassword"
        >
          <i class="bx bx-key mr-1"></i>
          Confirm Password
        </label>
        <input
          class="t-input block w-full"
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          v-model="confirmPassword"
        />
      </div>
      <button
        type="submit"
        class="t-btn inline-flex items-center bg-primary text-white rounded-lg"
      >
        <i class="bx bx-log-in mr-4"></i>
        Register
      </button>
    </form>
    <p
      v-if="confirmPassword.length > 0 && !samePassword"
      class="p-4 m-2 text-red-500 font-bold bg-gray-100 rounded-lg"
    >
      Password not same
    </p>
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
  name: "Register",
  data() {
    return {
      name: "",
      password: "",
      confirmPassword: "",
      message: "",
    };
  },
  computed: {
    samePassword() {
      return (
        this.confirmPassword.length > 0 &&
        this.password === this.confirmPassword
      );
    },
  },
  methods: {
    handleRegister() {
      if (this.name.length > 0 && this.samePassword) {
        this.$store.commit("setUser", this.name);
        this.$router.push("/");
      } else {
        this.message = "Fill all fields";
      }
    },
  },
};
</script>
