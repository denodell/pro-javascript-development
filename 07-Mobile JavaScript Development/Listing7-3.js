// Define an event handler to execute when a touch event occurs on the screen
function handleTouchEvent(event) {

    // Get the list of all touches currently on the screen
    var allTouches = event.touches,
        allTouchesLength = allTouches.length,

        // Get a reference to an element on the page to output the total number of touches
        // currently on the screen to
        touchCountElem = document.getElementById("touch-count");

    // Prevent the default browser action from occurring
    // when the user touches and holds their finger on the screen
    if (event.type === "touchstart") {
        event.preventDefault();
    }

    // Write the number of current touches onto the page
    touchCountElem.innerHTML = "There are currently " + allTouchesLength + " touches on the screen.";
}

// Assign the event handler to execute when a finger touches (touchstart) or is removed
// from (touchend) the screen
window.addEventListener("touchstart", handleTouchEvent, false);
window.addEventListener("touchend", handleTouchEvent, false);