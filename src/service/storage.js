import Storage from "@okvue/storage";

export default function storageService(Vue) {
  Vue.prototype.$storage = new Storage();
}
