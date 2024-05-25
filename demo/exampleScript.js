import Html from "../dist/html.js";

// Create an element
new Html("h1").text("Hello, Html!").appendTo("body");

// Style example
new Html("p")
  .text("This is a test paragraph.")
  .style({
    color: "red",
    "background-color": "black",
  })
  .appendTo("body");

// JS Style example
new Html("p")
  .text("This is my second paragraph!")
  .styleJs({
    backgroundColor: "red",
  })
  .appendTo("body");

// Event handler example
let count = 0;
new Html("button")
  .text("Click Me!")
  .on("click", (event) => {
    // Increment counter
    count++;
    // Update the text
    Html.from(event.target).text(`Clicked ${count} time(s)`);
  })
  .appendTo("body");

// Globally assign Html for debugging purposes
window.Html = Html;

// Styling body example
// Retrieve body from querySelector (qs)
Html.qs("body").styleJs({
  backgroundColor: "#101010",
  color: "white",
});

// Get the count of paragraphs
new Html("p")
  .text(`There are ${Html.qsa("p").length} existing <p> tags.`)
  .appendTo("body");

// Test of v1.1.3 new .qs and .qsa feature
const text = Html.from("body").qs("p").getText();
console.log(text); // returns "This is a test paragraph.", the text of the first paragraph

// Test of v1.1.6 prepending feature
const div3 = new Html("div")
  .append(new Html("span").text("Second"))
  .prepend(new Html("span").text("First"))
  .appendTo("body");

// Test of v1.2.0 getElement feature (basically .qs() but retrieving a HTMLElement)
const div4 = new Html("div")
  .append(new Html("p").text("Hello!"))
  .appendTo("body");

const innerParagraph = div4.getElement("p").textContent; // Hello!

console.log("Fetched via getElement:", innerParagraph);
