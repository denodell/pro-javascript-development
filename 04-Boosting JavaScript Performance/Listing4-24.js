var myArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// The most common type of loop
for (var index = 0; index < myArray.length; index++) {
    // On every iteration through the loop, the value of myArray.length must
    // be recomputed to ensure it has not changed since the last iteration
    // - this is slow
}

// A similar but much faster version of the same loop
for (var index = 0, length = myArray.length; index < length; index++) {
    // The value of myArray.length is computed once and stored in a variable.
    // the value is read back from the variable on each iteration instead of being
    // recomputed - much faster!
}