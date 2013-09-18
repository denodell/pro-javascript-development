var myArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
for (var index = 0, length = myArray.length; index < length; index++) {
    if (myArray[index] < 50) {
        // Ignore any values in the array below 50
        // continue executes the next iteration immediately, ignoring any other code
        // within the loop
        continue;
    }

    if (myArray[index] === 90) {
        // Ignore any values in the array above 90
        // break stops the loop from iterating immediately, ignoring any other code
        // no other iterations will be performed in the loop
        break;
    }
}