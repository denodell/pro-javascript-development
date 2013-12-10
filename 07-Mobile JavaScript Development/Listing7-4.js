// Define an event handler function to execute when the device orientation changes between
// portrait and landscape
function onOrientationChange() {

    // The device is in portrait orientation if the device is held at 0 or 180 degrees, and in
    // landscape orientation if the device is held at 90 or -90 degrees
    var isPortrait = window.orientation % 180 === 0;

    // Add a class to the <body> tag of the page according to the orientation of the device
    document.body.className += isPortrait ? " portrait" : " landscape";
}

// Execute the event handler function when the browser tells us the device has
// changed orientation
window.addEventListener("orientationchange", onOrientationChange, false);

// Execute the same function on page load to set the initial <body> class
onOrientationChange();