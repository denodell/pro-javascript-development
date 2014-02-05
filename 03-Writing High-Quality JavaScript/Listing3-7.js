var PI = 3.141592653589793238462643383279502884197,
    decimalPlaces = Math.floor((Math.random() * 40) + 1), // random number between 1 and 40
    shortPi;

// Wrap any code you suspect might cause an error in a try-catch statement
try {
    shortPi = PI.toFixed(decimalPlaces); // Throws a range error if decimalPlaces > 20
} catch (error) {

    // This block is executed only if an error occurs within the try block, above
    alert("An error occurred!");
}