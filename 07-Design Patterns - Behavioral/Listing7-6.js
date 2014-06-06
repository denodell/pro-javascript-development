// Define an object containing global publish(), subscribe(), and unsubscribe() methods to
// implement the observer pattern
var observer = (function() {

    // Create an object for storing registered events in by name along with the associated
    // callback functions for any part of the full code base that subscribes to those
    // event names
    var events = {};

    return {

        // Define the subscribe() method, which stores a function along with its associated
        // event name to be called at some later point when the specific event by that name
        // is triggered
        subscribe: function(eventName, callback) {

            // If an event by the supplied name has not already been subscribed to, create an
            // array property named after the event name within the events object to store
            // functions to be called at a later time when the event by that name is triggered
            if (!events.hasOwnProperty(eventName)) {
                events[eventName] = [];
            }

            // Add the supplied callback function to the list associated to the specific
            // event name
            events[eventName].push(callback);
        },

        // Define the unsubscribe() method, which removes a given function from the list of
        // functions to be executed when the event by the supplied name is triggered
        unsubscribe: function(eventName, callback) {
            var index = 0,
                length = 0;

            if (events.hasOwnProperty(eventName)) {
                length = events[eventName].length;

                // Cycle through the stored functions for the given event name and remove the
                // function matching that supplied from the list
                for (; index < length; index++) {
                    if (events[eventName][index] === callback) {
                        events[eventName].splice(index, 1);
                        break;
                    }
                }
            }
        },

        // Define the publish() method, which executes all functions associated with the given
        // event name in turn, passing to each the same optional data passed as arguments to
        // the method
        publish: function(eventName) {

            // Store all parameters but the first passed to this function as an array
            var data = Array.prototype.slice.call(arguments, 1),
                index = 0,
                length = 0;

            if (events.hasOwnProperty(eventName)) {
                length = events[eventName].length;

                // Cycle through all of the functions associated with the given event name and
                // execute them each in turn, passing along any supplied parameters
                for (; index < length; index++) {
                    events[eventName][index].apply(this, data);
                }
            }
        }
    };
}());