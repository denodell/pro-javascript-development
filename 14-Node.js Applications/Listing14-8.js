// Reference the Express framework through the "express" npm package dependency. Ensure
// you have a package.json file referencing this dependency
var express = require("express"),

    // Reference the "connect" package which provides a set of middleware for use with other
    // web server Node.js packages, including Express
    connect = require("connect"),

    // Initialize the framework, making its methods available through the app variable
    app = express(),

    // Define the port number we will host our web server on
    PORT = 3000;

// The Express use() method allows a piece of middleware to be connected up to the current
// server. Here we connect up the HTTP POST body data parser from the "connect" package
app.use(connect.bodyParser());

// The express.static() middleware allows the contents of a particular directory on the file
// system to be made available beneath a particular path name. Here we define a "/assets" path
// on our web server which maps to the contents of a "/dist/assets" folder found within the
// current directory this application file finds itself in (the __dirname is a Node.js global
// variable available to any file. A request to any file within the "/dist/assets" folder can
// now be requested, e.g. "/assets/css/styles.css" would return the contents of the file found
// at location "/dist/assets/css/styles.css" within the current folder. This is perfect for
// serving static files, such as JavaScript CSS, images, and flat HTML required as part of a
// web site or application
app.use('/assets', express.static(__dirname + "/dist/assets"));

// The get() method allows us to respond to a HTTP GET request at a specific URL, in this
// case we specify the server root, "/", which will give us our homepage. The callback will
// be executed when the given URL is requested using the GET method, passing in the details
// of the request in the "request" object, including referer, user agent, and other useful
// information. The "response" object contains properties that can be set, and methods that
// can be called to alter the output data and headers sent to the requesting browser
app.get("/", function(request, response) {

    // The send() method of the response object allows us the send data to the requesting
    // browser. This method is smart enough to detect the data type being sent and to adjust
    // the HTTP response headers accordingly. Here we pass in a string, which is interpreted
    // as being in HTML format, but if we'd passed in a JavaScript object, this would be
    // sent as a JSON string to the browser, with the appropriate headers sent. This method
    // also sets the Content-Length HTTP header according to the length of the data sent,
    // which informs the browser that there is no more data to be sent back to the browser
    // besides that passed to the method
    response.send("<h1>Hello, World</h1>");
});

// Send a HTML form as a response to a GET request to the URL "/email"
app.get("/email", function(request, response) {

    // Send a HTML form whose action points to the URL "/email" and whose HTTP method is POST.
    // When the form is submitted, rather than hitting this callback, the callback below will
    // be called, which is associated specifically with the POST HTTP method. The form here has
    // one named field, "email", which will be set as the POST data when the form is submitted.
    response.send("<form method=\"post\" action=\"/email\">\
        <label for=\"email\">Email address</label>\
        <input type=\"email\" id=\"email\" name=\"email\" value=\"\">\
        <input type=\"submit\">\
    </form>");
});

// Respond to a HTTP POST of data to the URL "/email", writing out the
app.post("/email", function(request, response) {

    // When the "connect" package is used, and the current Express app is associated with the
    // bodyParser() middleware method from this package, the request.body property is an object
    // containing properties that directly correspond to the names of POSTed data values. Since
    // we posted a form field with the name "email", the request.body.email property contains
    // the value entered into the form field by that name
    var email = request.body.email || "";

    // Show the POSTed email address value within a HTML <h1> tag on the page
    response.send("<h1>Posted email: " + email + "</h1>");
});

// Just like the listen() method with the "http" package we saw in Listing 14-3, this starts
// the process of accepting requests to the web server from a browser on the given port. This
// keeps the Node.js application running continuously. If the application is stopped, the
// server will no longer be running and won't be able to accept any browser requests
app.listen(PORT);

// Output a message to the command line to instruct the user that the web server is running
console.log("Now try browsing http://127.0.0.1:" + PORT);