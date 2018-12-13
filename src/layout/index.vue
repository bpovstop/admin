<template>
  <o-view full>
    <o-view>
      <router-view name="sidebar"/>
    </o-view>
    <o-view column flex ovef>
      <o-view>
        <router-view name="header"/>
      </o-view>
      <o-view flex column ovef="auto" class="main">
        <tab-route/>
        <keep-alive :max="10">
          <router-view :style="{flex:1}"/>
        </keep-alive>
      </o-view>
    </o-view>
  </o-view>
</template>
<script>
import Tab from "./tab";
export default {
  components: {
    [Tab.name]: Tab
  }
};
</script>

<style lang="scss" scoped>
.main {
  background-color: #ebebeb;
}
</style>
