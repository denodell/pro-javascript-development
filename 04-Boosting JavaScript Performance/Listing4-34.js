// Define variables to calculate the time taken to execute the function
var startTime,
    endTime,
    duration;

// Function to execute which we wish to measure
function doSomething() {
    var index = 0,
        length = 10000000,
        counter = 0;

    for (; index < length; index++) {
        counter += index;
    }
}

// Set the initial time to be the current date/time at this exact point, just before execution
// of the function
startTime = new Date();

// Execute the function
doSomething();

// Set the end time to be the current date/time just after execution
endTime = new Date();

// The time taken is the end time minus the first time, with both represented in milliseconds,
// the most precise measurement we have with JavaScript times
duration = endTime.getTime() - startTime.getTime();

alert(duration); // Took ~700 ms on my machine