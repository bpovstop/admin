<template>
  <el-tabs v-model="active" type="card" closable @tab-remove="removeTab" :before-leave="pushRoute">
    <el-tab-pane
      v-if="!(hideTabWhenSingle && tabs && tabs.length === 1)"
      v-for="(item, index) in tabs"
      :key="index"
      :label="item && item[1] && item[1].title"
      :name="item && item[0]"
    />
  </el-tabs>
</template>
<script>
export default {
  name: "tab-route",
  props: {
    hideTabWhenSingle: {
      type: Boolean,
      default: true
    }
  },
  beforeCreate() {
    this.history = this.$storage.tabs || new Map();
  },
  created() {
    this.initTab(this.$route);
  },
  methods: {
    addTab() {},
    removeTab() {},
    pushRoute(path) {
      if (path != 0) {
        this.$router.push({ path });
      }
    },
    initTab(route) {
      if (!this.history.has(route.path) && route.path !== "/") {
        this.history.set(route.path, route.meta);
      }
      this.tabs = [...this.history];
      this.active = route.path;
    }
  },
  watch: {
    $route: function(to) {
      this.initTab(to);
    }
  },
  data() {
    return {
      active: null,
      tabs: [...this.history]
    };
  }
};
</script>
