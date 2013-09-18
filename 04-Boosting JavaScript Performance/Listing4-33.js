// Call the invertImage method when this worker receives a message from the calling script.
// The ‘self’ object contains the only methods a web worker can access apart from those it
// defines and creates itself
self.addEventListener("message", invertImage, false);

// Define a function to take an image and invert it, pixel by pixel, using its raw data
function invertImage(e) {

    // The ‘data’ property of the ‘message’ event contains the pixel data passed from
    // the calling script
    var message = e.data,

        // The ‘data’ property of the message passed contains the raw image pixel data
        imagePixels = message.data,
        x = 0,
        len = imagePixels.length;

    // Loop through each pixel, inverting its value within the original pixel data array.
    // Pixel data is arranged in groups of 4 values, representing the red, green, blue, and
    // opacity values of each visible screen pixel. We therefore loop through in jumps of 4
    // on each iteration
    for (; x < len; x += 4) {

        // To invert a pixel’s value, subtract it from the maximum possible value, which is 255
        imagePixels[x] = 255 - imagePixels[x];
        imagePixels[x + 1] = 255 - imagePixels[x + 1];
        imagePixels[x + 2] = 255 - imagePixels[x + 2];
    }

    // Finally, post a message containing the updated pixel data back to the calling script
    self.postMessage(message);
}