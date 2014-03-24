// Create a <img> element on the page and point to an image of a compass
var imageElem = document.createElement("img");
imageElem.setAttribute("src", "Listing10-6.jpg");

// Create a function to execute when the compass heading of the device changes
function handleCompassEvent(event) {

    // Get the current compass heading of the iPhone or iPad, in degrees from due north
    var compassHeading = event.webkitCompassHeading;

    // Rotate an image according to the compass heading value. The arrow pointing to due north
    // in the image will continue to point north as the device moves
    imageElem.style.webkitTransform = "rotate(" + (-compassHeading) + "deg)";
}

// Add the <img> element to the page
document.body.appendChild(imageElem);

// Observe the orientation of the device and call the event handler when it changes
window.addEventListener("deviceorientation", handleCompassEvent, false);