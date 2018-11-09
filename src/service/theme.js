let installed = false,
  hasInit = false,
  themeMeta = document.querySelector('meta[name="theme-color"]'),
  themeRoot = document.getElementById("o_theme");

function themeInit() {
  const options = this.$options;
  if (options.theme) {
    if (!hasInit) {
      const head = document.head;
      if (!themeMeta) {
        themeMeta = document.createElement("meta");
        themeMeta.setAttribute("name", "theme-color");
        themeMeta.setAttribute("content", options.theme.color);
        head.appendChild(themeMeta);
      }
      if (!themeRoot) {
        themeRoot = document.createElement("style");
        themeRoot.id = "o_theme";
        themeRoot.setAttribute("type", "text/css");
        update(options.theme.color);
        head.appendChild(themeRoot);
      }
      hasInit = true;
    }
    return;
  }
}

function update(color) {
  themeRoot.innerText = `:root{--color-primary:${color}}`;
}

function setTheme(theme) {
  if (!theme && !theme.color) {
    return;
  }
  themeMeta.setAttribute("content", theme.color);
  update(theme.color);
}
const themeService = {
  install(Vue) {
    if (installed) {
      return;
    }
    Vue.mixin({ beforeCreate: themeInit });
    Object.defineProperty(Vue.prototype, "$setTheme", {
      value: setTheme
    });
    installed = true;
  }
};

if (typeof window !== "undefined" && window.Vue) {
  themeService.install(window.Vue);
}

export default themeService;
