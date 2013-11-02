var daysOfTheWeek = ["Monday", "Tuesday", "Wednesday"],

    // The map method allows a whole new array to be created by looping through an existing one,
    // executing a function for each item to determine the equivalent item in the new array
    daysFirstLetters = daysOfTheWeek.map(function(value, index, fullArray) {
        return value + " starts with " + value.charAt(0);
    });

alert(daysFirstLetters.join(", ")); // "Monday starts with M, Tuesday starts with T,
                                    // Wednesday starts with W"