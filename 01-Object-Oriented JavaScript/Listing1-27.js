var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// The forEach method allows you to loop through each item in an array, executing a function
// each time
months.forEach(function(value, index, fullArray) {
    alert(value + " is month number " + (index + 1) + " of " + fullArray.length);
});