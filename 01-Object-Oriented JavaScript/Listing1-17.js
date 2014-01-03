// Define our parent Accommodation "class"
function Accommodation() {
    this.isAlarmed = false;
}

Accommodation.prototype.alarm = function(note, time) {
    var message = "Alarm activated at " + time + " with the note: " + note;

    this.isAlarmed = true;

    alert(message);
};

// Define a subclass for House
function House() {
    this.isLocked = false;
}

// Inherit from Accommodation
House.prototype = new Accommodation();

// Redefine the ‘alarm’ method specifically for the House "class". No need to list the arguments
// in the function definition here since we’re going to simply pass them through to the same
// method on the parent "class"
House.prototype.alarm = function() {

    // Set the ‘isLocked’ property on this object instance to ‘true’
    this.isLocked = true;

    // Execute the ‘alarm’ method from the parent Accommodation "class", passing all the
    // arguments from the execution of this method onto the parent method – no need to
    // explicitly list the arguments!
    Accommodation.prototype.alarm.apply(this, arguments);
};

// Create an object instance from the subclass and try it out
var myHouse = new House();
myHouse.alarm("Activating alarm", new Date()); // Alerts "Alarm activated at Fri Feb 14 2014
                                               // 13:02:56 GMT+0100 (BST) with the note:
                                               // Activating alarm"

alert(myHouse.isLocked); // true