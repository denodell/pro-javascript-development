function Accommodation(defaults) {

    // If no argument is passed, default to an empty object literal
    defaults = defaults || {};

    // If the defaults object contains a named property, set the property of the
    // same name in the object instance to the supplied value, otherwise resort to a default
    this.floors = defaults.floors || 0;
    this.rooms = defaults.rooms || 0;
    this.sharedEntrance = defaults.sharedEntrance || false;
}

Accommodation.prototype.isLocked = false;

Accomodation.prototype.lock = function() {
    this.isLocked = true;
};

Accommodation.prototype.unlock = function() {
    this.isLocked = false;
};

// Instantiate two objects from the Accommodation "class", passing in named arguments
// through an object literal
var house = new Accommodation({
    floors: 2,
    rooms: 7
});

var apartment = new Accommodation({
    floors: 1,
    rooms: 4,
    sharedEntrance: true
});