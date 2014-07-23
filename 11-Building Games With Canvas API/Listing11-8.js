// Create a simple cross-browser polyfill for modern browsers' requestAnimationFrame()
// method to enable smooth, power-efficient animations. Credit to Paul Irish via
// http://bit.ly/req_anim_frame
window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();

// Store a reference to the last time the game loop began in a local variable–initialize it
// to the current time
var lastTimeGameLoopRan = (new Date()).getTime(),

    // Define the refresh rate we desire for our game loop to re-render our canvas within.
    // A 20 millisecond refresh rate gives a frame rate of 50 frames per second (= 1000 / 20)
    refreshRate = 20;

// Define a function to act as the game loop
function gameLoop() {

    // Get the current time and infer from there the difference between it and the last time
    // the game loop ran
    var currentTime = (new Date()).getTime(),
        timeDifference = currentTime - lastTimeGameLoopRan;

    // Execute this function again when the next animation frame is ready for use by
    // the browser - keeps the game loop looping but within the confines of the browser’s
    // performance and constraints, which is ultimately best for the player
    window.requestAnimationFrame(gameLoop);

    // the time difference between the current execution of the gameLoop() function and
    // its previous execution is greater than or equal to the defined refresh rate, then
    // run the typical game loop operations
    if (timeDifference >= refreshRate) {

        // Update character positions, check for collisions and draw characters in
        // new positions

        // Update the last time the game loop ran so its next execution will occur at the
        // correct time
        lastTimeGameLoopRan = currentTime;
    }
}

// Start the first run of the game loop
gameLoop();