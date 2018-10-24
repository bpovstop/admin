import Router from "vue-router";

const asyncLoad = src => () => import(`../views/${src}`);

function build(res, layout) {
  const result = [];
  const pathArray = Object.keys(res);
  pathArray.map(path => {
    let components = {};
    let _rest = null;
    const info = res[path];
    if (typeof info === "string") {
      components = { ...layout };
      components.default = asyncLoad(info);
    } else {
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
    }
    result.push({
      path,
      components,
      ..._rest
    });
  });
  return result;
}

export default function routeService(option) {
  const { odd, layout, layoutTemplate, routeBase, ...rest } = option;
  const config = {
    mode: "history",
    ...rest
  };
  const children = build(routeBase, layout);
  const routes = odd.map(({ path, src }) => ({
    path,
    public: true,
    pure: true,
    component: asyncLoad(src)
  }));
  const _home = {
    path: "/",
    component: layoutTemplate,
    children
  };
  const _notmatched = {
    path: "*",
    redirect: odd[0].path || "/"
  };
  config.routes = routes.concat(_home, _notmatched);
  console.log(config.routes);
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
