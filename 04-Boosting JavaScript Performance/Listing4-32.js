// Create a <canvas> element dynamically in JavaScript and get a reference to its
// 2d drawing context
var canvas = document.createElement("canvas"),
    context = canvas.getContext("2d"),

    // Get a reference to the image on the page
    img = document.getElementById("image");

// Define a function to process the image data
function processImage() {

    // Store the image width and height to avoid looking them up each time
    var imgWidth = img.width,
        imgHeight = img.height,

        // Define a new web worker, using the code from the ‘Listing4-33.js’ file
        workerThread = new Worker("Listing4-33.js");

    // Set the new <canvas> element’s dimensions to match that of the image
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    // Copy the image to the canvas, starting in the top-left corner
    context.drawImage(img, 0, 0, imgWidth, imgHeight);

    // Define the code to execute once a message is received from the web worker, which
    // will be fired once the image data has been processed
    workerThread.addEventListener("message", function(e) {

        // Get the image data sent in the message from the event’s data property
        var imageData = e.data;

        // Push the new image pixel data to the canvas, starting in the top-left corner
        context.putImageData(imageData, 0, 0);

        // Now add the resulting <canvas> element to the page. By performing all the necessary
        // canvas actions before it’s added to the page, we avoid the need for the browser to
        // repaint the canvas element as we added and then replaced the image displayed on it
        document.body.appendChild(canvas);
    }, false);

    // Kick off the web worker, sending it the raw image data displayed on the canvas
    workerThread.postMessage(context.getImageData(0,0, imgWidth, imgHeight));
}

// Execute the processImage function once the image has finished loading
img.addEventListener("load", processImage, false);