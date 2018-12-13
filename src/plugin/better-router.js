import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
function asyncLoad(src) {
  // return () => import(`../views/${src}`);
  // ? 使用import会有问题，就算组件使用export default语法。
  // ? 这里是原因讨论https://github.com/vuejs/vue-router/issues/656
  // ! 这里统一使用require异步导入，不做修复。看情况
  return resolve => require([`../views/${src}`], m => resolve(m.default));
}

function build(rules, layout) {
  const result = [];
  const path_array = Object.keys(rules);
  const partable_layout = layout && layout.main && layout.parts;
  path_array.map(path => {
    let components = {};
    let _rest = null;
    const info = rules[path];

    if (info.src || info.pure) {
      const tmp$1 = {};
      const { pure, src, ...rest } = info;
      _rest = rest;
      if (typeof src === "string") {
        tmp$1.default = asyncLoad(src);
      } else {
        Object.keys(src).map(s => {
          tmp$1[s] = asyncLoad(src[s]);
        });
      }
      if (pure) {
        components = tmp$1;
      } else {
        components = { ...layout, ...tmp$1 };
      }
    } else {
      if (partable_layout) {
        components = { ...layout.parts };
      }
      if (typeof info === "string") {
        components.default = asyncLoad(info);
      } else {
        components.default = info;
      }
    }
    result.push({
      path: path === "/" ? "" : path,
      components,
      ..._rest
    });
  });
  return result;
}

export default function BetterRouter(option) {
  let _odd = [],
    _notmatched = [],
    routes = [];
  const { odd, layout, rules, ...rest } = option;
  const partable_layout = layout && layout.main && layout.parts;
  const config = {
    mode: "history",
    ...rest
  };
  const children = build(rules, layout);

  if (odd) {
    _odd = odd.map(({ path, src }) => ({
      path,
      public: true,
      pure: true,
      component: asyncLoad(src)
    }));
    _notmatched = [
      {
        path: "*",
        redirect: odd[0].path || "/"
      }
    ];
  }

  const _home = {
    path: "/",
    component: partable_layout ? layout.main : layout,
    children
  };

  config.routes = routes.concat(_odd, _home, _notmatched);
  const router = new Router(config);
  //   const auth = window.auth;
  //   router.beforeEach((to, from, next) => {
  //     console.log(window.auth, from.path, to.path);
  //     if (to.public || window.auth || to.path === "/login") {
  //       next();
  //       return;
  //     }
  //     next({ path: "/login" });
  //   });
  return router;
}
