<template>
    <el-menu :router="true" :default-active="active" :collapse="collapse" class="sidebar-menu" :collapse-transition="false">
        <menu-cycle v-for="item in data" :key="item.name" :menu="item" :close="collapse"/>
    </el-menu>
</template>
<script>
import menuCycle from "./menu-cycle";
export default {
  name: "o-menu",
  components: {
    [menuCycle.name]: menuCycle
  },
  props: {
    active: String,
    collapse: Boolean,
    data: Array
  }
};
</script>
