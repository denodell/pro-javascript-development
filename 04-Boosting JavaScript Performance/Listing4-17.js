// getFactorial calculates the factorial of a number, i.e. the multiplication of each number
// from 1 up to the supplied number. The factorial of 3, for example, is (1 * 2 * 3) = 6
function getFactorial(num) {
    var result = 1,
        index = 1;

    for (; index <= num; index++) {
        result *= index;
    }
    return result;
}

// Example usage
alert(getFactorial(3)); // = (1 * 2 * 3) =  6
alert(getFactorial(4)); // = (1 * 2 * 3 * 4) = 24
alert(getFactorial(5)); // = (1 * 2 * 3 * 4 * 5) = 120