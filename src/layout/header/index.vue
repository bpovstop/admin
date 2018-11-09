<template>
    <o-view ver hor="space-between" id="header-inner">
      <o-view>
        <router-link to="/login">Login Page</router-link>
      </o-view>
      <o-view>
        <avatar :src="avatar"/>
      </o-view>
    </o-view>
</template>
<style lang="stylus" scoped>
#header-inner {
  height: 48px;
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
}
</style>
<script>
import search from "@/components/search";
import avatar from "./avatar";
export default {
  components: {
    [search.name]: search,
    [avatar.name]: avatar
  },
  methods: {
    doQuery(val) {
      // TODO 调用接口查询
      // this.$fetch("search", val).then(data => (this.search = data));
      const fake = [
        { id: "小鸭知", value: "小鸭知，挂呱呱，跑不快，水中游" },
        { id: "小几株", value: "小几株，八只爪，黑乎乎，网上爬" },
        { id: "小兔几", value: "小兔几，耳朵长，肥嘟嘟，真可爱" },
        { id: "小挠虎", value: "小挠虎，想上树，上去了，下不来" }
      ];

      const timer = setTimeout(() => {
        this.search = fake.filter(item => item.id.indexOf(val) > -1);
        console.log(this.search);
      }, 1000);
    }
  },
  data() {
    return {
      avatar: {
        url: "https://pic.qqtn.com/up/2018-1/2018012414164278819.jpg",
        name: "Orlo Wang"
      },
      endpoint: "https//abc.com",
      search: []
    };
  }
};
</script>

