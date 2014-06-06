// Define the factory that will make form field objects for us using the most appropriate
// "class" depending on the inputs
var FormFieldFactory = {

        // The makeField method takes two options:
        // - type, which defines the type of form field object to create, e.g. text, email,
        //    or button
        // - displayText, which defines either the placeholder text for the form field, or the
        //    text to display on the button, depending on the type
        makeField: function(options) {
            var options = options || {},
                type = options.type || "text",
                displayText = options.displayText || "",
                field;

            // Create an object instance using the most appropriate "class" based on the
            // supplied input type
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

            // If in doubt, use the TextField "class"
            default:
                field = new TextField(displayText);
                break;
            }

            return field;
        }
    };

// Define the TextField "class" to be used for creating <input type="text"> form elements
function TextField(displayText) {
    this.displayText = displayText;
}

// The getElement method will create a DOM element using the supplied placeholder text value
TextField.prototype.getElement = function() {
    var textField = document.createElement("input");
    textField.setAttribute("type", "text");
    textField.setAttribute("placeholder", this.displayText);

    return textField;
};

// Define the EmailField "class" to be used for creating <input type="email"> form elements
function EmailField(displayText) {
    this.displayText = displayText;
}

// The getElement method will create a DOM element using the supplied placeholder text value
EmailField.prototype.getElement = function() {
    var emailField = document.createElement("input");
    emailField.setAttribute("type", "email");
    emailField.setAttribute("placeholder", this.displayText);

    return emailField;
};

// Define the ButtonField "class" to be used for creating <button> form elements
function ButtonField(displayText) {
    this.displayText = displayText;
}

// The getElement method will create a DOM element using the supplied button text value
ButtonField.prototype.getElement = function() {
    var button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.innerHTML = this.displayText;

    return button;
};