<template>
  <component
    :is="componentName"
    :index="menu.name"
    :route="fixRoutePath(menu)"
    :disabled="menu.disable"
    :show-timeout="0"
    :hide-timeout="0"
  >
    <template v-if="flag" slot="title">
      <i :class="menu.icon" v-if="menu.icon"></i>
      <i class="el-icon-minus" v-if="menu.group && close"></i>
      <span
        slot="title"
        v-if="!menu.group"
      >{{ !menu.children ? menu.label : close ? "" : menu.label }}</span>
      <span slot="title" v-if="menu.group && !close">{{ menu.group }}</span>
      <a class="link" :href="menu.url" :target="getTarget(menu.target)" v-if="isLink"/>
    </template>
    <i :class="menu.icon" v-if="!flag && menu.icon"></i>
    <i class="el-icon-minus" v-if="!flag && menu.group && close"></i>
    <span
      slot="title"
      v-if="!flag && !menu.group"
    >{{ !menu.children ? menu.label : close ? "" : menu.label }}</span>
    <span slot="title" v-if="!flag && menu.group && !close">{{ menu.group }}</span>
    <a class="link" :href="menu.url" :target="getTarget(menu.target)" v-if="isLink"/>
    <menu-cycle v-if="menu.children" v-for="item in menu.children" :key="item.name" :menu="item"/>
  </component>
</template>

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
      const {
        name /* eslint-disable-line no-unused-vars */,
        url,
        label,
        icon,
        ...rest
      } = route;

      const routeObj = {
        meta: { label, icon },
        ...rest,
        path: /\/\//.test(url) ? self.location.hash || "/#" : url
      };
      return routeObj;
    },
    getTarget(value) {
      if (!value) return null;
      return "_" + value;
    }
  },
  data() {
    const { children, url, group } = this.menu || {};
    this.flag = Array.isArray(children) && children.length > 0;
    this.defaultHook = self.location.hash;
    this.componentName = group
      ? "el-menu-item-group"
      : this.flag
        ? "el-submenu"
        : "el-menu-item";
    this.isLink = url && /\/\//.test(url);
    return {};
  }
};
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  top: 0;
  height: 100%;
  position: absolute;
  width: 100%;
  margin-left: -20px;
}
</style>
