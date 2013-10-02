// Get a reference to the first <img> element on the page
var imageElem = document.getElementsByTagName("img")[0];

// Create a function to execute when the compass heading of the device changes
function handleCompassEvent(event) {
    // Get the current compass heading of the iPhone or iPad, in degrees from due north
    var compassHeading = event.webkitCompassHeading;

    // Rotate an image according to the compass heading value. The arrow pointing to due north
    // in the image will continue to point north as the device moves
    imageElem.style.webkitTransform = "rotate(" + (-compassHeading) + "deg)";
}

// Observe the orientation of the device and call the event handler when it changes
window.addEventListener("deviceorientation", handleCompassEvent, false);