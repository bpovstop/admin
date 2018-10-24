export default function directiveService(vue) {
  // 当被绑定的元素插入到 DOM 中时聚焦元素
  vue.directive("focus", {
    inserted: function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  });
}
