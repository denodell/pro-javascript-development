// Reference the Express framework through the "express" npm package dependency. Ensure
// you have a package.json file referencing this dependency
var express = require("express"),

    // Initialize the framework, making its methods available through the app variable
    app = express(),

    // Define a dependency on the Node.js "http" module - required for use with the
    // Socket.IO framework
    http = require("http"),

    // Create a simple web server, ensuring the Express framework handles all the requests by
    // passing the app variable to the http.createServer() method
    server = http.createServer(app),

    // Reference the Socket.IO framework through its "socket.io" npm package dependency.
    // Ensure this dependency is listed in your package.json file
    socketIo = require("socket.io"),

    // Connect the Socket.IO framework up to the web server to piggy back on its connection
    io = socketIo.listen(server),

    // Define a port number to listen for requests on
    PORT = 4000;

// Make the contents of the current directory available through our web server so we can
// serve up a HTML file
app.use("/", express.static(__dirname));

// Wait for the Socket.IO connection to the browser to initiate before executing the callback,
// passing in a reference to the socket connection
io.sockets.on("connection", function(socket) {

    // Send a message using the emit() method of the socket connection, passing some data to
    // any connected browser listening for the "new-data-on-server" event sent from the socket
    socket.emit("new-data-on-server", "Ready and waiting for messages");

    // When a message named "new-data-on-client" is received from the client, execute the
    // callback function, passing in the data passed along with the message
    socket.on("new-data-on-client", function(data) {

        // Immediate broadcast back out the received message wrapped in a simple JavaScript
        // object with a property named "received"
        socket.emit("new-data-on-server", {
            received: data
        });
    });
});

// Start listening for web requests on the given port number
server.listen(PORT);

// Output a message to the command line to instruct the user that the web server is running
console.log("Now try browsing http://127.0.0.1:" + PORT);