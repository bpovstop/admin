<template>
  <o-view full>
    <o-view>
      <router-view name="sidebar"/>
    </o-view>
    <o-view column flex ovef>
      <o-view id="header">
        <router-view name="header"/>
      </o-view>
      <o-view flex ovef="auto">
        <router-view :style="{ minWidth, width: '100%', boxSizing: 'border-box' }"/>
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
import { bindComputed } from "@okvue/vuex-bind";
export default {
  created() {
    // TODO get menu and other data ready
    // this.$fetch("menu").then(data =>)
  },
  extends: {
    computed: bindComputed("pageMinWidth", "sidebarWidth")
  },
  computed: {
    minWidth() {
      return `${this.pageMinWidth - this.sidebarWidth}px`;
    }
  }
};
</script>

