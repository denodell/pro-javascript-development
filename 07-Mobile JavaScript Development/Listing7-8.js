// Create variables to store the data returned by the device orientation event
var alpha = 0,
    beta = 0,
    gamma = 0,
    imageElem = document.getElementsByTagName("img")[0];

// Update the event handler to do nothing more than store the values from the event
function handleOrientationEvent(event) {
    alpha = event.alpha;
    beta = event.beta;
    gamma = event.gamma;
}

// Add a new function to perform just the image rotation using the stored variables
function rotateImage() {
    imageElem.style.webkitTransform = "rotateZ(" + alpha + "deg) rotateX(" + beta + "deg) rotateY(" + gamma + "deg)";
}

// Connect the event to the handler function as normal
window.addEventListener("deviceorientation", handleOrientationEvent, false);

// Execute the new image rotation function once every 500 milliseconds, instead of every time
// the event fires, effectively improving application performance
window.setInterval(rotateImage, 500);