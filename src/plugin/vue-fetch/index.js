// import "whatwg-fetch";
import { toPrefixPath, setApi, toLower, parseStream } from "./helper";

class Vuefetch {
  constructor(fetchConfig, Vuex, VueSet) {
    this.count = 0;
    this.stateCount = new Map();
    this.storeCount = 0;
    this._lifeCycles = [];
    this._Vuex = Vuex;
    this._VueSet = VueSet;
    this._init(fetchConfig);
  }

  _init(fetchConfig) {
    this._registerVuexBaseMutationsAndActions();
    this._instance = new Map();
    if (Array.isArray(fetchConfig)) {
      fetchConfig.map((config, index) => {
        const { name, vuex, api, ...rest } = config;
        if (name) {
          this._instance.set(name, [rest, vuex]);
          if (vuex && vuex.enable) {
            this.stateCount.set(name, null);
            this._registerVuexModule(api, vuex.restful, name);
          }
          if (index === 0) {
            this._instance.set("default", [rest, vuex]);
          }
        } else {
          throw Error("'name' fields in config is required");
        }
      });
    } else if (fetchConfig.name) {
      const { name, vuex, api, ...rest } = fetchConfig;
      this._instance.set("default", [rest, vuex]);
      if (vuex && vuex.enable) {
        this.stateCount.set(name, null);
        this._registerVuexModule(api, vuex.restful, name);
      }
    } else {
      throw Error("'name' fields in config is required");
    }
  }

  _registerVuexBaseMutationsAndActions() {
    this._Vuex.registerModule("_vf_base", {
      mutations: {
        vueFetchApiStatusUpdate: (state, { api, status }) => {
          state[setApi(api)] = status;
        }
      },
      actions: {
        VUE_FETCH_API_STATUS_UPDATE: ({ commit }, payload) => {
          commit("vueFetchApiStatusUpdate", payload);
        }
      }
    });
  }

  _registerVuexModule(apis, useRestful, name) {
    const getters = {};

    Object.keys(apis).map(api => {
      if (useRestful) {
        (useRestful === true
          ? ["post", "get", "delete", "put", "patch"]
          : useRestful
        ).map(method => {
          const key = setApi(api, method);
          // TODO if there is a better way to set getters
          getters[key] = (state, getters, rootState) => {
            return rootState._vf_base[key];
          };
          this._VueSet(this._Vuex._modules.root.state._vf_base, key, "init");
        });
      } else {
        const key = setApi(api);
        getters[key] = (state, getters, rootState) => {
          return rootState._vf_base[key];
        };
        this._VueSet(this._Vuex._modules.root.state._vf_base, key, "init");
      }
    });

    let getModuleCount = this.stateCount.get(name) || 0;
    this.stateCount.set(name, ++getModuleCount);
    const moduleName = `_vf_${name + getModuleCount}`;

    this._Vuex.registerModule(moduleName, {
      getters
    });
  }

  _createNewLifeCycle(fetchConfig) {
    const count =
      this._lifeCycles[this.count] && this._lifeCycles[this.count][0]
        ? ++this.count
        : this.count;

    if (!this._lifeCycles[count]) {
      this._lifeCycles[count] = [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      ];
    }

    if (fetchConfig.path) this._lifeCycles[count][0] = fetchConfig.path;
    if (fetchConfig.domain)
      this._lifeCycles[count][1] = fetchConfig.domain || "default";
    if (fetchConfig.headers) this._lifeCycles[count][2] = fetchConfig.headers;
    if (fetchConfig.config) this._lifeCycles[count][3] = fetchConfig.config;
    if (fetchConfig.hooks) this._lifeCycles[count][4] = fetchConfig.hooks;
  }

