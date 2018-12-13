<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="scss">
html {
  overflow: hidden;
}

body {
  margin: 0;
  font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica",
    "Arial", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100vw;
  height: 100vh;
}

div {
  box-sizing: border-box;
}
</style>
