export default {
  app: {
    name: "Admin",
    description: "description"
  },
  theme: {
    name: "rose-dark",
    color: "#66bb6a"
  },
  routes: {
    "/": "home",
    "/setting": {
      meta:{
        title: "setting"
      },
      src: "setting"
    },
    "/element": {
      meta:{
        title: "element"
      },
      src: "element"
    },
    "/login": {
      pure: true,
      src: "login"
    }
  },
  api: {
    warmleaf: "orgs/warmleaf/repos"
  }
};
