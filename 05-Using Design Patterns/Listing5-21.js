// Define a mixin which enables debug logging, to be applied to any object or "class"
var loggingMixin = {

        // Define a storage array for logs
        logs: [],

        // Define a method to store a message in the log
        log: function(message) {
            this.logs.push(message);
        },

        // Define a method to read out the stored logs
        readLog: function() {
            return this.logs.join("\n");
        }
    },
    element,
    header,
    textField,
    emailField;

// Function to apply methods and properties from one object to another, which we'll use to apply
// the mixin to other objects
function extendObj(obj1, obj2) {
    var obj2Key;

    for (obj2Key in obj2) {
        if (obj2.hasOwnProperty(obj2Key)) {
            obj1[obj2Key] = obj2[obj2Key];
        }
    }

    return obj1;
}

// Define a singleton to which we will apply the mixin, though will function fine without it
element = {
    allElements: [],

    create: function(type) {
        var elem = document.createElement(type);
        this.allElements.push(elem);

        // Use the mixin method log(), ensuring it exists first before calling it. If the mixin
        // is not applied, then the method will still function fine
        if (typeof this.log === "function") {
            this.log("Created an element of type: " + type);
        }

        return elem;
    },

    getAllElements: function() {
        return this.allElements;
    }
};

// Define a simple "class" to which we will apply the mixin
function Field(type, displayText) {
    this.type = type || "";
    this.displayText = displayText || "";

    // Ensure the mixin method log() exists before executing
    if (typeof this.log === "function") {
        this.log("Created an instance of Field");
    }
}

Field.prototype = {
    getElement: function() {
        var field = document.createElement("input");
        field.setAttribute("type", this.type);
        field.setAttribute("placeholder", this.displayText);

        if (typeof this.log === "function") {
            this.log("Created a DOM element with placeholder text: " + this.displayText);
        }

        return field;
    }
};

// Apply the mixin directly to the 'element' object by essentially copying over methods and
// properties from the mixin to the singleton
element = extendObj(element, loggingMixin);

// Apply the mixin to the Field "class" prototype, making its methods available to each object
// instance created from it
Field.prototype = extendObj(Field.prototype, loggingMixin);

// Create a new DOM element using the element.create() method
header = element.create("header");

// Create two object instances, both of which receive the getElement method from the prototype
textField = new Field("text", "Enter the first line of your address");
emailField = new Field("email", "Enter your email address");

// Add the elements stored in these objects to the current page
document.body.appendChild(textField.getElement());
document.body.appendChild(emailField.getElement());

// Output the logs stored via the mixin
alert(loggingMixin.readLog());

// Outputs the following - note how all the logs from each usage of the mixin are
// stored together:
/*
Created an element of type: header
Created an instance of Field
Created an instance of Field
Created a DOM element with placeholder text: Enter the first line of your address
Created a DOM element with placeholder text: Enter your email address
*/