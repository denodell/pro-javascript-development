// Define a global variable
var myGlobalVariable;

// Create a self-executing, anonymous (unnamed) function to wrap around your code
(function() {
    // Your code, that before was global, goes here with a new, non-global scope,
    // making it easier to generate smaller compressed files via minification,
    // obfuscation, or compilation

    // Define a local variable
    var myLocalVariable = "Local";

    // Set the global variable to a string
    myGlobalVariable = "Global";

// The open-close bracket combination here executes the function straight away
}());