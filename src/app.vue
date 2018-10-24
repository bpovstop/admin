<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="stylus">
html, body {
  height: 100%;
  overflow: hidden;
}

body {
  margin: 0;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100%;
  height: 100%;
}

.el-menu:not(.el-menu--popup) {
  background-color: transparent !important;
  border-right: none !important;
}

.el-submenu__title, .el-menu-item:not(el-menu--popup) {
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.13) !important;
  }

  &.is-active {
    background-color: hsla(0, 0%, 100%, 0.23) !important;
  }

  color: #fff !important;
}
</style>
