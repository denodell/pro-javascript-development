// Reference a dependency on the "request" package, a simple HTTP request client
var request = require("request"),

    // Reference a dependency on the "picture-tube" package, allowing 256 color images to be
    // rendered out to the command line
    pictureTube = require("picture-tube"),

    // Reference an online image URL (PNG format only) to render to the command line
    imageUrl = "http://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_(2011).png";

// Make a request to download the image URL, then use the Node.js Stream API to "pipe" the
// data through the "picture-tube" package to create command line codes representing the image.
// Finally pipe the output of that process out to the command line, represented by the
// process.stdout stream
request(imageUrl).pipe(pictureTube()).pipe(process.stdout);