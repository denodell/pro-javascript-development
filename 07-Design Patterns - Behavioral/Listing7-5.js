// Define an object and an array which we can use to iterate over
var user = {
        name: "Den Odell",
        occupation: "Head of Web Development",
        company: "AKQA"
    },
    daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

    // Create instances of the Iterator "class" using these two different types of data
    userIterator = new Iterator(user),
    daysOfWeekIterator = new Iterator(daysOfWeek),

    // Create three arrays for storing outputs of interations to be displayed later
    output1 = [],
    output2 = [],
    output3 = [];

// The userIterator is ready for use, so let's use a for loop to iterate over the stored data –
// note how we don't need to supply the first argument to the for loop as the data is already
// reset and initialized in its start position, and we don't require the last argument since the
// next() method call within the for loop body performs the advancement of the index position
// for us
for (; userIterator.hasNext();) {
    output1.push(userIterator.next());
}

// Since we iterated over an object, the resulting data consists of the values stored in each of
// the object's properties
alert(output1.join(", ")); // Den Odell, Head of Web Development, AKQA

// Before iterating over the same data again, its index must be rewound to the start
userIterator.rewind();

// Iterate over the object properties using a while loop, which continues to execute until the
// iterator has no further data items
while (userIterator.hasNext()) {
    output2.push(userIterator.next());
}

alert(output2.join(", ")); // Den Odell, Head of Web Development, AKQA

// Iterate over the array data using the Iterator's built-in each() method - using this
// approach requires no manual work to manipulate the position of the index, simply pass a
// callback function
daysOfWeekIterator.each(function(item) {
    output3.push(item);
});

alert(output3.join(", ")); // Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday