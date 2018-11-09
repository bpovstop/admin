<template>
    <div id="sidebar" :style="{backgroundImage: 'url(' + sidebarImage + ')', width: sidebarWidth + 'px'}">
        <logo @click.native="logoClick"/>
        <o-menu active="current" :collapse="collapse" :data="menu" class="menu"/>
    </div>
</template>

<style lang="stylus">
#sidebar {
  z-index: 1;
  position: relative;
  background-size: cover;
  background-position: center center;

  .menu {
    position: relative;
    z-index: 2;
  }

  &::after {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    content: '';
    display: block;
    background: #000;
    opacity: 0.8;
  }
}

.href-in-menu {
  display: block;
}

.sidebar-menu {
  &.el-menu--collapse {
    .el-menu-item-group__title {
      .el-icon-minus {
        font-size: 1.5rem;
      }
    }
  }

}
</style>

<script>
import { bindComputed } from "@okvue/vuex-bind";
import logo from "@/components/logo";
import menuCycle from "./menu-cycle";
import menu from "@/components/menu";
export default {
  name: "sidebar",
  components: {
    [menu.name]: menu,
    [logo.name]: logo
  },
  extends: {
    computed: bindComputed(
      "sidebarLock",
      "sidebarWidth",
      "canMenuMultipleExpand",
      "sidebarImage"
    )
  },
  methods: {
    logoClick() {
      console.log(this)
      if (!this.sidebarLock) {
        this.collapse = !this.collapse;
      }
    }
  },
  data() {
    this.current = self.location.pathname;
    console.log(this.current);
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
          label: "特殊优化组件",
          icon: "el-icon-menu",
          children: [
            {
              group: "输入型",
              children: [
                {
                  name: "button",
                  label: "按钮",
                  url: "/nav/1-1",
                  icon: "el-icon-menu"
                }
              ]
            },
            {
              group: "功能型",
              children: [
                {
                  name: "name.nav-1-3",
                  label: "导航菜单-1-3",
                  url: "/nav/1-3",
                  icon: "el-icon-menu"
                }
              ]
            }
          ]
        },
        {
          name: "proprietary",
          label: "专有组件",
          url: "/proprietary",
          icon: "el-icon-menu",
          children: [
            {
              name: "monaco",
              label: "Monaco代码编辑器",
              url: "/proprietary#monaco",
              icon: "el-icon-menu"
            },
            {
              name: "markdown",
              label: "Markdown编辑器",
              url: "/proprietary/markdown",
              icon: "el-icon-menu"
            },
            {
              name: "richtext",
              label: "Richtext富文本编辑器",
              url: "/proprietary#richtext",
              icon: "el-icon-menu"
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

