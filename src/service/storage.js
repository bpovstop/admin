import Storage from "@okvue/storage";

export default function storage(Vue) {
  Vue.prototype.$storage = new Storage();
}
