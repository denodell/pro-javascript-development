var canvas = document.createElement("canvas"),
    context = canvas.getContext("2d"),

    // Define the position, size and properties of the circle to be drawn onto the canvas
    leftPosition = 0,
    topPosition = 100,
    radius = 100,
    startDegree = 0,
    endDegree = 2 * Math.PI; // = 360 degrees in radians

// Define a function to be executed periodically to update the position of the circle and redraw
// it in its new position
function animate() {

    // Update the position on the screen where the circle should be drawn
    leftPosition++;

    // Empty the contents of the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the circle onto the canvas at the new position
    context.beginPath();
    context.arc(leftPosition, topPosition, radius, startDegree, endDegree);
    context.stroke();
}

// Execute the animate() function once every 50 milliseconds, redrawing the circle in its
// updated position each time
setInterval(animate, 50);

// Add the <canvas> element to the current page once loaded
window.addEventListener("load", function() {
    document.body.appendChild(canvas);
}, false);