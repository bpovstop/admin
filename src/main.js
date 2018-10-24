import Vue from "vue";
import Router from "vue-router";
import vuefetch from "@okvue/vue-fetch";
import view from "@okvue/view";

import app from "./app.vue";
import routeService from "./service/router";
import themesService from "./service/themes";
import componentService from "./service/component";
import directiveService from "./service/directive";
import store from "./store";
import sidebar from "./layout/sidebar";
import header from "./layout/header";
import layout from "./layout";
import Storage from "./storage";
import conf from "./config";

// 初始化插件
Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(vuefetch);
Vue.use(view);

// 初始化服务
componentService(Vue);
directiveService(Vue);

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
  theme: themesService(conf.theme),
  store,
  render: h => h(app)
}).$mount("#app");

const s = new Storage();
s.deep.add("V", "ook");
s.add(1, 2);
console.log(s);
