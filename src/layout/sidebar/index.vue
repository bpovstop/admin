<template>
    <div id="sidebar" :style="{backgroundImage: 'url(' + sidebarImage + ')'}">
        <logo @click.native="logoClick"/>
        <div class="inner">
          <el-menu :router="true" :default-active="current" :collapse="collapse" class="sidebar-menu">
            <menu-cycle v-for="item in menu" :key="item.name" :menu="item" :close="collapse"/>
          </el-menu>
        </div>
    </div>
</template>

<style lang="stylus">
#sidebar {
  z-index: 1;
  position: relative;
  background-size: cover;
  background-position: center center;

  .inner {
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

  &:not(.el-menu--collapse) {
    width: 240px;
  }
}
</style>

<script>
import logo from "@/components/logo";
import menuCycle from "./menu-cycle";
export default {
  name: "sidebar",
  components: {
    [menuCycle.name]: menuCycle,
    [logo.name]: logo
  },
  methods: {
    logoClick() {
      console.log("click", this.collapse);
      this.collapse = !this.collapse;
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
              url: "/proprietary#markdown",
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
      ],
      sidebarImage:
        "https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg"
    };
  }
};
</script>

