// Define a namespace to contain the code for our game within a single global variable
var Frogger = (function() {

    // Locate the main <canvas> element on the page
    var canvas = document.getElementById("canvas"),

        // Get a reference to the <canvas> element's 2-D drawing surface context
        drawingSurface = canvas.getContext("2d"),

        // Locate the background <canvas> element on the page
        backgroundCanvas = document.getElementById("background-canvas"),

        // Get a reference to the background <canvas> element's 2-D drawing surface context
        backgroundDrawingSurface = backgroundCanvas.getContext("2d"),

        // Get a reference to the <canvas> element's width and height, in pixels
        drawingSurfaceWidth = canvas.width,
        drawingSurfaceHeight = canvas.height;

    return {

        // Expose the <canvas> element, its 2-D drawing surface context, its width and
        // its height for use in other code modules
        canvas: canvas,
        drawingSurface: drawingSurface,
        drawingSurfaceWidth: drawingSurfaceWidth,
        drawingSurfaceHeight: drawingSurfaceHeight,

        // Expose the background <canvas> element's 2-D drawing surface context
        backgroundDrawingSurface: backgroundDrawingSurface,

        // Define an object containing references to directions the characters in our game can
        // move in. We define it here globally for use across our whole code base
        direction: {
            UP: "up",
            DOWN: "down",
            LEFT: "left",
            RIGHT: "right"
        },

        // Define the observer design pattern methods subscribe() and publish() to allow
        // application-wide communication without the need for tightly-coupled modules. See
        // Chapter 7 for more information on this design pattern.
        observer: (function() {
            var events = {};

            return {
                subscribe: function(eventName, callback) {

                    if (!events.hasOwnProperty(eventName)) {
                        events[eventName] = [];
                    }

                    events[eventName].push(callback);
                },

                publish: function(eventName) {
                    var data = Array.prototype.slice.call(arguments, 1),
                        index = 0,
                        length = 0;

                    if (events.hasOwnProperty(eventName)) {
                        length = events[eventName].length;

                        for (; index < length; index++) {
                            events[eventName][index].apply(this, data);
                        }
                    }
                }
            };
        }()),

        // Define a method to determine whether two obstacles on the game board intersect
        // each other on the horizontal axis. By passing in two objects, each with a 'left'
        // and 'right' property indicating the left-most and right-most position of each
        // obstacle in pixels on the game board, we establish whether the two intersect
        // each other - if they do, and they are both on the same row as each other on the
        // game board, this can be considered a collision between these two obstacles
        intersects: function(position1, position2) {
            var doesIntersect = false;

            if ((position1.left > position2.left && position1.left < position2.right) ||
                (position1.right > position2.left && position1.left < position2.right)) {
                doesIntersect = true;
            }

            return doesIntersect;
        }
    };
}());