// Define a variable to store our stack of Ajax calls in if they can't be made immediately
// because of a dropped network connection
var stack = [];

// Define the function that makes Ajax calls
function ajax(url, callback) {

    // The XMLHttpRequest class enables Ajax requests to be made in the browser
    var xhr = new XMLHttpRequest(),
        LOADED_STATE = 4,
        OK_STATUS = 200;

    // If the browser has gone offline, add the function arguments (the url and callback) to the
    // stack for sending later
    if (!navigator.onLine) {
        stack.push(arguments);
    } else {

        // If the browser is online, make the Ajaz call
        xhr.onreadystatechange = function() {

            // A readyState of 4 indicates that the server response is complete
            if (xhr.readyState !== LOADED_STATE) {
                return;
            }

            // Execute the callback function if the server responded with a HTTP 200
            // status message ("OK")
            if (xhr.status === OK_STATUS) {
                callback(xhr.responseText);
            }
        };

        // Trigger the Ajax HTTP GET operation
        xhr.open("GET", url);
        xhr.send();
    }
}

// Define a function that loops through the stack of unsent Ajax calls, sending each in turn
function clearStack() {

    // Loop through the items in the stack until the stack length is 0 (a falsy value)
    while (stack.length) {

        // Make the Ajax call, using the data from the stack. The shift() method pulls the first
        // item off the array and returns it, altering the original array
        ajax.apply(ajax, stack.shift());
    }
}

// Ensure the clearStack function executes as soon as the network connection is restored
window.addEventListener("online", clearStack, false);