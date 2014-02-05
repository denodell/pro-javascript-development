var PI = 3.141592653589793238462643383279502884197,
    decimalPlaces = Math.floor((Math.random() * 40) + 1),
    shortPi;

try {
    shortPi = PI.toFixed(decimalPlaces);
} catch (error) {
    decimalPlaces = 20;
    shortPi = PI.toFixed(decimalPlaces);
} finally {
    alert("The value of PI to " + decimalPlaces + " decimal places is " + newPi);
}