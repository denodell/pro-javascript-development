// Define a "class" representing a form field in an HTML page
function FormField(type, displayText){
    this.type = type || "text";
    this.displayText = displayText || "";

    // Create a new <input> tag, setting its field type to the value supplied upon instantiation
    this.element = document.createElement("input");
    this.element.setAttribute("type", this.type);

    // Create a new <label> tag, setting its text to the value supplied upon instantiation
    this.label = document.createElement("label");
    this.label.innerHTML = this.displayText;

    // Add the <label> and <input> tags to the current page
    document.body.appendChild(this.label);
    document.body.appendChild(this.element);
}

// Give each form field object instance three methods
FormField.prototype = {

    // Return the current value stored in the form field
    getValue: function() {
        return this.element.value;
    },

    // Set a new value for the form field
    setValue: function(value) {
        this.element.value = value;
    },

    // Return a true / false value depending on whether the value in the form field is valid
    isValid: function() {
        var isValid = false,
            value;

        // If this is a <input type="text"> field, it is considered valid if its value is not
        // an empty string
        if (this.type === "text") {
            isValid = this.getValue() !== "";

        // If this is a <input type="email"> field, it is considered valid if its value is not
        // an empty string, contains the "@" character and contains the "." character after "@"
        } else if (this.type === "email") {
            value = this.getValue();
            isValid = value !== "" && value.indexOf("@") > 0 && value.indexOf(".", value.indexOf("@")) > 0;

        // If this is a <input type="number"> field, it is considered valid if its value is
        // a number
        } else if (this.type === "number") {
            value = this.getValue();
            isValid = !isNaN(parseInt(value, 10));

        // This could go on a while as there are 24 possible <input> types in HTML5. We need a
        // way to simplify this to make it easier to understand and extend in future - this is
        // where the strategy pattern comes into play, as shown in Listing 7-15
        } else {
            // etc.
        }

        return isValid;
    }
};