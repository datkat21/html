// src/html.ts
class Html {
  elm;
  constructor(elm) {
    if (elm instanceof HTMLElement) {
      this.elm = elm;
    } else {
      this.elm = document.createElement(elm || "div");
    }
  }
  text(val) {
    this.elm.innerText = val;
    return this;
  }
  html(val) {
    this.elm.innerHTML = val;
    return this;
  }
  cleanup() {
    this.elm.remove();
    return this;
  }
  query(selector) {
    return this.elm.querySelector(selector);
  }
  qs(query) {
    if (this.elm.querySelector(query)) {
      return Html.from(this.elm.querySelector(query));
    } else {
      return null;
    }
  }
  qsa(query) {
    if (this.elm.querySelector(query)) {
      return Array.from(this.elm.querySelectorAll(query)).map((e) => Html.from(e));
    } else {
      return null;
    }
  }
  id(val) {
    this.elm.id = val;
    return this;
  }
  class(...val) {
    for (let i = 0;i < val.length; i++) {
      this.elm.classList.toggle(val[i]);
    }
    return this;
  }
  classOn(...val) {
    for (let i = 0;i < val.length; i++) {
      this.elm.classList.add(val[i]);
    }
    return this;
  }
  classOff(...val) {
    for (let i = 0;i < val.length; i++) {
      this.elm.classList.remove(val[i]);
    }
    return this;
  }
  style(obj) {
    for (const key of Object.keys(obj)) {
      this.elm.style.setProperty(key, obj[key]);
    }
    return this;
  }
  styleJs(obj) {
    for (const key of Object.keys(obj)) {
      this.elm.style[key] = obj[key];
    }
    return this;
  }
  on(ev, cb) {
    this.elm.addEventListener(ev, cb);
    return this;
  }
  un(ev, cb) {
    this.elm.removeEventListener(ev, cb);
    return this;
  }
  appendTo(parent) {
    if (parent instanceof HTMLElement) {
      parent.appendChild(this.elm);
    } else if (parent instanceof Html) {
      parent.elm.appendChild(this.elm);
    } else if (typeof parent === "string") {
      document.querySelector(parent)?.appendChild(this.elm);
    }
    return this;
  }
  append(elem) {
    if (elem instanceof HTMLElement) {
      this.elm.appendChild(elem);
    } else if (elem instanceof Html) {
      this.elm.appendChild(elem.elm);
    } else if (typeof elem === "string") {
      const newElem = document.createElement(elem);
      this.elm.appendChild(newElem);
      return new Html(newElem.tagName);
    }
    return this;
  }
  appendMany(...elements) {
    for (const elem of elements) {
      this.append(elem);
    }
    return this;
  }
  clear() {
    this.elm.innerHTML = "";
    return this;
  }
  attr(obj) {
    for (let key in obj) {
      if (obj[key] !== null && obj[key] !== undefined) {
        this.elm.setAttribute(key, obj[key]);
      } else {
        this.elm.removeAttribute(key);
      }
    }
    return this;
  }
  val(str) {
    var x = this.elm;
    x.value = str;
    return this;
  }
  getText() {
    return this.elm.innerText;
  }
  getHtml() {
    return this.elm.innerHTML;
  }
  getValue() {
    return this.elm.value;
  }
  swapRef(elm) {
    this.elm = elm;
    return this;
  }
  static from(elm) {
    return new Html(elm);
  }
  static qs(query) {
    if (document.querySelector(query)) {
      return Html.from(document.querySelector(query));
    } else {
      return null;
    }
  }
  static qsa(query) {
    if (document.querySelector(query)) {
      return Array.from(document.querySelectorAll(query)).map((e) => Html.from(e));
    } else {
      return null;
    }
  }
}
export {
  Html as default
};
