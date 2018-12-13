<template>
  <div class="setting">
    <table>
      <tbody>
        <tr>
          <td>
            <p>侧边栏宽度</p>
          </td>
          <td>
            <el-input v-model="sidebarWidth" size="mini" :placeholder="sidebarWidth"/>
          </td>
          <td>
            <p>选择主题</p>
          </td>
          <td>
            <div class="color-picker">
              <div
                class="color"
                v-for="(theme, index) in themes"
                :key="theme.name + index"
                :style="{backgroundColor:theme.color}"
                data-theme-name="theme.name"
                @click="setTheme(theme)"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <p>侧边栏单列展开</p>
          </td>
          <td>
            <el-switch v-model="canMenuMultipleExpand"/>
          </td>
        </tr>
        <tr>
          <td>
            <p>侧边栏锁定</p>
          </td>
          <td>
            <el-switch v-model="sidebarLock"/>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { bindComputed } from "@okvue/vuex-bind";
export default {
  extends: {
    computed: bindComputed(
      "sidebarWidth",
      "canMenuMultipleExpand",
      "sidebarLock"
    )
  },
  methods: {
    setTheme(theme) {
      this.$setTheme(theme);
    }
  },
  data() {
    return {
      themes: [
        { name: "green", color: "#66bb6a" },
        { name: "origan", color: "#ffa726" },
        { name: "red", color: "#ef5350" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.setting {
  padding: 20px 40px;

  table {
    td:nth-of-type(2n + 1) {
      text-align: right;
      padding-right: 20px;

      &:not(:first-of-type) {
        padding-left: 40px;
      }
    }
  }

  .sidebar-img {
    width: 100px;
    height: 200px;
    border-radius: 10px;
    background-color: #f2f2f2;
    overflow: hidden;
  }

  .color-picker {
    .color {
      display: inline-block;
      width: 28px;
      height: 28px;
      border-radius: 14px;
      cursor: pointer;

      &:not(:first-of-type) {
        margin-left: 8px;
      }
    }
  }
}
</style>
