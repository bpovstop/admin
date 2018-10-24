<template>
    <el-dropdown hide-on-click @command="exec">
        <div id="avatar" :style="{backgroundImage: 'url(' + src.url + ')'}"/>
        <el-dropdown-menu slot="dropdown">
            <span class="welcome-text">Welcome <strong>{{src.name}}</strong></span>
            <el-dropdown-item divided command="route@/profile">个人信息</el-dropdown-item>
            <el-dropdown-item command="route@/setting">设置</el-dropdown-item>
            <el-dropdown-item divided command="event@logout">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<style lang="stylus" scoped>
#avatar {
  overflow: hidden;
  width: 34px;
  height: 34px;
  border: 2px solid transparent;
  border-radius: 20px;
  background-size: contain;
  box-sizing: border-box;
  background-clip: content-box;

  &:hover {
    border-color: green;
  }
}

.welcome-text {
  padding-left: 20px;
  padding-right: 20px;
  font-size: 12px;
}
</style>

<script>
export default {
  name: "avatar",
  props: {
    src: Object
  },
  methods: {
    logout() {
      console.log("logout");
    },
    exec(command) {
      const cmd = command.split("@");
      switch (cmd[0]) {
        case "event":
          this[cmd[1]](cmd[2]);
          break;
        case "route":
        default:
          this.$router.push({ path: cmd[1] });
          break;
      }
    }
  }
};
</script>

