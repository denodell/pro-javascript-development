// Define a "class" with two methods
function Accommodation() {}

Accommodation.prototype.lock = function() {};
Accommodation.prototype.unlock = function() {};

// Define a constructor function for what will become our subclass
function House(defaults) {
    defaults = defaults || {};

    // Initialize the floors property to ‘2’ for all instances of this "class"
    this.floors = 2;

    // If a ‘rooms’ property is passed within an object literal to this constructor, use its
    // value, otherwise default to 7 rooms
    this.rooms = defaults.rooms || 7;
}

// Map an instance of the Accommodation "class" to the prototype of the House "class".
// This executes the constructor function for Accommodation with the ‘new’ keyword, which
// creates and returns an object containing all its properties and methods. This is passed into
// the prototype of the House "class", making that "class" inherit everything from Accommodation
House.prototype = new Accommodation();

// The ‘constructor’ property of an object instance points to the constructor function that
// created it. However, by mapping everything from Accommodation to House, we also copied over
// the ‘constructor’ value, which we now need to reset to point to the new subclass instead.
// If we miss this step, object literals created from the House "class" will report that they
// were created from the Accommodation "class" instead.
House.prototype.constructor = House;

// Create an instance of a House, inheriting properties and methods from Accommodation, also
var myHouse = new House();

// Pass in a value for ‘rooms’ to set that value at the point of object instantiation
var myNeighborsHouse = new House({
    rooms: 8
});

alert(myHouse.rooms); // 7 (the default value set in the House constructor function)
alert(myNeighborsHouse.rooms); // 8

// Methods that were set on Accommodation are also available to objects created from House
myHouse.lock();
myNeighborsHouse.unlock();

// Objects created from House report that fact, thanks to us fixing the ‘constructor’
// property earlier
alert(myHouse.constructor === House); // true
alert(myHouse.constructor === Accommodation); // false, since we pointed the constructor to House

// The instanceof keyword looks up the prototype chain, so can also be used to check if an
// object instance is derived from a particular parent "class"
alert(myNeighborsHouse instanceof House); // true
alert(myNeighborsHouse instanceof Accommodation); // true, since House inherits Accommodation