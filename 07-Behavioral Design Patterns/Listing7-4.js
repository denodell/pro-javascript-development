// Define a generic iterator "class" for iterating/looping over arrays or object-like data
// structures
function Iterator(data) {
    var key;

    // Store the supplied data in the 'data' property
    this.data = data || {};

    this.index = 0;
    this.keys = [];

    // Store an indicator to show whether the supplied data is an array or an object
    this.isArray = Object.prototype.toString.call(data) === "[object Array]";

    if (this.isArray) {

        // If the supplied data is an array, store its length for fast access
        this.length = data.length;
    } else {

        // If object data is supplied, store each property name in an array
        for (key in data) {
            if (data.hasOwnProperty(key)) {
                this.keys.push(key);
            }
        }

        // The length of the property name array is the length of the data to iterate over,
        // so store this
        this.length = this.keys.length;
    }
}

// Define a method to reset the index, effectively rewinding the iterator back to the start of
// the data
Iterator.prototype.rewind = function() {
    this.index = 0;
};

// Define a method to return the value stored at the current index position of the iterator
Iterator.prototype.current = function() {
    return this.isArray ? this.data[this.index] : this.data[this.keys[this.index]];
};

// Define a method to return the value stored at the current index position of the iterator,
// and then advance the index pointer to the next item of data
Iterator.prototype.next = function() {
    var value = this.current();
    this.index = this.index + 1;
    return value;
};

// Define a method to indicate whether the index position is at the end of the data
Iterator.prototype.hasNext = function() {
    return this.index < this.length;
};

// Define a method to reset the index of the iterator to the start of the data and return
// the first item of data
Iterator.prototype.first = function() {
    this.rewind();
    return this.current();
};

// Define a method to iterate, or loop, over each item of data, executing a callback
// function each time, passing in the current data item as the first parameter to
// that function
Iterator.prototype.each = function(callback) {
    callback = typeof callback === "function" ? callback : function() {};

    // Iterate using a for loop, starting at the beginning of the data (achieved using the
    // rewind() method) and looping until there is no more data to iterate over (indicated
    // by the hasNext() method)
    for (this.rewind(); this.hasNext();) {

        // Execute the callback function each time through the loop, passing in the current
        // data item value and incrementing the loop using the next() method
        callback(this.next());
    }
};