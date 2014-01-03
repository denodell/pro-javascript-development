// Define our parent Accommodation "class"
function Accommodation() {
    this.isLocked = false;
    this.isAlarmed = false;
}

// Add methods for common actions to all types of accommodation
Accommodation.prototype.lock = function() {
    this.isLocked = true;
};

Accommodation.prototype.unlock = function() {
    this.isLocked = false;
};

Accommodation.prototype.alarm = function() {
    this.isAlarmed = true;
    alert("Alarm activated");
};

Accommodation.prototype.deactivateAlarm = function() {
    this.isAlarmed = false;
    alert("Alarm deactivated");
};

// Define a subclass for House
function House() {}

// Inherit from Accommodation
House.prototype = new Accommodation();

// Redefine the ‘lock’ method specifically for the House "class" - known as Polymorphism
House.prototype.lock = function() {

    // Execute the ‘lock’ method from the parent Accommodation "class". We can access this
    // directly through the prototype property of the "class" definition. We pass our context
    // to the function using the ‘call’ method of the function, ensuring that any references to
    // ‘this’ within the ‘lock’ method refer to the current object instance of House
    Accommodation.prototype.lock.call(this);

    alert(this.isLocked); // true, showing that the call to the lock method above worked as expected

    // Call the alarm method, inherited from Accommodation
    this.alarm();
};

// Redefine the ‘unlock’ method in the same way
House.prototype.unlock = function() {
    Accommodation.prototype.unlock.call(this);
    this.deactivateAlarm();
};