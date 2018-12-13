<template>
  <div id="sidebar" :style="{width: sidebarWidth + 'px'}">
    <h2>Logo</h2>
    <o-menu active="current" :collapse="collapse" :data="menu" class="menu"/>
  </div>
</template>

<script>
import { bindComputed } from "@okvue/vuex-bind";
export default {
  name: "sidebar",
  extends: {
    computed: bindComputed(
      "sidebarLock",
      "sidebarWidth",
      "canMenuMultipleExpand"
    )
  },
  methods: {
    logoClick() {
      if (!this.sidebarLock) {
        this.collapse = !this.collapse;
      }
    }
  },
  data() {
    this.current = self.location.pathname;
    return {
      collapse: false,
      menu: [
        {
          name: "element",
          label: "Element通用组件",
          url: "/element",
          icon: "el-icon-menu"
        },
        {
          name: "special",
          label: "页面",
          icon: "el-icon-menu",
          children: [
            {
              group: "分组",
              children: [
                {
                  name: "button",
                  label: "设置页面",
                  url: "/setting",
                  icon: "el-icon-menu"
                }
              ]
            }
          ]
        },
        {
          group: "特别分组",
          children: [
            {
              name: "outlink",
              label: "外部链接",
              url: "http://baidu.com",
              target: "blank",
              icon: "el-icon-menu"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss">
#sidebar {
  background-color: #f5f5f5;
  h2 {
    text-align: center;
  }
  z-index: 1;
  position: relative;
  background-size: cover;
  background-position: center center;

  .menu {
    position: relative;
    z-index: 2;
  }
}
</style>
