# Html library for JavaScript

The Html library allows you to efficiently create HTML elements within any client-side JavaScript application.

## Why?

It makes creating HTML elements much easier and less confusing.   
Consider the following JavaScript using native DOM:
```js
const paragraph = document.createElement("p");
paragraph.classList.add("my-paragraph");
paragraph.innerText = "Hello, world";
document.body.appendChild(paragraph);
```
This can be simplified to the following:
```js
const paragraph =
  // Create the specific element 
  new Html("p")
  // Apply the class
  .class("my-paragraph")
  // Set the text
  .text("Hello, world!")
  // This is an automatic querySelector (also works if you pass in `document.body`)
  .appendTo("body");
```

I made this library a few months ago and have used it in several projects, so I thought it was about time to give it its own repository to easily re-use when needed.


## Usage

Install the module:

```
npm i @datkat21/html
```

Import it into your project via method(s):

1. Copy and import html.js as a module:
  ```js
  import Html from './html.js';
  ```
2. Loading via package manager:
  ```js
  import Html from '@datkat21/html';
  ```

If you copy `html.js` into your website code and are using a code editor that supports TypeScript annotations, please also copy the html.d.ts file to smoothen your development experience with the library.
If you are creating with TypeScript (e.g. Deno or Bun), you may simply bring `html.ts` into your project if you don't want to import it from the NPM repository.


## New in v1.2.0

It's mid 2024 now, time for a new minor update!

Thanks to the #4 pull request by SpcFORK, a few things have been tweaked to make the library run better and build quicker. There is also a new method: `getElement()`.

`getElement()` acts similarly to `qs()` but returns a HTMLElement instead of a Html instance. This could be easier in some instances such as this:

```js
// Old method to retrieve sub-child HTML element (a bit more verbose)
const div = new Html('div').append(new Html('p').text("Hello!"));
const innerParagraph = div.qs("p").elm.textContent; // Hello!

// New method (simpler)
const div = new Html('div').append(new Html('p').text("Hello!"));
const innerParagraph = div.getElement("p").textContent; // Hello!
```

## New in v1.1.6

Alongside `.append()`, `.appendTo()`, and `.appendMany()`, Html now has `.prepend()`, `.prependTo()`, and `.prependMany()`! They function the same, but start from the beginning of the element instead of the end.

## New in v1.1.3

- **REMOVED** `.queryHtml()` from local class methods in favor of `.qs()` and `.qsa()`
- Added `.qs()`, `.qsa()`, and `.id()` to local class methods

## New in v1.1.0

- A few new methods have been introduced.
- Added full JSDoc documentation.
- You can now (finally) create Html instances from actual HTML elements.

### New static methods

These are very useful if you want to quickly retrieve a HTML element from the DOM as a new Html instance.

- `Html.from(element)` Retrieve a HTML element as a new Html instance
- `Html.qs(query)` Retrieve a querySelector as a new Html instance
- `Html.qsa(query)` Retrieve all querySelector elements as an array of new Html instances

Examples:

```js
Html.from(document.body) // Html { elm: <body> }
Html.qs('p.red') // Html { elm: <p class="red"> }
Html.qsa('li') // Array(3) [ { elm: <li> }, {...}, {...} ]
```

### New methods

- `queryHtml(selector)` querySelector something and return as a new Html instance
- `styleJs({ ... })` Style as JS syntax (`backgroundColor` instead of `background-color` for example)
- `getText()` Retrieve innerText
- `getHtml()` Retrieve innerHTML
- `getValue()` Retrieve value

Examples:

```js
let body = Html.qs('body');

// queryHtml
body.queryHtml('p.red') // Html { elm: <p class="red"> }

// styleJs
body.styleJs({
  backgroundColor: '#101010',
  fontFamily: 'sans-serif',
})

let div = new Html('div').appendTo('body');

// getText
let p = new Html('p').text('Hello, world!').appendTo(div);
p.getText() // 'Hello, world!'

// getHtml
div.getHtml() // <p>Hello, world!</p>

// getValue
let input = Html.qs('input');
let value = input.getValue();
```

## Documentation

The Html library is a class that can be initialized at any time to create HTML elements in a simple way.

### Examples

For example, I'll show how some layouts can be created in HTML vs the Html class:

```html
<div class="card">
  <span class="h1">This is a heading!</span>
  <span>This is my paragraph text</span>
</div>
```

In Html:

```js
new Html("div")
  .class("card")
  .appendMany(
    new Html("span").class("h1").text("This is a heading!"),
    new Html("span").text("This is my paragraph text")
  );
```

You also have to define where to place the element, using the `.appendTo()` method. Here's an example:

