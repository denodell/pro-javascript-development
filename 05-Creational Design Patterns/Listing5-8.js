// Define a base object with two properties, type and displayText, and a getElement() method
// which creates a HTML <input> element, configuring it using the values from the two properties
var field = {
        type: "",
        displayText: "",

        getElement: function() {
            var field = document.createElement("input");
            field.setAttribute("type", this.type);
            field.setAttribute("placeholder", this.displayText);

            return field;
        }
    },

    // Create a new object based upon the base object, using ECMAScript 5's Object.create()
    // method to clone the original object and apply values to the two properties type and
    // displayText, in order to create an object capable of creating a <input type="text">
    // element when the object's getElement() method is called
    textField = Object.create(field, {

        // The second parameter of Object.create() allows values from the first parameter to be
        // overwritten using the format described in Chapter 1
        'type': {
            value: "text",
            enumerable: true
        },
        'displayText':{
            value: 'Enter the first line of your address',
            enumerable: true
        }
    }),

    // Create another new object based upon the base object, using different property values in
    // order to allow the creation of a <input type="email"> element when the object's
    // getElement() method is called
    emailField = Object.create(field, {
        'type': {
            value: "email",
            enumerable: true
        },
        'displayText':{
            value: 'Enter your email address',
            enumerable: true
        }
    });

// Call the getElement() method of both objects, appending the created <input> DOM elements to
// the current page once loaded
window.addEventListener("load", function() {
    var bodyElement = document.body;

    bodyElement.appendChild(textField.getElement());
    bodyElement.appendChild(emailField.getElement());
}, false);