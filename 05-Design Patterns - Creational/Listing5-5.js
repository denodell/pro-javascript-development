// Define a builder "class" for constructing simple forms which can be configured according to
// the end developer's needs. The end developer will instantiate the builder and add fields to
// the form as needed throughout the course of their application, finally calling a method to
// return a <form> element containing all the fields added
function FormBuilder() {}
FormBuilder.prototype = {

    // Define a property for storing fields created
    fields: [],

    // Define a method for adding fields to the form instance
    addField: function(type, displayText) {
        var field;

        // Use the supplied form field type and display text to instantiate the relevant form
        // field "class"
        switch (type) {
        case "text":
            field = new TextField(displayText);
            break;
        case "email":
            field = new EmailField(displayText);
            break;
        case "button":
            field = new ButtonField(displayText);
            break;
        default:
            throw new Error("Invalid field type specified: " + type);
        }

        // Add the created field object to the storage array
        this.fields.push(field);
    },

    // Define a method for returning the resulting <form> element, containing the fields added
    // using the addField method
    getForm: function() {

        // Create a new <form> element
        var form = document.createElement("form"),
            index = 0,
            numFields = this.fields.length,
            field;

        // Loop through each field in the fields property, getting the DOM element from each and
        // adding it to the <form> element
        for (; index < numFields; index++) {
            field = this.fields[index];
            form.appendChild(field.getElement());
        }

        // Return the populated <form> element
        return form;
    }
};

// Define the underlying form field "classes", as in Listing 5-1
function TextField(displayText) {
    this.displayText = displayText || "";
}
TextField.prototype.getElement = function() {
    var textField = document.createElement("input");
    textField.setAttribute("type", "text");
    textField.setAttribute("placeholder", this.displayText);

    return textField;
};

function EmailField(displayText) {
    this.displayText = displayText || "";
}
EmailField.prototype.getElement = function() {
    var emailField = document.createElement("input");
    emailField.setAttribute("type", "email");
    emailField.setAttribute("placeholder", this.displayText);

    return emailField;
};

function ButtonField(displayText) {
    this.displayText = displayText || "";
}
ButtonField.prototype.getElement = function() {
    var button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.innerHTML = this.displayText;

    return button;
};