import Monaco from "./monaco";

const MonacoEditor = {
  install(Vue) {
    Vue.component(Monaco.name, Monaco);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(MonacoEditor);
}

export default MonacoEditor;
