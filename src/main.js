import Vue from "vue";
import Router from "vue-router";
import vuefetch from "@okvue/vue-fetch";
import view from "@okvue/view";

import app from "./app.vue";
import routeService from "./service/router";
import themesService from "./service/theme";
import componentService from "./service/component";
import directiveService from "./service/directive";
import storageService from "./service/storage";
import store from "./store";
import sidebar from "./layout/sidebar";
import header from "./layout/header";
import layout from "./layout";
import conf from "./config";

// 初始化插件
Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(vuefetch);
Vue.use(view);

// 初始化服务
componentService(Vue);
Vue.use(themesService);
directiveService(Vue);
storageService(Vue);

// 初始化页面
new Vue({
  fetch: {
    backend: process.env.VUE_APP_API,
    api: conf.api,
    method: "POST"
  },
  router: routeService({
    odd: [
      { path: "/404", src: "odd/notFound" },
      { path: "/500", src: "odd/noService" }
    ],
    layout: { sidebar, header },
    layoutTemplate: layout,
    routeBase: conf.routeBase
  }),
  theme: conf.theme,
  store,
  render: h => h(app)
}).$mount("#app");
