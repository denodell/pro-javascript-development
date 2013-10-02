// Get a reference to the first <img> element on the page
var imageElem = document.getElementsByTagName("img")[0];

// Create an event handler function for processing the device orientation event
function handleOrientationEvent(event) {
    // Get the orientation of the device in 3 axes, known as alpha, beta, and gamma, and
    // represented in degrees from the initial orientation of the device on load
    var alpha = event.alpha,
        beta = event.beta,
        gamma = event.gamma;

    // Rotate the <img> element in 3 axes according to the device’s orientation using CSS
    imageElem.style.webkitTransform = "rotateZ(" + alpha + "deg) rotateX(" + beta + "deg) rotateY(" + gamma + "deg)";
}

// Listen for changes to the device orientation using the gyroscope and fire the event
// handler accordingly
window.addEventListener("deviceorientation", handleOrientationEvent, false);