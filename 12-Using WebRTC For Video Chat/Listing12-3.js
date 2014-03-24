// Use the getUserMedia() polyfill from Listing 12-1 for best cross-browser support

// Define a function to execute if we are successfully able to access the user's webcam and
// microphone, taking the stream of data provided and passing it as the "src" attribute of a
// new <video> element, which is then placed onto the current HTML page, relaying back to the
// user the output from theirwebcam and microphone
function onSuccess(stream) {

    // Create a new <video> element
    var video = document.createElement("video"),

        // Get the browser to create a unique URL to reference the binary data directly from
        // the provided stream, as it is not a file with a fixed URL
        videoSource = window.URL.createObjectURL(stream);

    // Ensure the <video> element start playing the video immediately
    video.autoplay = true;

    // Point the "src" attribute of the <video> element to the generated stream URL, to relay
    // the data from the webcam and microphone back to the user
    video.src = videoSource;

    // Add the <video> element to the end of the current page
    document.body.appendChild(video);
}

function onError() {
    throw new Error("There has been a problem accessing the webcam and microphone");
}

if (navigator.getUserMedia) {
    navigator.getUserMedia({
        video: true,
        audio: true
    }, onSuccess, onError);
} else {
    throw new Error("Sorry, getUserMedia() is not supported in your browser");
}