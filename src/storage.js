export default class Storage {
  constructor() {
    this.deep = {};
    this.cookie = {};
    this._cookie = window.document.cookie;
    this._session = window.sessionStorage;
    this._store = window.localStorage;
    this.deep.add = this._exec.bind(this, true, "setItem");
    this.deep.get = this._set.bind(this, true);
  }

  _exec(type, sh) {
    switch (type) {
      case "cookie":
        return this._cookie.toString();
      case false:
        return this._session[sh];
      case true:
      default:
        return this._store[sh];
    }
  }

  _set = (type, key, value) => {
    switch (type) {
      case "cookie":
        return this._cookie.toString();
      case false:
        return this._session.setItem(key, value);
      case true:
      default:
        return this._store.setItem(key, value);
    }
  };

  add = (key, value) => this._exec(false, "setItem");

  get = key => {};

  delete = key => {};

  destory = () => {};
}
