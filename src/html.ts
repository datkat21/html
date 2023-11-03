export default class Html {
  /** The HTML element referenced in this instance. Change using `.swapRef()`, or remove using `.cleanup()`. */
  elm: HTMLInputElement | HTMLElement;
  /**
   * Create a new instance of the Html class.
   * @param elm The HTML element to be created or classified from.
   */
  constructor(elm: string | HTMLElement) {
    if (elm instanceof HTMLElement) {
      this.elm = elm;
    } else {
      this.elm = document.createElement(elm || "div");
    }
  }
  /**
   * Sets the text of the current element.
   * @param val The text to set to.
   * @returns Html
   */
  text(val: string): Html {
    this.elm.innerText = val;
    return this;
  }
  /**
   * Sets the text of the current element.
   * @param val The text to set to.
   * @returns Html
   */
  html(val: string): Html {
    this.elm.innerHTML = val;
    return this;
  }
  /**
   * Safely remove the element. Can be used in combination with a `.swapRef()` to achieve a "delete & swap" result.
   * @returns Html
   */
  cleanup(): Html {
    this.elm.remove();
    return this;
  }
  /**
   * querySelector something.
   * @param selector The query selector.
   * @returns The HTML element (not as Html)
   */
  query(selector: string): HTMLElement | null {
    return this.elm.querySelector(selector);
  }
  /**
   * querySelector something and get Html access to it.
   * @param selector The query selector.
   * @returns The HTML element (as Html)
   */
  queryHtml(selector: string): Html | null {
    return new Html(this.elm.querySelector(selector) as HTMLElement);
  }
  /**
   * Sets the ID of the element.
   * @param val The ID to set.
   * @returns Html
   */
  id(val: string): Html {
    if(this.elm.id != null) {
      throw Error("The element already has an ID.");
    }
    this.elm.id = val;
    return this;
  }
  /**
   * Toggle on/off a class.
   * @param val The class to toggle.
   * @returns Html
   */
  class(...val: string[]): Html {
    for (let i = 0; i < val.length; i++) {
      this.elm.classList.toggle(val[i]);
    }
    return this;
  }
  /**
   * Toggles ON a class.
   * @param val The class to enable.
   * @returns Html
   */
  classOn(...val: string[]): Html {
    for (let i = 0; i < val.length; i++) {
      this.elm.classList.add(val[i]);
    }
    return this;
  }
  /**
   * Toggles OFF a class.
   * @param val The class to disable.
   * @returns Html
   */
  classOff(...val: string[]): Html {
    for (let i = 0; i < val.length; i++) {
      this.elm.classList.remove(val[i]);
    }
    return this;
  }
  /**
   * Apply CSS styles (dashed method.) Keys use CSS syntax, e.g. `background-color`.
   * @param obj The styles to apply (as an object of `key: value;`.)
   * @returns Html
   */
  style(obj: { [x: string]: string | null }): Html {
    for (const key of Object.keys(obj)) {
      this.elm.style.setProperty(key, obj[key]);
    }
    return this;
  }
  /**
   * Apply CSS styles (JS method.) Keys use JS syntax, e.g. `backgroundColor`.
   * @param obj The styles to apply (as an object of `key: value;`)
   * @returns Html
   */
  styleJs(obj: { [key: string]: string | null; }): Html {
    for (const key of Object.keys(obj)) {
      //@ts-ignore No other workaround I could find.
      this.elm.style[key] = obj[key];
    }
    return this;
  }
  /**
   * Apply an event listener.
   * @param ev The event listener type to add.
   * @param cb The event listener callback to add.
   * @returns Html
   */
  on(ev: string, cb: EventListenerOrEventListenerObject): Html {
    this.elm.addEventListener(ev, cb);
    return this;
  }
  /**
   * Remove an event listener.
   * @param ev The event listener type to remove.
   * @param cb The event listener callback to remove.
   * @returns Html
   */
  un(ev: string, cb: EventListenerOrEventListenerObject): Html {
    this.elm.removeEventListener(ev, cb);
    return this;
  }
  /**
   * Append this element to another element. Uses `appendChild()` on the parent.
   * @param parent Element to append to. HTMLElement, Html, and string (as querySelector) are supported.
   * @returns Html
   */
  appendTo(parent: HTMLElement | Html | string): Html {
    if (parent instanceof HTMLElement) {
      parent.appendChild(this.elm);
    } else if (parent instanceof Html) {
      parent.elm.appendChild(this.elm);
    } else if (typeof parent === "string") {
      document.querySelector(parent)?.appendChild(this.elm);
    }
    return this;
  }
  /**
   * Append an element. Typically used as a `.append(new Html(...))` call.
   * @param elem The element to append.
   * @returns Html
   */
  append(elem: string | HTMLElement | Html): Html {
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
  /**
   * Append multiple elements. Typically used as a `.appendMany(new Html(...), new Html(...)` call.
   * @param elements The elements to append.
   * @returns Html
   */
  appendMany(...elements: any[]): Html {
    for (const elem of elements) {
      this.append(elem);
    }
    return this;
  }
  /**
   * Clear the innerHTML of the element.
   * @returns Html
   */
  clear(): Html {
    this.elm.innerHTML = "";
    return this;
  }
  /**
   * Set attributes (object method.)
   * @param obj The attributes to set (as an object of `key: value;`)
   * @returns Html
   */
  attr(obj: { [x: string]: string }): Html {
    for (let key in obj) {
      if (obj[key] !== null && obj[key] !== undefined) {
        this.elm.setAttribute(key, obj[key]);
      }
      else {
        this.elm.removeAttribute(key);
      }
    }
    return this;
  }
  /**
   * Set the text value of the element. Only works if element is `input` or `textarea`.
   * @param str The value to set.
   * @returns Html
   */
  val(str: any): Html {
    var x = this.elm as HTMLInputElement;
    x.value = str;
    return this;
  }
  /**
   * Retrieve text content from the element. (as innerText, not trimmed)
   * @returns string
   */
  getText(): string {
    return (this.elm as HTMLInputElement).innerText;
  }
  /**
   * Retrieve HTML content from the element.
   * @returns string
   */
  getHtml(): string {
    return (this.elm as HTMLInputElement).innerHTML;
  }
  /**
   * Retrieve the value of the element. Only applicable if it is an `input` or `textarea`.
   * @returns string
   */
  getValue(): string {
    return (this.elm as HTMLInputElement).value;
  }
  /**
   * Swap the local `elm` with a new HTMLElement.
   * @param elm The element to swap with.
   * @returns Html
   */
  swapRef(elm: HTMLElement): Html {
    this.elm = elm;
    return this;
  }
  /**
   * An alternative method to create an Html instance.
   * @param elm Element to create from.
   * @returns Html
   */
  static from(elm: HTMLElement | string) {
    return new Html(elm);
  }
  /**
   * An easier querySelector method.
   * @param query The string to query
   * @returns a new Html
   */
  static qs(query: string): Html | null {
    if (document.querySelector(query)) {
      return Html.from(document.querySelector(query) as HTMLElement);
    } else {
      return null;
    }
  }
  /**
   * An easier querySelectorAll method.
   * @param query The string to query
   * @returns a new Html
   */
  static qsa(query: string): Array<Html | null> | null {
    if (document.querySelector(query)) {
      return Array.from(document.querySelectorAll(query)).map(e => Html.from(e as HTMLElement));
    } else {
      return null;
    }
  }
}
