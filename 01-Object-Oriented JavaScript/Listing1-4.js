// Define a constructor called Accommodation
function Accommodation() {}

// Assign properties and methods to our "class" blueprint with an object literal
Accommodation.prototype = {
    floors: 0,
    rooms: 0,
    sharedEntrance: false,
    lock: function() {},
    unlock: function() {}
};

// Create an object instance
var house = new Accommodation();

// Dynamically add a new method to the "class" prototype
Accommodation.prototype.alarm = function() {};

// The existing object instance gains the new method automatically
house.alarm();