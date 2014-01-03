function getFactorial(num) {
    var result = 1,
        index = 1;

    for (; index <= num; index++) {
        result *= index;
    }
    return result;
}

// Add the generic memoize capability to the function
var getFactorialMemoized = memoize(getFactorial);

// Example usage
alert(getFactorialMemoized(50)); // Executes the whole function
alert(getFactorialMemoized(50)); // Returns a stored value. Avoids full function execution,
                                 // boosts performance