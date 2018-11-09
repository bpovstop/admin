import Vue from "vue";
import Vuex from "vuex";
import { binding } from "@okvue/vuex-bind";

Vue.use(Vuex);

export default new Vuex.Store(
  binding({
    state: {
      canMenuMultipleExpand: false,
      ifSync: false,
      sidebarLock: true,
      sidebarWidth: 240,
      useTab: false,
      pageMinWidth: 900,
      sidebarImage: localStorage.getItem('sidebarImg')
    },
    getters: {},
    mutations: {},
    actions: {}
  })
);
