function getFactorial(num) {
    var result = 1,
        index = 1;

    if (!getFactorial.storage) {
        getFactorial.storage = {};
    } else if (getFactorial.storage[num]) {
        return getFactorial.storage[num];
    }

    for (; index <= num; index++) {
        result *= index;
    }

    getFactorial.storage[num] = result;

    return result;
}

// Example usage
alert(getFactorial(50)); // Executes the whole function
alert(getFactorial(50)); // Returns a stored value. Avoids full function execution, boosts performance