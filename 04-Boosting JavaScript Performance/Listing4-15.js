// Get a reference to the list element surrounding all the links we wish to
// assign the event handler to
var list = document.getElementById("list");

// Define a function to execute when either the link or an element within the link
// is executed
function onClick(evt) {

    // Get a reference to the actual element clicked on using the event’s ‘target’ property
    var clickedElem = evt.target,
        tagNameSought = "A";

    // Check to see if the element clicked on is of the type we are looking for, in this
    // case if it is an <a> tag
    if (clickedElem && clickedElem.tagName === tagNameSought) {

        // If it is, we get the link’s ‘href’ value and open this in a new window
        window.open(clickedElem.href);
    }
}

// Assign the event handler to the list item, the parent surrounding all the links. Adding
// one event handler is faster than assigning an event handler to each of the individual
// links. The third parameter is set to ‘false’, indicating that events should be handled
// in the bubble phase of the event lifecycle, from the element the event occurred on, up the
// tree to the list item itself
list.addEventListener("click", onClick, false);