<template>
    <div id="setting">
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
                        <p>是否同步设置</p>
                    </td>
                    <td>
                        <el-switch v-model="ifSync" disabled/>
                    </td>
                    <td>
                        <p>侧边栏背景图片</p>
                    </td>
                    <td rowspan="4">
                        <div class="sidebar-img">
                            <o-upload @onready="saveImage" :initImg="sidebarImage"/>
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
                <tr>
                    <td>
                        <p>使用标签页浏览</p>
                    </td>
                    <td>
                        <el-switch v-model="useTab"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>页面最小宽度</p>
                    </td>
                    <td>
                        <el-input v-model="pageMinWidth" size="mini" :placeholder="pageMinWidth"/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style lang="stylus" scoped>
#setting {
    padding: 20px 40px;

    table {
        td:nth-of-type(2n+1) {
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

<script>
import { mapGetters } from "vuex";
import { bindComputed } from "@okvue/vuex-bind";
import upload from "@/components/upload";
import bytesToSize from "@/helpers/bytes_to_size";

export default {
  name: "setting",
  components: {
    [upload.name]: upload
  },
  extends: {
    computed: bindComputed(
      "sidebarWidth",
      "ifSync",
      "canMenuMultipleExpand",
      "sidebarLock",
      "useTab",
      "pageMinWidth",
      "sidebarImage"
    )
  },
  methods: {
    setTheme(theme) {
      this.$setTheme(theme);
    },
    saveImage(src) {
      console.log(bytesToSize(src.length));
      this.sidebarImage = src;
      this.$storage.local.sidebarImg = src;
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


