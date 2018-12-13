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
    "/setting": "setting",
    "/element": "element",
    "/login": {
      pure: true,
      src: "login"
    }
  },
  api: {
    warmleaf: "orgs/warmleaf/repos"
  }
};
