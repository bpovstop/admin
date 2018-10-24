<template>
    <div class="search-input">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        <input ref="input" v-focus="autofocus" v-model="input" type="text" placeholder="do some search...">
    </div>
</template>
<style lang="stylus" scoped>
.search-input {
  display: flex;
  border-bottom: 1px solid #f20;

  input {
    border: none;
    padding: 0 10px;
    width: 100%;
    flex: 1;
    font-size: 16px;
    background: transparent;

    &:focus {
      outline: none;
    }
  }
}
</style>
<script>
export default {
  name: "search-input",
  props: {
    autofocus: {
      default: false,
      type: Boolean
    }
  },
  model: {
    prop: "value",
    event: "update"
  },
  watch: {
    input() {
      this.$emit("update", this.input);
    }
  },
  data() {
    return {
      input: ""
    };
  }
};
</script>


