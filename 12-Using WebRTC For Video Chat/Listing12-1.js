// Expose the browser-specific versions of the getUserMedia() method through the standard
// method name. If the standard name is already supported in the browser (as it is in Opera),
// use that, otherwise fall back to Mozilla's, Google's or Microsoft's implementations as
// appropriate for the current browser
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia ||
    navigator.webkitGetUserMedia || navigator.msGetUserMedia;