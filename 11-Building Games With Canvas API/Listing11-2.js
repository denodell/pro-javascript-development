// Create a new <canvas> element to draw the image to
var canvas = document.createElement("canvas"),

    // Get the drawing context of the <canvas> element
    context = canvas.getContext("2d"),

    // Create a new <img> element to reference the image to draw onto the <canvas>
    img = document.createElement("img");

// Assign a function to execute once the assigned image has loaded – the image will not begin to
// load until its "src" attribute has been set
img.addEventListener("load", function() {

    // Draw the image onto the <canvas> element at position 0px x 0px – the top-left corner of
    // the element
    context.drawImage(img, 0, 0);
}, false);

// Assign the "src" attribute of the <img> element to point to the location of the image we wish
// to display within the <canvas> element. The image will then load and the event handler
// assigned previously will be executed
img.src = "filename.png";

// Append the new <canvas> element to the end of the current HTML page once loaded
window.addEventListener("load", function() {
    document.body.appendChild(canvas);
}, false);