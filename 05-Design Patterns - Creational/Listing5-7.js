var textField,
    emailField;

// Define a Field "class" to be used for creating <input> form elements
function Field(type, displayText) {
    this.type = type || "";
    this.displayText = displayText || "";
}

// Use the prototype property to adopt the Prototype pattern of defining methods that will be
// applied to any object instantiated from this "class"
Field.prototype = {
    getElement: function() {
        var field = document.createElement("input");
        field.setAttribute("type", this.type);
        field.setAttribute("placeholder", this.displayText);

        return field;
    }
};

// Create two object instances, both of which receive the getElement method from the prototype
textField = new Field("text", "Enter the first line of your address");
emailField = new Field("email", "Enter your email address");

// Add the elements stored in these objects to the current page once loaded
window.addEventListener("load", function() {
    var bodyElement = document.body;

    bodyElement.appendChild(textField.getElement());
    bodyElement.appendChild(emailField.getElement());
}, false);