  _doFetch(dataOrParams, submitDataType, method) {
    const current_life_cycle = this._lifeCycles[this.count];
    const current_domain = current_life_cycle[1] || "default";

    if (!this._instance.has(current_domain)) {
      throw Error(`domain ${current_domain} is unregistered`);
    }

    let instance_options = this._instance.get(current_domain);
    const {
      // hooks
      beforeFetch,
      afterResponse,
      afterParesed,
      filter,
      failed,
      // keep fields
      prefix,
      name,
      // headers
      headers,
      // download
      fileName,
      // config
      ...options
    } = instance_options[0];
    const vuex = instance_options[1];
    let url = toPrefixPath(current_life_cycle[0], prefix);

    Object.assign(options, current_life_cycle[3], { method });
    options.headers = {
      ...headers,
      ...current_life_cycle[2]
    };

    if (method === "GET") {
      const seatch_url = new URLSearchParams();
      Object.keys(dataOrParams).map(key => {
        seatch_url.append(key, dataOrParams[key]);
      });
      url = url + "?" + seatch_url;
    } else {
      switch (submitDataType) {
        case undefined:
        case "json":
          options.headers["Content-Type"] = "application/json; charset=utf-8";
          options.body = JSON.stringify(dataOrParams);
          break;
        case "formdata":
          if (options.headers["Content-Type"])
            delete options.headers["Content-Type"];
          const fd = new FormData();
          Object.keys(dataOrParams).map(key =>
            fd.append(key, dataOrParams[key])
          );
          options.body = fd.toString();
          break;
        case "urlencoded":
          options.headers["Content-Type"] = "application/x-www-form-urlencoded";
          const url_sp = new URLSearchParams();
          Object.keys(dataOrParams).map(key =>
            url_sp.append(key, dataOrParams[key])
          );
          options.body = url_sp.toString();
          break;
        default:
          throw Error("no support data type!");
      }
    }

    function execEvent(name, args) {
      if (current_life_cycle[4] && current_life_cycle[4][name]) {
        current_life_cycle[4][name](args);
      } else if (instance_options[0][name]) {
        instance_options[0][name](args);
      }
    }

    const api = vuex.restful
      ? toLower(method) + "_" + current_life_cycle[0]
      : current_life_cycle[0];

    execEvent("beforeFetch", { url, options });
    if (vuex.enable) {
      this._Vuex.dispatch("VUE_FETCH_API_STATUS_UPDATE", {
        api,
        status: "fetching"
      });
    }
    return fetch(url, options)
      .then(response => {
        const type = response.headers.get("Content-Type");
        execEvent("afterResponse", response);
        if (vuex.enable) {
          this._Vuex.dispatch("VUE_FETCH_API_STATUS_UPDATE", {
            api,
            status: "parsing"
          });
        }
        if (!response.ok) throw { response, type };
        return parseStream(response, type, blob);
      })
      .then(data => {
        execEvent("afterParesed", data);
        if (vuex.enable) {
          this._Vuex.dispatch("VUE_FETCH_API_STATUS_UPDATE", {
            api,
            status: "done"
          });
        }
        return filter ? filter(data) : data;
      })
      .catch(err => {
        execEvent("failed", err);
        if (vuex.enable) {
          this._Vuex.dispatch("VUE_FETCH_API_STATUS_UPDATE", {
            api,
            status: "error"
          });
        }
      });
  }

  registerVuex(apis) {
    Object.keys(apis).map(api => {
      const hasDomain = this._instance.get(api);
      if (hasDomain) {
        if (hasDomain[1] && hasDomain[1].enable) {
          this._registerVuexModule(
            apis[api],
            hasDomain[1] && hasDomain[1].restful,
            api
          );
        }
      } else {
        throw Error(`domain ${api} is unregistered`);
      }
    });
  }

  config(config) {
    this._createNewLifeCycle({ config });
    return this;
  }

  hook(hooks) {
    this._createNewLifeCycle({ hooks });
    return this;
  }

  fetch(url, options) {
    return fetch(url, options);
  }

  from(domain) {
    this._createNewLifeCycle({ domain });
    return this;
  }

  setHeaders(headers) {
    this._createNewLifeCycle({ headers });
    return this;
  }

  post(path, data, submitDataType) {
    this._createNewLifeCycle({ path });
    return this._doFetch(data, submitDataType, "POST");
  }

  get(path, params) {
    this._createNewLifeCycle({ path });
    return this._doFetch(params, null, "GET");
  }
}

let _Vue = null;

function config(options) {
  return options;
}

function install(Vue) {
  if (_Vue && _Vue === Vue) {
    return;
  }
  _Vue = Vue;
  Vue.mixin({ beforeCreate: initVuefetch });
}

function initVuefetch() {
  const options = this.$options;
  const vuex = options.store || (options.parent && options.parent.$store);
  if (options.http) {
    this.$vf = new Vuefetch(options.http, vuex, _Vue.set);
    this.$registerApi;
  } else if (options.parent && options.parent.$vf) {
    this.$vf = options.parent.$vf;
  }
}

export default {
  install,
  config,
  version: "0.2.0"
};
