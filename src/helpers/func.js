export function loop(src, func = s => s, key = "children") {
  if (Array.isArray(src)) {
    return src.map(item => {
      if (item[key]) {
        item[key] = loop(item[key], func, key);
      }
      return func(item);
    });
  }
}
