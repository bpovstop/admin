<template>
  <div @click="handler">
    <search-input/>
  </div>
</template>
<style lang="stylus">
.on-search-disable {
  #app {
    &:after {
      content: '';
      position: absolute;
      display: block;
      background-color: rgba(0, 0, 0, 0.58);
      width: calc(100% + 100px);
      height: calc(100% + 100px);
      left: -50px;
      top: -50px;
    }

    filter: blur(5px);
  }
}
</style>

<script>
import Vue from "vue";
import searchBox from "./search-box";
import searchInput from "./search-input";
export default {
  name: "search",
  props: {
    do: Function,
    interval: Number
  },
  components: {
    [searchInput.name]: searchInput
  },
  computed: {
    // width() {
    //   return this.update.width;
    // },
    // status() {
    //   return this.update.status;
    // }
  },
  methods: {
    handler() {
      if (!this.active) this.active = true;
      const { x, y } = this.$el.getBoundingClientRect();
      document.body.classList.add("on-search");
      if (!document.getElementById("o-search-mount-point")) {
        const search = document.createElement("div");
        document.body.appendChild(search);
        console.log(this);
        return new Vue({
          render: h =>
            h(searchBox, {
              slots: this.$slots,
              scopedSlots: this.$scopedSlots,
              props: {
                x,
                y,
                do: this.do,
                interval: this.interval,
                soltTpl: this.$slots.default
              }
            })
        }).$mount(search);
      }
    },
    reset() {
      // this.status = "";
      const search = document.getElementById("o-search-mount-point");
      if (search) document.body.removeChild(search);
      document.body.classList.remove("on-search");
    },
    asyncSearch() {
      const query = this.input;
      // TODO 异步查询后返回结果
      const data = [
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号"
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼"
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
        }
      ];
      this.data = data;
    }
  },
  data() {
    return {
      input: "",
      data: null,
      width: 200,
      active: false
    };
  }
};
</script>

