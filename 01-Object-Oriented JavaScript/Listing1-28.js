var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

    // The every method loops through each item in an array, comparing it to a
    // condition. If the condition returns true for every item in the array, the
    // every method returns true, otherwise it returns false
    everyItemContainsR = months.every(function(value, index, fullArray) {

        // returns a true or false value indicating whether the current
        // iteration matches your condition, in this case whether the value contains
        // the letter ‘r’
        return value.indexOf("r") >= 0;
    }),

    // The some method loops through each item in an array, comparing it to a
    // condition. If the condition returns true for any item in the array, the
    // some method returns true, otherwise it returns false
    someItemContainsR = months.some(function(value, index, fullArray) {
        return value.indexOf("r") >= 0;
    });

// Not every item contains the letter ‘r’...
alert(everyItemContainsR); // false

// ...but some do!
alert(someItemContainsR); // true