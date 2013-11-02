// Define a new constructor function to represent a type of accommodation
function Accommodation() {

    // The 'this' keyword refers to the individual object instance created from this "class"
    this.floors = 0;
    this.rooms = 0;
    this.sharedEntrance = false;
    this.isLocked = false;
    this.lock = function() {

        // Using this within a function refers to its surrounding object, which in this
        // case refers to the object instance, since it’s that which calls the method
        this.isLocked = true;
    };
    this.unlock = function() {
        this.isLocked = false;
    };
}

// Create object instances from the constructor
var house = new Accommodation();
var apartment = new Accommodation();

// Read and write properties and execute methods as normal with these object instances
alert(house.floors); // 0
house.floors = 2;
apartment.lock();