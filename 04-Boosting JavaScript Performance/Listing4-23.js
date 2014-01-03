// Initialize a value to use as a counter
var count = 0;

// Define a function to be executed on each matched substring, where the supplied parameter
// is the matched substring itself
function replaceWithCount(value) {

    // Increment the counter
    count = count + 1;

    // Return to the replaced string the passed in value, with the current value of the
    // counter appended to it
    return value + count;
}

// Example usage
alert("Hello World".replace(/o/g, replaceWithCount)); // Hello1 Wo2rld
alert("Hello World".replace(/\s/g, replaceWithCount)); // Hello 3World