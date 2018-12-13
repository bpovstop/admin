import Vue from "vue";
// import Vuefetch from "@okvue/vue-fetch";
// test vue-fetch
import Vuefetch from "@/lib/vue-fetch";
import config from "./config";

Vue.use(Vuefetch);

export default new Vuefetch.config([
  {
    name: "google",
    prefix: "https://google.com",
    api: {
      file: "path/to/file"
    },
    vuex:{
      enable: true,
      restful: ["post", "get"]
    }
  },
  {
    name: "baidu",
    prefix: "https://baidu.com"
  }
]);
