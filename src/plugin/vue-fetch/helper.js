export function toPrefixPath(path, prefix) {
  return prefix ? trim(prefix, "/") + "/" + trim(path, "/") : path;
}

export function setApi(name, prefix) {
  return (prefix ? prefix + "_" : "") + name + "_status";
}

export function parseStream(src, type) {
  console.log(src, type);
  switch (true) {
    case /multipart\/form-data/.test(type):
      return src.formData();
    // !todo
    case /application\/json/.test(type):
      return src.json();
    case /text\/plain/.test(type):
      return src.text();
    case /video|audio|image|message|x-token/.test(type):
    default:
      return src.text();
  }
}

export function trim(string, str) {
  if (!string) return "";
  if (!str) {
    return string.trim();
  } else if (/\//.test(str)) {
    return string.replace(new RegExp(`^\\${str}+|\\${str}+$`, "g"), "");
  } else {
    return string.replace(new RegExp(`^${str}+|${str}+$`, "g"), "");
  }
}

export function toLower(str) {
  return str ? str.toLowerCase() : "";
}

export function toUpper(str) {
  return str ? str.toUpperCase() : "";
}

// export function isJson(obj) {
//   let cb = null;
//   if (typeof obj !== "object") return false;
//   try {
//     cb = JSON.stringify(obj, function(key, val) {
//       if (
//         typeof val === "string" ||
//         typeof val === "number" ||
//         typeof val === "object" ||
//         typeof val === "array"
//       ) {
//         return val;
//       }
//       throw Error();
//     });
//     return cb;
//   } catch (error) {
//     return false;
//   }
// }

// export function isBlob(obj) {
//   return typeof Blob !== "undefined" && obj instanceof Blob;
// }

// export function isArrayBuffer(obj) {}

// export function isFormData(obj) {
//   return typeof FormData !== "undefined" && obj instanceof FormData;
// }
