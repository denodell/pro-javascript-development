// Create an empty <form> tag and a new FormField object to represent
// a <input type="search"> field
var form = document.createElement("form"),
    formField = new FormField("search", "Enter your search term");

// Extend the formField object using our decorators to add maxlength and autocomplete properties
// to the resulting form field element. Note how we pass the extended formField object into each
// decorator in turn, which extends it further.
formField = new MaxLengthFieldDecorator(formField, 255);
formField = new AutoCompleteFieldDecorator(formField, "off");

// Create the HTML form field element and add it to the <form> element
form.appendChild(formField.createElement());

// Add an event handler to the <form> tag's submit event, preventing the form from submitting if
// the form field we added contains no value
form.addEventListener("submit", function(e) {

    // Stop the form from submitting
    e.preventDefault();

    // Test to see if our form field is valid, i.e. that it contains a value
    if (formField.isValid()) {

        // If it does, go ahead and submit the form
        form.submit();
    } else {

        // If it doesn't, alert the user that something is wrong and they need to correct it
        alert("Please correct the issues in the form field.");
    }
}, false);

// Add the <form> field to the current page once it has loaded
window.addEventListener("load", function() {
    document.body.appendChild(form);
}, false);