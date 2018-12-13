import Vue from "vue";
import App from "./app.vue";
import BetterRouter from "./plugin/better-router";
import Theme from "./service/theme";
import Component from "./service/component";
import Storage from "./service/storage";
import http from "./service/http";
import store from "./store";
import sidebar from "./layout/sidebar";
import header from "./layout/header";
import layout from "./layout";
import conf from "./config";

const { theme, routes } = conf;
// 初始化插件
Vue.config.productionTip = false;
Vue.use(Component);

// 初始化服务
Vue.use(Theme);
Vue.use(Storage);

// 初始化路由
const router = BetterRouter({
  rules: routes,
  mode: "history", // 路由类型[history, hash]
  base: process.env.VUE_APP_SUB_NAME || "", // 路由基路径, 配合二级目录
  odd: [
    { path: "/404", src: "odd/not-found" },
    { path: "/no-service", src: "odd/no-service" }
  ], // 异常页面, 404/500等
  layout: { main: layout, parts: { sidebar, header } }
});

// 初始化页面
new Vue({ router, theme, store, http, render: h => h(App) }).$mount("#app");
