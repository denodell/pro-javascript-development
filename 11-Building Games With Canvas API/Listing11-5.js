var canvas = document.createElement("canvas");

// Define a function call to move the player’s character in the <canvas>
function move(direction) {
    // Insert code here to update the position of the character on the canvas
}

// When the player presses the arrow keys on the keyboard, move the player's
// character in the appropriate direction
window.addEventListener("keydown", function(event) {

    // Define the key codes for the arrow keys
    var LEFT_ARROW = 37,
        UP_ARROW = 38,
        RIGHT_ARROW = 39,
        DOWN_ARROW = 40;

    // Execute the move() function, passing along the correct direction based on the
    // arrow key pressed. Ignore any other key presses.
    if (event.keyCode === LEFT_ARROW) {
        move("left");
    } else if (event.keyCode === RIGHT_ARROW) {
        move("right");
    } else if (event.keyCode === UP_ARROW) {
        move("up");
    } else if (event.keyCode === DOWN_ARROW) {
        move("down");
    }
}, false);

// When the player taps in certain places on the <cavnas> on their touch-sensitive
// screen, move the player's character in the appropriate direction according to where the
// screen has been tapped
canvas.addEventListener("touchstart", function(event) {

    // Get a reference to the position of the touch on the screen in pixels from the
    // top-left position of the <canvas>
    var touchLeft = event.targetTouches[0].clientX,
        touchTop = event.targetTouches[0].clientY;

    // Execute the move() function, passing along the correct direction based on the
    // position tapped on the <canvas> element
    if (touchLeft < (canvas.width / 8)) {
        move("left");
    } else if (touchLeft > (3 * canvas.width / 8)) {
        move("right");
    } else if (touchTop < (canvas.height / 8)) {
        move("up");
    } else if (touchTop > (3 * canvas.height / 8)) {
        move("down");
    }
}, false);

// Add the <canvas> element to the current HTML page once loaded
window.addEventListener("load", function() {
    document.body.appendChild(canvas);
}, false);