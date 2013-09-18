var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    len = daysOfWeek.length,

    // The start index of the loop is the end item of the array
    index = len,
    daysOfWeekInReverse = [];

// Decrement the index each time through the loop, just after it’s been compared in the while
// loop parameter. When the index is 0, the while loop will stop executing.
while(index--) {
    daysOfWeekInReverse.push(daysOfWeek[index]);
}

// Because of the decrement in the while loop, at the end of the code, the value of index will
// be -1
alert(index); // -1