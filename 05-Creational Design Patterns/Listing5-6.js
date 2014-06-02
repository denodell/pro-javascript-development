// Instantiate the form builder
var formBuilder = new FormBuilder(),
    form;

// Add fields in any order and at any time required in the application - only the type and
// content is required, the actual object creation is abstracted away in the builder
formBuilder.addField("text", "Enter the first line of your address");
formBuilder.addField("email", "Enter your email address");
formBuilder.addField("button", "Submit");

// When the final form is required, call the builder's getForm method to return a <form> element
// containing all the fields
form = formBuilder.getForm();

// Append the <form> element to the current page once it has loaded
window.addEventListener("load", function() {
    document.body.appendChild(form);
}, false);