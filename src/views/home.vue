<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <router-link to="/about">About</router-link> |
    <router-link to="/404">404</router-link> |
    <router-link to="/500">500</router-link> |
    <router-link to="/444">404 not found</router-link>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
