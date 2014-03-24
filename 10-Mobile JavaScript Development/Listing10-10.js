// Define a function to execute when the network drops
function goneOffline() {
    alert("No network connection");
}

// Define a function to execute when the network connection returns
function backOnline() {
    alert("The network connection has been restored");
}

// Connect these functions up to the relevant JavaScript events that fire when the
// network goes offline and back online, respectively
window.addEventListener("offline", goneOffline, false);
window.addEventListener("online", backOnline, false);