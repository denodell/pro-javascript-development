// Establish if the browser supports HTML5, and select the appropriate form field factory
var supportsHtml5FormFields = (function() {

        // This self-executing function attempts to create a HTML5 form field type:
        // <input type="email">
        var field = document.createElement("input");
        field.setAttribute("type", "email");

        // If the new form field returns the corrent field type then it was created correctly
        // and is a browser that supports HTML5. If not, the browser is HTML4-only
        return field.type === "email";
    }()),

    // Use the value returned previously to select the appropriate field field creation factory
    // "class" and create an instance of it
    formFieldFactory = supportsHtml5FormFields ? new Html5FormFieldFactory() : new Html4FormFieldFactory(),

    // Use the factory to create a text input form field, an email form field, and a submit
    // button, which will now use the most appropriate field type and attributes for the
    // current browser
    textField = formFieldFactory.makeField({
        type: "text",
        displayText: "Enter the first line of your address"
    }),
    emailField = formFieldFactory.makeField({
        type: "email",
        displayText: "Enter your email address"
    }),

    // Notice how we can harness the availableTypes property containing the list of supported
    // field types from the factory "class" instead of using a hard-coded text string for the
    // form field type. This is preferred, just as variables are preferable over
    // hard-coded values.
    buttonField = formFieldFactory.makeField({
        type: formFieldFactory.availableTypes.BUTTON,
        displayText: "Submit"
    });

// Wait for the browser's "load" event to fire, then add the DOM elements represented by the
// three newly created objects to the current page
window.addEventListener("load", function() {
    var bodyElement = document.body;

    // Use the getElement() method of each object to get a reference to its DOM element for
    // adding to the page
    bodyElement.appendChild(textField.getElement());
    bodyElement.appendChild(emailField.getElement());
    bodyElement.appendChild(buttonField.getElement());
}, false);