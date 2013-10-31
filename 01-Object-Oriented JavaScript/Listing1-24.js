// Define a function
function myFunction() {

    // Using a previously undefined variable will implicitly create it as a global variable
    counter = 1;

    // Executing strings of JavaScript code using eval() throws no errors
    eval("alert(counter)");

    // The delete keyword is for removing properties and methods from an object, but
    // calling it on a variable throws no error
    delete counter;
}

// Execute the function
myFunction();

// Redefine the same function using ECMAScript 5 strict mode
function myFunction() {

    // Enforce strict mode for the code within this function
    "use strict";

    counter = 1; // Throws an error when executed, since the ‘counter’ variable was not defined

    eval("alert(counter)"); // Throws an error as ‘eval’ is to be avoided for security reasons

    delete counter; // Throws an error since the ‘delete’ keyword is only to be used for
                    // removing named properties and methods from object literals
}

// Execute the function
myFunction();