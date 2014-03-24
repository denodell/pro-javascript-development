// Create a <img> element on the page and point to an image of your choosing
var imageElem = document.createElement("img");
imageElem.setAttribute("src", "Listing10-5.jpg");

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

// Add the <img> element to the page
document.body.appendChild(imageElem);

// Listen for changes to the device orientation using the gyroscope and fire the event
// handler accordingly
window.addEventListener("deviceorientation", handleOrientationEvent, false);