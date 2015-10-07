// Define a "class" using Class.create, passing an object literal representing the public
// properties and methods to be made available to that "class". The ‘initialize’ method will
// become the constructor function of the new "class"
var Accommodation = Class.create({
    isLocked: true,
    isAlarmed: true,
    lock: function() {
        this.isLocked = true;
    },
    unlock: function() {
        this.isLocked = false;
    },
    initialize: function() {
        this.unlock();
    }
});

// Create a subclass of Accommodation, using the ‘extend’ method that Class.create adds to any
// "classes" it creates, for simple inheritance. All the public properties and methods from the
// parent "class" are available to the subclass, with those of the same name overriding those
// from the parent.
var House = Accommodation.extend({
    floors: 2,
    lock: function() {

        // Even though we’re using polymorphism to replace the parent "class" of the same name,
        // we can still access that parent "class" method using ‘this.__parent()’
        this.__parent();
        alert("Number of floors locked: " + this.floors);
    }
});

// Create object instances from the new "classes"
var myAccommodation = new Accommodation();
alert(myAccommodation instanceof Accommodation); // true
alert(myAccommodation instanceof House); // false

var myHouse = new House();
alert(myHouse.isLocked); // false (set by the parent "class"’s initialize method,
                         // inherited by House)
myHouse.lock(); // Alerts “Number of floors locked: 2”
alert(myHouse.isLocked); // true
alert(myHouse instanceof House); // true
alert(myHouse instanceof Accommodation); // true
