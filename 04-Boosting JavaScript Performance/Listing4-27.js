var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    index = 0,
    length = daysOfWeek.length,
    daysObj = {},
    dayOfWeek;

// Loop through each day of the week
for (; index < length; index++) {
    dayOfWeek = daysOfWeek[index];

    // Add a property to the daysObj object literal for each day of the week, adding
    // a function that reverses the name of the day of the week to each
    daysObj[dayOfWeek] = {
        name: dayOfWeek,
        getReverseName: function() {
            return this.name.split("").reverse().join("");
        }
    };
}