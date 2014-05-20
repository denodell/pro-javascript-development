// memoize() expects a function as an input and returns the same function
// with storage capabilities added

function memoize(fn) {
    return function() {
        var propertyName;

        // Add a memory object property to this function, if it does not exist
        fn.storage = fn.storage || {};

        // Create a property name to use to store and retrieve function results within
        // the ‘storage’ object literal. This should be based on a combination of
        // all the arguments passed to the function to ensure it is unique based
        // on all possible combinations of inputs.
        // We borrow the ‘join’ method from the Array type as ‘arguments’ isn’t a
        // proper array type and doesn’t contain this method.
        propertyName = Array.prototype.join.call(arguments, "|");

        // Does the key exist in the memory object?
        if (propertyName in fn.storage) {

            // If it does, then return the associated value to avoid re-execution of
            // the full function
            return fn.storage[propertyName];
        } else {
            // If it doesn't, execute the associated function then save the result
            // to the memory object
            fn.storage[propertyName] = fn.apply(this, arguments);

            // Return the newly saved value, the result of the function's execution
            return fn.storage[propertyName];
        }
    };
}