<template>
    <div>
        <h3>Proprietary</h3>
        <div>
            <h2 id="monaco">Monaco#代码编辑器</h2>
            <el-select v-model="lang" placeholder="请选择语言" size="mini">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <monaco 
                class="code-editor" 
                @change="change" 
                @selection="selection" 
                @focus="focus" 
                :language="lang" 
                @changeLanguage="changeLanguage"
                @error="error"
            />
        </div>
        <div>
            <h2 id="markdown">Monaco#代码编辑器</h2>
        </div>
        <div>
            <h2 id="richtext">Monaco#代码编辑器</h2>
            <!-- <richtext-tiny /> -->
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.code-editor {
    width: 100%;
    height: 400px;
}
</style>


<script>
import codeEidtor from "@/components/editor/code/monaco";
import richtext from "@/components/editor/richtext/tiny";
export default {
  components: {
    [richtext.name]: richtext,
    [codeEidtor.name]: codeEidtor
  },
  methods: {
    change(val) {
      // 文本编辑
      console.log(val);
    },
    selection(val) {
      // 光标选择
      //   console.log(val);
    },
    focus() {
      // 获取焦点
      //   console.log("focus!");
    },
    changeLanguage() {
      console.log("change language?");
    },
    error({ type }) {
      console.log("error ->", type);
    }
  },
  data() {
    return {
      options: [
        {
          value: "sql",
          label: "sql"
        },
        {
          value: "javascript",
          label: "javascript"
        },
        {
          value: "java",
          label: "java"
        },
        {
          value: "python",
          label: "python"
        },
        {
          value: "golang",
          label: "golang"
        }
      ],
      lang: ""
    };
  }
};
</script>

