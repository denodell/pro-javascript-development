function getFactorial(num) {
    var result = 1,
        index = 1;

    for (; index <= num; index++) {
        result *= index;
    }
    return result;
}

// Add the generic memoize capability to the function
getFactorial = memoize(getFactorial);

// Example usage
getFactorial(50); // Executes the whole function
getFactorial(50); // Returns a stored value. Avoids full function execution, boosts performance