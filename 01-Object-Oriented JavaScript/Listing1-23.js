function myFunction() {

    // Executing a function before its definition is possible due to ‘hoisting’ in JavaScript
    doSomething(); // The function below is executed

    function doSomething() {
        alert("Doing something");
    }
}

myFunction();