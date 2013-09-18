var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    index = 0,
    length = daysOfWeek.length,
    daysObj = {},
    dayOfWeek;

// Define a single function to be used within any iteration of the loop
function getReverseName() {

    // When called, the ‘this’ keyword will refer to the context in which it was called,
    // namely the property in the daysObj object literal which it was called on
    return this.name.split("").reverse().join("");
}

for (; index < length; index++) {
    dayOfWeek = daysOfWeek[index];
    daysObj[dayOfWeek] = {
        name: dayOfWeek,

        // Simply refer to the existing function here, rather than creating a new function
        getReverseName: getReverseName
    };
}