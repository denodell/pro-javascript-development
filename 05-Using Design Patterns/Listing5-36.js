// Define a simple "class" to be used to implement the memento pattern. It can be used to
// provide the ability to save and restore a snapshot of an object in memory.
// Certain older browsers (e.g. Internet Explorer 7) do not support the JSON.stringify() and
// JSON.parse() methods natively. For these, you should include Doug Crockford's json2.js
// library found at https://github.com/douglascrockford/JSON-js
function Memento() {

    // Define an object in memory to store snapshots of other objects under a specified key
    this.storage = {};
}

// Define a method to save the state of any object under a specified key
Memento.prototype.saveState = function(key, obj) {

    // Convert the supplied object to a string representation in JSON format
    this.storage[key] = JSON.stringify(obj);
};

// Define a method to restore and return the state of any object stored under a specified key
Memento.prototype.restoreState = function(key) {
    var output = {};

    // If the supplied key exists, locate the object stored there
    if (this.storage.hasOwnProperty(key)) {
        output = this.storage[key];

        // Convert the stored value from a JSON string to a proper object
        output = JSON.parse(output);
    }

    return output;
};