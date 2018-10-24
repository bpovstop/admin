<template>
    <component :is="wrapper" class="menu-cycle-wrapper" :href="wrapper === 'a' && menu.url" :target="getTarget(menu.target)">
        <component :is="name" :index="menu.url || menu.name" :route="fixRoutePath(menu)" :disabled="menu.disable">
            <template slot="title">
                <i :class="menu.icon" v-if="menu.icon"></i>
                <i class="el-icon-minus" v-if="menu.group && close"></i>
                <span slot="title" v-if="!menu.group">{{ !menu.children ? menu.label : close ? "" : menu.label }}</span>
                <span slot="title" v-if="menu.group && !close">{{ menu.group }}</span>
            </template>
            <menu-cycle v-if="menu.children" v-for="item in menu.children" :key="item.name" :menu="item"/>
        </component>
    </component>
</template>
<style lang="stylus" scoped>
.menu-cycle-wrapper {
    display: block;
}
</style>

<script>
export default {
  name: "menu-cycle",
  props: {
    menu: Object,
    close: Boolean
  },
  methods: {
    fixRoutePath(route) {
      if (!route) return null;
      const { name, url, ...rest } = route;

      return {
        ...rest,
        path: /\/\//.test(url) ? self.location.hash || "/#" : url
      };
    },
    getTarget(value) {
      if (!value) return null;
      return "_" + value;
    }
  },
  data() {
    const { children, url, group } = this.menu || {};
    const flag = Array.isArray(children) && children.length > 0;
    this.defaultHook = self.location.hash;
    this.wrapper = url && /\/\//.test(url) ? "a" : "div";
    this.name = group
      ? "el-menu-item-group"
      : flag
        ? "el-submenu"
        : "el-menu-item";
    return {};
  }
};
</script>
