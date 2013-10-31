// Create a constructor function to represent types of accommodation
function Accommodation() {

    // Use the this keyword to set properties on the instantiated object
    this.floors = 0;
    this.isLocked = false;
}

// Define methods for instantiated objects using the prototype keyword
Accommodation.prototype.lock = function() {

    // Methods can refer to the this keyword to reach those properties created
    // in the constructor function
    this.isLocked = true;
};

Accommodation.prototype.unlock = function() {
    this.isLocked = false;
};

// Instantiate an object of the Accommodation type
var house = new Accommodation();

// Execute the 'lock' method
house.lock();

// Check that the 'isLocked' property was set as expected
alert(house.isLocked); // true