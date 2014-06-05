// Define a "class" for constructing an object representing a simple form field
function FormField(type, displayText){
    this.type = type || "text";
    this.displayText = displayText || "";

    // Create and initialize a form field DOM element
    this.element = document.createElement("input");
    this.element.setAttribute("type", this.type);
    this.element.setAttribute("placeholder", this.displayText);
}

// Define two methods for object instances to inherit
FormField.prototype = {
    getElement: function() {
        return this.element;
    },

    isValid: function() {
        return this.element.value !== "";
    }
};

// Now replace the FormField "class" with a proxy that implements the same methods, yet delays
// calling the original constructor function until those methods are actually called, saving on
// memory resources and improving performance
// Optionally, use the module pattern to localise the scope of the proxy "class", passing in the
// original FormField "class" and returning the proxied version of it
FormField = (function(FormField) {

    // Define a proxy constructor, similar to the original FormField "class"
    function FormFieldProxy(type, displayText) {
        this.type = type;
        this.displayText = displayText;
    }

    FormFieldProxy.prototype = {

        // Define a property to store the reference to the object instance of the original
        // "class" once instantiated
        formField: null,

        // Define a new 'initialize' method whose task it is to create the object instance of
        // FormField if it does not already exist and execute the constructor function from the
        // original "class"
        initialize: function() {
            if (!this.formField) {
                this.formField = new FormField(this.type, this.displayText);
            }
        },

        // Proxy the original methods with new ones that call the intialize() method to
        // instantiate the FormField "class" only when one of these methods are called
        getElement: function() {
            this.initialize();
            return this.formField.getElement();
        },

        isValid: function() {
            this.initialize();
            return this.formField.isValid();
        }
    };

    // Return the proxied "class" to replace the original with
    return FormFieldProxy;
}(FormField));

// Create two object instances, both of which will actually be calling the proxy rather than the
// original "class", meaning the DOM elements will not be created at this stage, saving memory
// and improving performance
var textField = new FormField("text", "Enter the first line of your address"),
    emailField = new FormField("email", "Enter your email address");

// Add the elements stored in these objects to the current page when loaded - at this point the
// getElement() method is called, which in turn calls initialize(), creating an instance of the
// original "class" and executing its constructor function which performs the actual DOM element
// creation. This ensures the memory used to store the DOM element is only taken up at the exact
// point it is required
window.addEventListener("load", function() {
    document.body.appendChild(textField.getElement());
    document.body.appendChild(emailField.getElement());
}, false);

// Execute another method from the proxy, this time the object instance of the original "class"
// won't be recreated and the stored instance will be used instead
alert(emailField.isValid()); // false