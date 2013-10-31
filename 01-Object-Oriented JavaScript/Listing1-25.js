var header = document.createElement("header"),
    mouseState = "up",

    // Define an object containing three methods
    eventHandlers = {
        onClick: function() {

            // If the context is wrong when ‘onClick’ is called, the next two calls will fail
            this.onMouseDown();
            this.onMouseUp();
        },
        onMouseDown: function() {
            mouseState = "down";
        },
        onMouseUp: function() {
            mouseState = "up";
        }
    };

// Force the correct context for ‘eventHandlers.onClick’ by using ‘bind’ to return a new
// function, bound to the context we require
header.addEventListener("click", eventHandlers.onClick.bind(eventHandlers), false);

// Add the <header> element to the page
document.body.appendChild(header);