```js
// A new div that gets appended to the <body> tag.
const container = new Html("div").appendTo("body");

// A new span added with the class "h1" and text, then dynamically appended to the container.
new Html("span")
  .class("h1")
  .text("Hello, this goes into the container!")
  .appendTo(container);
```

This will create the following layout:

```html
<body>
  <div>
    <span class="h1"> Hello, this goes into the container! </span>
  </div>
</body>
```

### Methods

There are a few more advanced methods to how the Html class works:

- `.style()`  
   Add inline styles
  ```js
  new Html("span").style({
    color: "red",
    // These are CSS style names,
    // so you will have to use dashes..
    "font-size": "18px",
    // Another example
    "backdrop-filter": "blur(4px)"
  });
  ```
- `.styleJs()`  
   Add inline styles (JS syntax)
  ```js
  new Html("span").styleJs({
    color: "red",
    fontSize: "18px",
    backdropFilter: "blur(4px)"
  });
  ```
- `.attr()`  
   Set attributes for the element
  ```js
  new Html("span").attr({
    id: "MySpan",
  });
  // <span id="MySpan"></span>
  ```
- `.class()`  
   Toggle a class (on/off)
  ```js
  new Html("span").class("my-class");
  // <span class="my-class"></span>
  ```
- `.classOn()`  
   Add a class (Recommended to use over `.class()`)
  ```js
  new Html("span").classOn("my-class");
  // <span class="my-class"></span>
  ```
- `.classOff()`  
   Remove a class
  ```js
  new Html("span").classOff("my-class");
  // <span></span>
  ```
- `.id()`  
   Set the id of an element
   ```js
  new Html("div").id("my-id");
  // <div id="my-id"></div>
   ```
- `.on(eventName, eventHandler)`  
   Add an event listener

  ```js
  function myEvent(e) {
    console.log(e);
  }

  new Html("span").on("click", myEvent);

  // or

  new Html("span").on("click", function (e) {
    console.log(e);
  });
  ```
- `.un(eventName, eventHandler)`  
- `.prepend(elm)`
  Add a new element to the beginning of the element
  ```js
  const container = new Html("div").prepend(
    new Html("span").text("Hello, world!")
  );
  ```
- `.prependMany(...elms)`
  Add multiple elements to the start
  ```js
  new Html("div").prependMany(
    new Html("span").class("h1").text("Hello!"),
    new Html("span").text("Hi!")
  );
  /*
  <div>
    <span class="h1">Hello!</span>
    <span>Hi!</span>
  </div>
  */
  ```
- `.prependTo()`
  Prepend the element to the beginning of another element
  ```js
  new Html("div").prependTo("body");
  
  /*
  <body>
    <div></div>
    <p>Hello</p>
  </body>
  */
  ```
   Remove an event listener (if a function is available)

  ```js
  function myEvent(e) {
    console.log(e);
  }

  new Html("span").un("click", myEvent);
  ```
- `.append(elm)`
  Add a new element inside the element
  ```js
  const container = new Html("div").append(
    new Html("span").text("Hello, world!")
  );
  ```
- `.appendMany(...elms)`
  Add multiple elements
  ```js
  new Html("div").appendMany(
    new Html("span").class("h1").text("Hello!"),
    new Html("span").text("Hi!")
  );
  /*
  <div>
    <span class="h1">Hello!</span>
    <span>Hi!</span>
  </div>
  */
  ```
- `.appendTo()`
  Append the element to another element
  ```js
  new Html("div").appendTo("body");
  
  /*
  <body>
    <p>Hello</p>
    <div></div>
  </body>
  */
  ```
- `.cleanup()`  
  Destroy the element

  ```js
  const div = new Html("div").appendTo("body");

  // later
  div.cleanup();
  ```
- `.swapRef(elm)`  
  Swap the element reference with a new one

  ```js
  const div = new Html("div").appendTo("body");

  const div2 = document.querySelector("body > div.two");

  div.swapRef(div2); // div now references div2
  ```
- `.getText()`
  Get text of the element

  ```js
  const div = new Html("div").text("This is my text...");

  div.getText(); // 'This is my text...'
  ```
- `.getHtml()`
  Get HTML content of the element

  ```js
  const div = new Html("div").html("<p>This is my <b>HTML</b> content...</p>");

  div.getHtml(); // '<p>This is my <b>HTML</b> content...</p>'
  ```
- `.getValue()`
  Get input value of the element

  ```js
  const input = new Html("input").attr({ type: 'text' });

  // after typing...

  input.getValue(); // 'I typed this text'
  ```

## Building

Clone the repository:

```
git clone https://github.com/datkat21/html.git
cd html
```

Install dependencies and run build script:

```
npm i
npm run build # Build script.
```

## Repository

You can find the repository [on GitHub.](https://github.com/datkat21/html)