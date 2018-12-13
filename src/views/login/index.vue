<template>
  <div class="login-page" :style="{backgroundImage: `url(${loginBgImg})`}">
    <o-view ver hor full class="main">
      <o-view hor ver column>
        <o-avatar :src="loginBgImg" :size="100" :borderWidth="4"/>
        <el-input class="user-name" size="small" autocomplete v-if="!historyAccount"/>
        <p class="user-name" v-if="historyAccount">{{userName}}</p>
        <o-view ver>
          <i class="el-icon-refresh btn" @click="switchAccount"></i>
          <el-input class="input" type="password" size="small" v-model="password"/>
          <i class="el-icon-arrow-right btn"></i>
        </o-view>
      </o-view>
    </o-view>
  </div>
</template>
<script>
import avatar from "@/components/avatar";
export default {
  name: "login-page",
  components: {
    [avatar.name]: avatar
  },
  computed: {},
  methods: {
    switchAccount() {
      // switch account
      this.historyAccount = false;
    }
  },
  data() {
    return {
      password: undefined,
      userName: "Orlo Wang",
      historyAccount: true,
      loginBgImg:
        "https://demos.creative-tim.com/vue-light-bootstrap-dashboard-pro/static/img/full-screen-image-1.jpg"
    };
  }
};
</script>
<style lang="scss" scoped>
.login-page {
  position: relative;
  background-size: cover;
  background-position: 50%;

  &:after {
    display: block;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.55;
    background: #292929;
    background: linear-gradient(180deg, #292929, #0e0e0e);
  }

  .main {
    position: relative;
    margin-top: -100px;
    z-index: 1;
  }

  p {
    text-align: center;
    font-size: 22px;
  }

  .user-name {
    margin-top: 20px;
    font-size: 16px;
    height: 32px;
    line-height: 32px;
    color: #fff;
    width: calc(100% - 72px);
    margin-bottom: 15px;
  }

  .btn {
    font-size: 22px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.29);
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border-radius: 14px;
    background-color: rgba(222, 222, 222, 0.3);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.35);
    cursor: pointer;
  }

  .input {
    flex: 1;
    margin-left: 8px;
    margin-right: 8px;
  }
}
</style>
