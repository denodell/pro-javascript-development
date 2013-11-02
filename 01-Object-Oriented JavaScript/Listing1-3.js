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

// Create object instances from our Accommodation "class"
var house = new Accommodation();
var apartment = new Accommodation();

// Read properties from object instances
alert(house.floors); // 0
alert(house.sharedEntrance); // false

// Write properties to object instances to set the correct values
house.floors = 2;
accommodation.sharedEntrance = true;

// Execute methods on object instances
house.unlock();
apartment.lock();