export default class Html {
  elm: HTMLInputElement | HTMLElement;
  constructor(e: string) {``
    this.elm = document.createElement(e || "div");
  }
  text(val: string) {
    this.elm.innerText = val;
    return this;
  }
  html(val: string) {
    this.elm.innerHTML = val;
    return this;
  }
  cleanup() {
    this.elm.remove();
  }
  query(selector: any) {
    return this.elm.querySelector(selector);
  }
  class(...val: string[]) {
    for (let i = 0; i < val.length; i++) {
      this.elm.classList.toggle(val[i]);
    }
    return this;
  }
  classOn(...val: string[]) {
    for (let i = 0; i < val.length; i++) {
      this.elm.classList.add(val[i]);
    }
    return this;
  }
  classOff(...val: string[]) {
    for (let i = 0; i < val.length; i++) {
      this.elm.classList.remove(val[i]);
    }
    return this;
  }
  style(obj: { [x: string]: string | null }) {
    for (const key of Object.keys(obj)) {
      this.elm.style.setProperty(key, obj[key]);
    }
    return this;
  }
  on(ev: string, cb: EventListenerOrEventListenerObject) {
    this.elm.addEventListener(ev, cb);
    return this;
  }
  un(ev: string, cb: EventListenerOrEventListenerObject) {
    this.elm.removeEventListener(ev, cb);
    return this;
  }
  appendTo(parent: HTMLElement | Html | string) {
    if (parent instanceof HTMLElement) {
      parent.appendChild(this.elm);
    } else if (parent instanceof Html) {
      parent.elm.appendChild(this.elm);
    } else if (typeof parent === "string") {
      document.querySelector(parent)?.appendChild(this.elm);
    }
    return this;
  }
  append(elem: string | HTMLElement | Html) {
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
  appendMany(...elements: any[]) {
    for (const elem of elements) {
      this.append(elem);
    }
    return this;
  }
  clear() {
    this.elm.innerHTML = "";
    return this;
  }
  attr(obj: { [x: string]: string }) {
    for (let key in obj) {
      if (obj[key] !== null) this.elm.setAttribute(key, obj[key]);
      else this.elm.removeAttribute(key);
    }
    return this;
  }
  val(str: any) {
    var x = this.elm as HTMLInputElement;
    x.value = str;
  }
}
