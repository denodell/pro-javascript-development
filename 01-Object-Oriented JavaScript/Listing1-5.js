// Variable declared outside of any function is in global scope and available to access anywhere
var myLibrary = {
    myName: "Dennis"
};

function doSomething() {
    // Variable declared within a function is not accessible outside that function
    var innerVariable = 123;

    // The global variable is accessible from within the function
    myLibrary.myName = "Hello";

    function doSomethingElse() {
        // Variables declared in a surrounding scope are accessible
        innerVariable = 1234;
    }

    doSomethingElse();

    alert(innerVariable); // 1234
}

doSomething();

// This property was overridden within the doSomething function
alert(myLibrary.myName); // "Hello"

// Trying to access a variable declared within a function from outside results in an error
alert(innerVariable); // ERROR!