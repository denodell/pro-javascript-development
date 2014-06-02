// Define a base factory "class" for creating form fields, from which other, more specialised
// form field creation factory "classes" will be inherited.
function FormFieldFactory() {

    // Define a list of supported field types to be applied to all inherited form field
    // factory classes
    this.availableTypes = {
        TEXT: "text",
        EMAIL: "email",
        BUTTON: "button"
    };
}
FormFieldFactory.prototype = {

    // Define a makeField() method which will be overwritten by sub classes using polymorphism.
    // This method should therefore not be called directly from within this parent "class" so
    // we'll throw an error if it is
    makeField: function() {
        throw new Error("This method should not be called directly.");
    }
};

// Define a factory "class", inherited from the base factory, for creating HTML5 form fields.
// Read more about the differences in these form fields from HTML4 at
// http://bit.ly/html5_webforms
function Html5FormFieldFactory() {}
Html5FormFieldFactory.prototype = new FormFieldFactory();

// Override the makeField() method with code specific for this factory
Html5FormFieldFactory.prototype.makeField = function(options) {
    var options = options || {},
        type = options.type || this.availableTypes.TEXT,
        displayText = options.displayText || "",
        field;

    // Select the most appropriate field type based on the provided options
    switch (type) {
    case this.availableTypes.TEXT:
        field = new Html5TextField(displayText);
        break;
    case this.availableTypes.EMAIL:
        field = new Html5EmailField(displayText);
        break;
    case this.availableTypes.BUTTON:
        field = new ButtonField(displayText);
        break;
    default:
        throw new Error("Invalid field type specified: " + type);
    }

    return field;
};

// Define a factory "class", also inherited from the same base factory, for creating
// older-style HTML4 form fields
function Html4FormFieldFactory() {}
Html4FormFieldFactory.prototype = new FormFieldFactory();

// Override the makeField() method with code specific for this factory
Html4FormFieldFactory.prototype.makeField = function(options) {
    var options = options || {},
        type = options.type || this.availableTypes.TEXT,
        displayText = options.displayText || "",
        field;

    switch (type) {
    case this.availableTypes.TEXT:
    case this.availableTypes.EMAIL:
        field = new Html4TextField(displayText);
        break;
    case this.availableTypes.BUTTON:
        field = new ButtonField(displayText);
        break;
    default:
        throw new Error("Invalid field type specified: " + type);
    }

    return field;
};

// Define the form field "classes" to be used for creating HTML5 and HTML4 form elements
function Html5TextField(displayText) {
    this.displayText = displayText || "";
}
Html5TextField.prototype.getElement = function() {
    var textField = document.createElement("input");
    textField.setAttribute("type", "text");
    textField.setAttribute("placeholder", this.displayText);

    return textField;
};

// Since the placeholder attribute isn't supported in HTML4, we'll instead create and return a
// <div> element containing the text field and an associated <label> containing the
// placeholder text
function Html4TextField(displayText) {
    this.displayText = displayText || "";
}
Html4TextField.prototype.getElement = function() {
    var wrapper = document.createElement("div"),
        textField = document.createElement("input"),
        textFieldId = "text-field-" + Math.floor(Math.random() * 999),
        label = document.createElement("label"),
        labelText = document.createTextNode(this.displayText);

    textField.setAttribute("type", "text");
    textField.setAttribute("id", textFieldId);

    // Associate the <label> with the <input> using the label ‘for’ attribute and the input ‘id’
    label.setAttribute("for", textFieldId);
    label.appendChild(labelText);

    wrapper.appendChild(textField);
    wrapper.appendChild(label);

    return wrapper;
};

function Html5EmailField(displayText) {
    this.displayText = displayText;
}
Html5EmailField.prototype.getElement = function() {
    var emailField = document.createElement("input");
    emailField.setAttribute("type", "email");
    emailField.setAttribute("placeholder", this.displayText);

    return emailField;
};

// We define the button form element to be identical for both HTML5 and HTML4 form field types,
// so no need for two separate "classes". If we ever needed to create a different HTML5 version
// in future, we'd only need to update the relevant factory "class" with the change, and the
// rest of the code in our full application will adapt accordingly
function ButtonField(displayText) {
    this.displayText = displayText;
}
ButtonField.prototype.getElement = function() {
    var button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.innerHTML = this.displayText;

    return button;
};