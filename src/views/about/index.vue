<template>
  <div class="about">
    <h1>This is an about page</h1>
        <router-link to="/">Home</router-link>
    <button @click="login">login</button>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$route.params);
  },
  methods: {
    login() {
      window.auth = true;
      this.$router.back();
    }
  }
};
</script>

