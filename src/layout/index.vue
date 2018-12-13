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
        <router-view :style="{flex:1}"/>
      </o-view>
    </o-view>
  </o-view>
</template>

<style lang="scss" scoped>
.main {
  background-color: #ebebeb;
}
</style>
