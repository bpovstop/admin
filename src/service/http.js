import Vue from "vue";
import Vuefetch from "@okvue/vue-fetch";
import config from "../config";

Vue.use(Vuefetch);

/**
 * @params {data} 解析后的数据
 */
function filter() {
  // do something
}

/**
 * @params {response} Response对象
 */
function afterResponse() {
  // do something
}

/**
 * @params {http, info} HttpError对象 错误详情
 */
function failed() {
  // do something
}

const common = {
  headers: {
    "X-Requested-With": "XMLHttpRequest"
  },
  beforeFetch: null, // 发请求前的钩子, 参数为FetchConfig对象{url, options}
  afterResponse, // 请求返回时的钩子, 参数为Response对象
  afterParesed: null, // 数据被解析后的钩子, 参数为解析后的数据data
  filter, // 业务过滤器钩子, 不同业务码对应的展示逻辑, 如业务异常处理
  failed, // 请求异常钩子, 包括大部分网络异常和Response解析异常

  api: null, // 接口别名，推荐在这里指定，也可以通过vue.$vf.registerVuex动态注册
  name: null, // 接口域别名, 多个域接口时必须指定
  prefix: null, // 接口地址前缀

  // 启用vuex集成, 自动在store中生成请求状态, 非必需
  vuex: {
    enable: true, // 是否启用
    restful: false // true使用restful风格接口, 传入方法数组指定对应操作，默认为所有, 如["post", "get"]
  }
};

let VuefetchConfig = null;
if (process.env.VUE_APP_ENDPOINT) {
  const domains = process.env.VUE_APP_ENDPOINT.split(";");
  if (domains.length === 1) {
    common.prefix = domains[0];
    common.name = domains[0];
    common.api = config.api;
    VuefetchConfig = common;
  } else if (domains.length > 1) {
    // 这里对相同配置的多个接口统一配置, 如果单个配置间有很大差异, 推荐单独写
    VuefetchConfig = [];
    domains.map(prefix => {
      VuefetchConfig.push({ prefix, name: prefix, ...common });
    });
  }
}

export default new Vuefetch.config(VuefetchConfig);
