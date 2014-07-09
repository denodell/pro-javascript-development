// Define a dependency on the Node.js "http" module which contains methods to allow the
// creation of a simple HTTP web server
var http = require("http"),

    // Define a variable to represent our HTTP server
    server,

    // Define a constant to represent the HTTP status code for an OK response
    HTTP_OK = 200,

    // Define a port number to listen for requests on
    PORT = 8000;

// Call the http.createServer() method to spin up a web server, defining the response to send
// to the calling HTTP application (usually a web browser) based on the request received. Here
// we ignore the request received (which would contain the URL requested and any data sent
// with the request, for example cookie or POST data) and simply respond with a single chunk
// of HTML to read "Hello, World" for any request received (try different URLs to prove this).
// The callback function passed to the method will be executed once for each request received
// at the time it is received, asynchronously.
server = http.createServer(function(request, response) {

    // Send a HTTP header to the requesting browser to indicate a successful HTTP response
    // and defining the response body data will be sent as HTML text
    response.writeHead(HTTP_OK, {
        "Content-Type": "text/html"
    });

    // Send the HTML response
    response.write("<h1>Hello, World</h1>\n");

    // Close the connection - without this, the HTTP server will expect to continue to send
    // more data to the browser, the connection to the server would be kept open unnecessarily,
    // wasting server resources and potentially preventing others from connecting to that same
    // server, depending on demand. The end() method tells the connection that we're done
    // sending our response data. If we knew we were only going to send one string of data and
    // then close the connection, we could actually pass that string to the response.end()
    // method, which would call the write() method for us internally in that case
    response.end();
});

// The final step is to tell our new web server to start listening for requests on a specific
// socket port number. The host name by default will be http://localhost or http://127.0.0.1
// since we are running the application locally on our development machine. The listen() method
// is different to many others in that it keeps the Node.js application running - if it didn't
// we would no longer be able to listen for requests. You can manually stop the application on
// the command line by typing Ctrl+X (Microsoft Windows) or Command-X (Mac OS X) which will
// stop the web server from listening on this port
server.listen(PORT);

// Output a message to the command line to instruct the user that the web server is running
// and what address they need to browse in order to view the defined response
console.log("Now try browsing http://127.0.0.1:" + PORT);