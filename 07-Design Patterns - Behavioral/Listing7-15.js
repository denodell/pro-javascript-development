// Define a "class" representing a form field in an HTML page. Note a new object is passed into
// the third parameter at instantiation, containing a strategy object. This object contains a
// specific implementation of the isValid() method pertaining to the specific type of form field
// we are creating - for example, a "text" field would require an isValid() method that checks
// to see if the stored value is not an empty string, so we create an object containing this
// method and pass it in through the strategy object at instantiation time
function FormField(type, displayText, strategy){
    this.type = type || "text";
    this.displayText = displayText || "";

    this.element = document.createElement("input");
    this.element.setAttribute("type", this.type);

    this.label = document.createElement("label");
    this.label.innerHTML = this.displayText;

    // Check to see if the strategy object passed in contains the isValid() method to use and,
    // if so, store the stragety object for use when the isValid() method of this object is
    // executed. If no strategy object is supplied, use a default
    if (strategy && typeof strategy.isValid === "function") {
        this.strategy = strategy;
    } else {
        this.strategy = {
            isValid: function() {
                return false;
            }
        };
    }

    document.body.appendChild(this.label);
    document.body.appendChild(this.element);
}

FormField.prototype = {
    getValue: function() {
        return this.element.value;
    },

    setValue: function(value) {
        this.element.value = value;
    },

    // Replace the previous isValid() method with one that simply calls the isValid() method
    // provided by the stored strategy object - no more extensive if..else statements, making
    // the code for this "class" much smaller and easier to manage
    isValid: function() {
        return this.strategy.isValid.call(this);
    }
};

// Define three strategy objects for three different types of form field to be used with the
// FormField "class" when it is instantiated. Here we provide specific implementations for the
// isValid() method, but we could have extended these to include more methods and/or properties
// to meet our needs. In cases like this, we would have created a strategy "class" and created
// these objects as instances of that "class". Here we have simple objects so it is smarter to
// keep the code short and to the point
var textFieldStrategy = {

        // Specific functionality for validation of a <input type="text"> field
        isValid: function() {
            return this.getValue() !== "";
        }
    },
    emailFieldStrategy = {

        // Specific functionality for validation of a <input type="email"> field
        isValid: function() {
            var value = this.getValue();
            return value !== "" && value.indexOf("@") > 0 && value.indexOf(".", value.indexOf("@")) > 0;
        }
    },
    numberFieldStrategy = {

        // Specific functionality for validation of a <input type="number"> field
        isValid: function() {
            var value = this.getValue();
            return !isNaN(parseInt(value, 10));
        }
    };