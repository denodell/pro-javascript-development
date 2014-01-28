// Create three form fields for our HTML page, each with different types. We pass in the type,
// the text for the associated <label> tag, and the strategy object associated with this field
// type to provide the required behavior for field value validation
var textField = new FormField("text", "First Name", textFieldStrategy),
    emailField = new FormField("email", "Email", emailFieldStrategy),
    numberField = new FormField("number", "Age", numberFieldStrategy);

// Set values for each form field we know will validate
textField.setValue("Den Odell");
emailField.setValue("denodell@me.com");
numberField.setValue(35);

// Check to see if the values in the fields validate correctly
alert(textField.isValid()); // true
alert(emailField.isValid()); // true
alert(numberField.isValid()); // true

// Change the values in the fields to ones we know will fail validation
textField.setValue("");
emailField.setValue("denodell");
numberField.setValue("Den Odell");

// Check to ensure the isValid() method is working correctly, reflecting the new field values
alert(textField.isValid()); // false
alert(emailField.isValid()); // false
alert(numberField.isValid()); // false