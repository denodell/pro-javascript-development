// Create a function to add together any parameters ('arguments') passed to it
var add = function() {

    // Create a variable to store the total of the addition in
    var total = 0;

    // The 'arguments' pseudo-array contains the arguments passed into this function.
    // Loop through each and add them together to form a total
    for (var index = 0, length = arguments.length; index < length; index++) {
        total  = total + arguments[index];
    }

    return total;
};

// Try the function out with different numbers of parameters
alert(add(1, 1)); // 2
alert(add(1, 2, 3)); // 6
alert(add(17, 19, 12, 25, 182, 42, 2)); // 299