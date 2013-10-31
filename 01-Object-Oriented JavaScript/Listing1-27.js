var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

months.forEach(function(value, index, fullArray) {
    alert(value + " is month number " + (index + 1) + " of " + fullArray.length);
});