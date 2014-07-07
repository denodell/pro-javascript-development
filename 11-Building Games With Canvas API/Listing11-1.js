// Create a new <canvas> element
var canvas = document.createElement("canvas"),

    // Get a reference to the drawing context of the canvas
    context = canvas.getContext("2d");

// Set the dimensions of the canvas
canvas.width = 200;
canvas.height = 200;

// By default, a canvas is drawn empty, however if we needed to empty its contents after
// drawing to it, we could execute this function
function emptyCanvas() {

    // Erase the contents of the canvas from the top-left of the canvas to the position at
    // 200px x 200px from the top-left corner
    context.clearRect(0, 0, 200, 200);
}

// With the drawing context established, we can now execute any of the drawing commands we
// would like on our blank canvas. For example, if we want to draw a circle in the top-left
// corner of our canvas, we could execute the following function
function drawCircle() {

    // First, we tell the drawing context that we’re creating a path – essentially a line
    // between one point and another that could take any course between the two points

    context.beginPath();

    // The context’s arc() method tells the path to take an arc shape. The method’s first
    // two parameters indicate its starting position of the arc in pixels along the x- and
    // y-axes, respecitvely. The third parameter indicates the size of the arc, in pixels,
    // and the final two parameters indicate the arc’s start and end angle, in radians,
    // respsecitvely. To draw a circle, the start angle will always be 0, and the end angle
    // will always be twice the value of PI, which indicates a full 360 degrees in radians.
    context.arc(100, 100, 100, 0, 2 * Math.PI);

    // By default, this line’s path would be invisible, however the stroke() method ensures
    // that a visible line is drawn along the path making its outline visible. We could also
    // have used the fill() method to fill the circle with a fixed color.
    context.stroke();
}

// Drawing a straight line works in a similar way to drawing a circle in that we must define
// our line before calling the stroke() method to actually apply the graphical “ink” to the
// canvas
function drawLine() {

    // Move the drawing context location to position 50px (from the left edge of the canvas) x 40px
    // (from the top edge of the canvas)
    context.moveTo(50, 40);

    // Mark out a staright line from the context’s current position to position 150px x 160px,
    // without actually drawing a line onto the canvas
    context.lineTo(150, 160);

    // Apply the “ink” to the canvas to fill in the marked-out line
    context.stroke();
}

// Define a function to draw a red square onto the canvas using the drawing context’s
// fillRect() method, setting the draw color to use first before performing the action
function drawSquare() {

    // Set the fill style of the next draw operation. #FF000 is the hex value representing red.
    context.fillStyle = "#FF0000";

    // Draw a 100px red square starting at position 20px x 20px
    context.fillRect(20, 20, 100, 100);
}

// We could even add text onto our canvas using the fillText() and strokeText() drawing
// context methods as shown in this function
function writeText() {

    // First set the font style to use for the text to draw onto the canvas
    context.font = "30px Arial";

    // Write some text onto the canvas at position 0px x 0px
    context.fillStyle = "#000";
    context.fillText("Filled Text", 0, 30);

    // Write some outlined text onto the canvas beneath the existing text at position 0px x 40px
    context.strokeText("Outlined Text", 0, 70);
}

// Execute the defined drawing functions, adding their shapes and text to the canvas
emptyCanvas();
drawCircle();
drawLine();
drawSquare();
writeText();

// Add the new <canvas> DOM element to the end of the current HTML page once loaded
window.addEventListener("load", function() {
    document.body.appendChild(canvas);
}, false);