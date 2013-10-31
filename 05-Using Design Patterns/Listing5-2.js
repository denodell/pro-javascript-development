// Use the factory to create a text input form field, an email form field, and a submit button.
// Note how we do not need to know about the underlying classes or their specific inputs to
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

// Add the three DOM elements to the current page
document.body.appendChild(textField.getElement());
document.body.appendChild(emailField.getElement());
document.body.appendChild(buttonField.getElement());