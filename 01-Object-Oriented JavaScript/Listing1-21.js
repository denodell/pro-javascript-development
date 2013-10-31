function myFunction() {
    var myArray = ['January', 'February', 'March', 'April', 'May'],
        myArrayLength = myArray.length,
        counter = 0;

    for (var index = 0; index < myArrayLength; index++) {
        // Increment counter each time around the loop
        counter = index + 1;
    }

    // The values of the variables should be as expected
    alert(counter); // 5
    alert(index); // 5 (since the loop increments before testing its condition)
    alert(myArrayLength); // 5

    if (myArrayLength > 0) {

        // In many languages, defining variables in a code block like this keeps their scope
        // locked to that code block. Not so in JavaScript, so beware defining variables locally
        // to code blocks in this way
        var counter,
            index = 0,
            myArrayLength;

        counter = 0;
    }

    // The values of ‘counter’ and ‘index’ were altered within the ‘if’ statement, regardless of
    // the use of the ‘var’ statement in that code block
    alert(counter); // 0
    alert(index); // 0

    // Note that the value of ‘myArrayLength’ has not changed, despite it being redefined within
    // the code block with the ‘var’ statement. This is because variable names are ‘hoisted’ to
    // the top of functions by JavaScript before the function executes
    alert(myArrayLength); // 5
}

// Execute the defined function
myFunction();