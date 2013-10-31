var months = ["January", "February", "March", "April", "May"],

    // The filter method creates a cut-down array from an original array, only permitting those
    // items that match a certain condition into the new array
    monthsContainingR = months.filter(function(value, index, fullArray) {

        // return a true or false value indicating whether the current array item should be
        // included in your filtered array, i.e. whether its value contains the letter ‘r’
        return value.indexOf("r") >= 0;
    });

// The only month that didn’t contain the letter ‘r’ was ‘May’
alert(monthsContainingR.join(", ")); // "January, February, March, April"