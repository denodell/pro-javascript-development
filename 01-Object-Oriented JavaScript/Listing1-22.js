function myFunction() {

    // All variables defined up front in the function to avoid being tripped up by hoisting
    var myArray = ['January', 'February', 'March', 'April', 'May'],
        myArrayLength = myArray.length,
        counter = 0,
        index = 0;

    // The first statement within the for loop definition, which would normally be used to
    // initialize a variable can be skipped now we’ve moved all variable declarations to
    // the top of the function
    for (; index < myArrayLength; index++) {
        counter = index +1;
    }

    // The values of the variables should be as expected
    alert(counter); // 5
    alert(index); // 5
    alert(myArrayLength); // 5
}

// Execute the function
myFunction();