<template>
  <o-view ver hor="space-between" class="header-inner">
    <o-view>
      <router-link to="/login">登录页面</router-link>
    </o-view>
    <o-view>
      <account :src="account"/>
    </o-view>
  </o-view>
</template>
<script>
import account from "./account";
export default {
  components: {
    [account.name]: account
  },
  data() {
    return {
      account: {
        url: "https://pic.qqtn.com/up/2018-1/2018012414164278819.jpg",
        name: "Orlo Wang"
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.header-inner {
  height: 58px;
  width: 100%;
  padding-left: 18px;
  padding-right: 18px;
}
</style>
