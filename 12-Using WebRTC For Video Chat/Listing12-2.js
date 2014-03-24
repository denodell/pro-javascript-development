// Define a function to execute if we are successfully able to access the user's webcam and
// microphone
function onSuccess() {
    alert("Successful connection made to access webcam and microphone");
}

// Define a function to execute if we are unable to access the user's webcam and microphone -
// either because the user denied access or because of a technical error
function onError() {
    throw new Error("There has been a problem accessing the webcam and microphone");
}

// Using the polyfill from Listing 12-1, we know the getUserMedia() method is supported in the
// browser if the method exists
if (navigator.getUserMedia) {

    // We can now execute the getUserMedia() method, passing in an object telling the browser
    // which form of media we wish to access ("video" for the webcam, "audio" for the
    // microphone). We pass in a reference to the onSuccess() and onError() functions which
    // will be executed based on whether the user grants us access to the requested media types
    navigator.getUserMedia({
        video: true,
        audio: true
    }, onSuccess, onError);
} else {

    // Throw an error if the getUserMedia() method is unsupported by the user's browser
    throw new Error("Sorry, getUserMedia() is not supported in your browser");
}