// Create variables to store the scroll position of the page
var scrollTopPosition = 0,
    scrollLeftPosition = 0,
    body = document.body,
    header = document.getElementById("header");

// Create an event handler function that does nothing more than store the current
// scroll position
function onScroll() {
    scrollTopPosition = body.scrollTop;
    scrollLeftPosition = body.scrollLeft;
}

// Add a function to write the current scroll position to the header element of the page
function writeScrollPosition () {
    header.innerHTML = scrollTopPosition + "px, " + scrollLeftPosition + "px";
}

// Connect the event to the handler function as usual
document.addEventListener("scroll", onScroll, false);

// Execute the writeScrollPosition function once every 500 ms rather than every time the
// scroll event fires, improving application performance
window.setInterval(writeScrollPosition, 500);