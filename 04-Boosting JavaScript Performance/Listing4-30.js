// Create the worker thread
var workerThread = new Worker("filename.js");

// Start listening for messages posted from the code in the thread
workerThread.addEventListener("message", function(e) {

    // The object e passed into the event handler contains the
    // posted message in its data property
    alert(e.data);
}, false);

// Run the code in the worker thread
workerThread.postMessage("");