// Locate and store a reference to the <script id="template"> element from our HTML page
var templateElement = document.getElementById("template"),

    // Locate and store a reference to the <script id="people"> element
    peopleTemplateElement = document.getElementById("people"),

    // Extract the template as a string from within the template element
    template = templateElement.innerHTML,

    // Extract the "people" template as a string from within the <script> element
    peopleTemplate = peopleTemplateElement.innerHTML,

    // Create an element to store our resulting HTML in once our template is
    // combined with the partial and our data
    outputElement = document.createElement("div"),

    // Define an object containing data to apply to the stored template
    data = {
        people: [{
            name: "Den Odell"
        }, {
            name: "Bill Gates"
        }]
    };

// Use Mustache.js to apply the data to the template, and allow access to the named partial
// templates and store the result within the newly created element
outputElement.innerHTML = Mustache.render(template, data, {
    people: peopleTemplate
});

// Add the new element, populated with HTML, to the current page once loaded
window.addEventListener("load", function() {
    document.body.appendChild(outputElement);
}, false);

// The resulting HTML will be:
/*
<h1>People</h1>
<p>Name: Den Odell</p>
<p>Name: Bill Gates</p>
 */