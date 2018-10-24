<template>
  <o-view full>
    <o-view>
      <router-view name="sidebar"/>
    </o-view>
    <o-view column flex>
      <o-view id="header">
        <router-view name="header"/>
      </o-view>
      <o-view flex id="container">
        <router-view/>
      </o-view>
    </o-view>
  </o-view>
</template>
<style lang="stylus" scoped>
#container > div {
  width: 100%;
  overflow: auto;
}
</style>

<script>
export default {
  created() {
    // TODO get menu and other data ready
    // this.$fetch("menu").then(data =>)
  }
};
</script>

