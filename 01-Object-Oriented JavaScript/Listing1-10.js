// Define a constructor function with three parameters representing values to initialize
// properties of the instantiated object with
function Accommodation(floors, rooms, sharedEntrance) {

    // Initialize three properties with values passed in when an object is instantiated
    // from this "class". The Logical OR operation - || - allows a default value to be specified
    // in case no value is passed in
    this.floors = floors || 0;
    this.rooms = rooms || 0;
    this.sharedEntrance = sharedEntrance || false;
}

// Properties that don’t need values set at instantiation time should be set with prototype
// as these are then defined and executed only once.
Accommodation.prototype.isLocked = false;

Accommodation.prototype.lock = function() {
    this.isLocked = true;
};

Accommodation.prototype.unlock = function() {
    this.isLocked = false;
};

// Instantiate an object from the "class", passing in two out of the possible three values
// for initialization. Arguments are passed in the order defined on the constructor function
var house = new Accommodation(2, 7);

alert(house.floors); // 2
alert(house.rooms); // 7

// A value for sharedEntrance wasn’t passed into the constructor function, so its value
// defaults to false because of the Logical OR operation in the constructor function – see above
alert(house.sharedEntrance); // false