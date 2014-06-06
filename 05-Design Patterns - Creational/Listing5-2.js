// Use the factory to create a text input form field, an email form field, and a submit button.
// Note how we do not need to know about the underlying "classes" or their specific inputs to
// create the form fields - the FormFieldFactory abstracts this away
var textField = FormFieldFactory.makeField({
        type: "text",
        displayText: "Enter the first line of your address"
    }),
    emailField = FormFieldFactory.makeField({
        type: "email",
        displayText: "Enter your email address"
    }),
    buttonField = FormFieldFactory.makeField({
        type: "button",
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