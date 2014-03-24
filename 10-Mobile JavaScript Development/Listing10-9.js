var isOnline = navigator.onLine;

if (isOnline) {
    // Run code dependent on network access, for example, execute an Ajax call to the server
} else {
    alert("The network has gone offline. Please try again later.");
}