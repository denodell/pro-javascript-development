// Locate and store a reference to the <script id="template"> element from our HTML page
var templateElement = document.getElementById("template"),

    // Extract the template as a string from within the template element
    template = templateElement.innerHTML,

    // Create two elements to store our resulting HTML in once our template is
    // combined with our data
    meElement = document.createElement("div"),
    billElement = document.createElement("div"),

    // Define two objects containing data to apply to the stored template
    meData = {
        firstName: "Den",
        lastName: "Odell",
        email: "denodell@me.com",
        company: "AKQA",
        city: "London"
    },
    billData = {
        firstName: "Bill",
        lastName: "Gates",
        email: "bill@microsoft.com",
        company: "Microsoft",
        city: "Seattle"
    };

// Use Mustache.js to apply the data to the template and store the result within the
// newly created elements
meElement.innerHTML = Mustache.render(template, meData);
billElement.innerHTML = Mustache.render(template, billData);

// Add the new elements, populated with HTML, to the current page once loaded
window.addEventListener("load", function() {
    document.body.appendChild(meElement);
    document.body.appendChild(billElement);
}, false);