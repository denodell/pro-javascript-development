// Define a variable to use as a counter further down in this code
var millisecondCount = 0;

// Define a method to get the data returned by a GET request to a given URL. Returns a promise
// to which callback functions can be hooked into using its then() method.
function ajaxGet(url) {

    // Return a new promise, initializing it with the asynchronous function to perform the Ajax
    // request. When the promise executes the function, it will pass in two function parameters,
    // the first should be called by our code if and when the asynchronous request succeeds, and
    // the second should be called if and when an error occurs in the execution of the
    // asynchronous request.
    return new Promise(function(fulfill, reject) {
        var xhr = new XMLHttpRequest(),
            STATE_LOADED = 4,
            STATUS_OK = 200;

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== STATE_LOADED) {
                return;
            }

            // If the Ajax GET request returns data successfully, execute the fulfill method
            if (xhr.status === STATUS_OK) {
                fulfill(xhr.responseText);

            // If the Ajax request does not return data successfully, execute the reject method
            } else {
                reject("For the URL '" + url + "', the server responded with: " + xhr.status);
            }
        };

        // Perform the Ajax GET request
        xhr.open("GET", url);
        xhr.send();
    });
}

// Define a method which waits a given number of milliseconds before continuing. Returns
// a promise.
function wait(milliseconds) {
    return new Promise(function(fulfill, reject) {

        // If the value provided for milliseconds is a number greater than 0, call the
        // setTimeout method to wait that number of milliseconds before executing the fulfill
        // method
        if (milliseconds && typeof milliseconds === "number" && milliseconds > 0) {
            setTimeout(function() {
                fulfill(milliseconds);
            }, milliseconds);

        // If the value provided for milliseconds is not a number or is less than or equal to
        // 0, then reject the promise immediately
        } else {
            reject("Not an acceptable value provided for milliseconds: " + milliseconds);
        }
    });
}

// Define two functions for use if a particular promise is fulfilled or rejected, respectively
function onSuccess(milliseconds) {
    alert(milliseconds + "ms passed");
}

function onError(error) {
    alert(error);
}

// EXAMPLE 1: Success
// Execute the wait() function with a value we know will cause it to succeed, and show that
// the first of the two supplied functions to the then() method is executed
wait(500).then(onSuccess, onError); // After 0.5 seconds, outputs: "500ms passed"

// EXAMPLE 2: Error
// Execute the wait() function with a value we know will cause it to error. Because this
// rejects immediately, this will alert the user before the result of example 1 is known
wait(0).then(onSuccess, onError); // "Not an acceptable value provided for milliseconds: 0"

// EXAMPLE 3: Chaining
// Multiple promises can be chained together using the then() method which allows operations to
// be executed in order once the result of the execution of the previous asynchronous function
// is known. This considerably simplifies the nesting of callbacks which would be necessary
// without the use of promises.
wait(1000)
    .then(function(milliseconds) {

        // After a delay of 1 second, increment the counter by the number of milliseconds
        // passed into the function parameter (in this case, 1000)
        millisecondCount += milliseconds;

        // Returning a promise in this function means that the operation indicated by that
        // promise will be executed once the previous operation is complete
        return wait(1600);
    })
    .then(function(milliseconds) {

        // By this point, 2600 milliseconds have passed, and this is stored in our counter
        // variable
        millisecondCount += milliseconds;

        // Return another promise, indicating that a delay of 400 milliseconds should now
        // take place before the function specified in the following then() statement is
        // executed
        return wait(400);
    })
    .then(function(milliseconds) {

        // Increment the counter by the 400 milliseconds just passed, making its total 3000
        millisecondCount += milliseconds;

        // Finally, output the combined value of the counter, which indicates the number of
        // milliseconds passed since the first operation in this chain began
        alert(millisecondCount + "ms passed"); // After 3 seconds, outputs: "3000ms passed"
    });

// EXAMPLE 4: Multiple Promises
// Different promises can be chained together, since as in this example, which gets a page by
// the URL /page1.html (assuming it exists on the server), then waits 3 seconds before getting
// another page by the URL /page2.html (again, assuming it exists).
ajaxGet("/page1.html")
    .then(function() {
        return wait(3000);
    })
    .then(function() {
        return ajaxGet("/page2.html");
    })
    .then(function() {
        // This alert will fire only if both /page1.html and /page2.html exist and can
        // be accessed
        alert("/page1.html and /page2.html received, with a 3s gap between requests");
    });

// EXAMPLE 5: Simultaneous Promises
// The Promise.all() method accepts an array of promises which will be resolved simultaneously,
// passing the results as an array to the success function passed to its then() method. Get
// both /page1.html and /page2.html simultaneously, and when they are both complete, execute
// the success callback function with the contents of both files in the array parameter passed
// into this function, in the same order as in the array of promises. If any of the supplied
// promises fails, the error callback function will be executed, with the detail of the first
// error that occurred passed into this function parameter.
Promise.all([ajaxGet("/page1.html"), ajaxGet("/page2.html")])
    .then(function(files) {
        alert("/page1.html = " + files[0].length + " bytes. /page2.html = " + files[1].length + " bytes.");
    }, function(error) {
        alert(error);
    });