import Vue from "vue";
import Vuex from "vuex";
import { binding } from "@okvue/vuex-bind";

Vue.use(Vuex);

export default new Vuex.Store(
  binding({
    state: {
      canMenuMultipleExpand: false,
      sidebarLock: true,
      sidebarWidth: 240
    },
    getters: {},
    mutations: {},
    actions: {}
  })
);
