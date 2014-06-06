// Define a class for constructing an object representing a simple form field
var FormField = function(type, displayText){

    // Use the inputs to the constructor to determine the form field's type, defaulting to a simple text field, and its placeholder text
    this.type = type || "text";
    this.displayText = displayText || "";
};

FormField.prototype = {
    createElement: function() {
        this.element = document.createElement("input");
        this.element.setAttribute("type", this.type);
        this.element.setAttribute("placeholder", this.displayText);
        return this.element;
    },

    isValid: function() {
        return this.element.value !== "";
    }
};

// The form field deocorator, which implements the same public methods as FormField
var FormFieldDecorator = function(formField) {
    this.formField = formField;
};

FormFieldDecorator.prototype = {
    createElement: function() {
        this.formField.createElement();
    },

    isValid: function() {
        return this.formField.isValid();
    }
};

var MaxLengthFieldDecorator = function(formField, maxLength) {
    FormFieldDecorator.call(this, formField);
    this.maxLength = maxLength || 100;
};
MaxLengthFieldDecorator.prototype = new FormFieldDecorator();
MaxLengthFieldDecorator.prototype.createElement = function() {
    var element = this.formField.createElement();
    element.setAttribute("maxlength", this.maxLength);
    return element;
};

var AutoCompleteFieldDecorator = function(formField, autocomplete) {
    FormFieldDecorator.call(this, formField);
    this.autocomplete = autocomplete || "on";
};
AutoCompleteFieldDecorator.prototype = new FormFieldDecorator();
AutoCompleteFieldDecorator.prototype.createElement = function() {
    var element = this.formField.createElement();
    element.setAttribute("autocomplete", this.autocomplete);
    return element;
};