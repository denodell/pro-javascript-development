// This script has a dependency on the "/socket.io/socket.io.js" script provided by the
// Socket.IO framework when it is referenced from the web server, which surfaces the global
// variable "io"

// Establish the web socket connection to the server to enable sending and receiving of
// messages
var socket = io(),

    // Get references to the form element and text form field element from the page
    formElem = document.getElementById("send-message-form"),
    messageFormFieldElem = document.getElementById("message-field"),

    // Get references to the empty <div> tags on the page which we will populate with messages
    // sent to and received from the server
    messagesSentElem = document.getElementById("messages-sent"),
    messagesReceivedElem = document.getElementById("messages-received");

// Listen for the "new-data-on-server" event sent from the server over the web socket
// connection. The callback method will be executed immediately on reception of the message,
// passing along the message data sent with the event. We can then append this message to the
// current page within the <div id="messages-received"> element
socket.on("new-data-on-server", function(data) {

    // Create a new paragraph element
    var paragraphElem = document.createElement("p");

    // Populate the new <p> tag with the current time and the message received - use
    // JSON.stringify() to convert the message from its current type to a string for display
    paragraphElem.innerHTML = new Date().toUTCString() + " - " + JSON.stringify(data);

    // Add the message to the <div id="messages-received"> element on the page
    messagesReceivedElem.appendChild(paragraphElem);
});

// Connect a form handler to the "submit" event of the <form> element to send the message
// written in the form field to the server
formElem.addEventListener("submit", function(e) {

    // Define a variable for storing the message to send to the server when the form is
    // submitted, populating it with the value stored in the form field
    var message = {
            sent: messageFormFieldElem.value
        },

        // Create a new paragraph element
        paragraphElem = document.createElement("p");


    // Prevent the default submit behavior of the <form> element from occurring, to avoid
    // the page refreshing - we'll send the message data to the server manually
    e.preventDefault();

    // Emit a web socket broadcast event to send the message to the server using the event
    // name "new-data-on-client". The server can then react to this message type as it wishes
    socket.emit("new-data-on-client", message);

    // Populate the new <p> tag with the current time and a copy of the sent message - using
    // JSON.stringify() to convert the message from its current object type to a string for
    // display
    paragraphElem.innerHTML = new Date().toUTCString() + " - " + JSON.stringify(message);

    // Add the message to the <div id="messages-sent"> element on the page
    messagesSentElem.appendChild(paragraphElem);

    // Clear the form field text to allow a new message to be sent
    messageFormFieldElem.value = "";
}, false);