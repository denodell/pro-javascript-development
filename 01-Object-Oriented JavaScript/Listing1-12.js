function Accommodation() {}

Accommodation.prototype.isLocked = false;

Accommodation.prototype.lock = function() {
    this.isLocked = true;

    // By returning the context, we are in fact returning an instance of the object instance
    // which called this function. Since that object contains all the methods, we’re able to
    // call the other methods immediately after calling this one
    return this;
};

Accommodation.prototype.unlock = function() {
    this.isLocked = false;
    return this;
};

Accommodation.prototype.alarm = function() {
    alert("Sounding alarm!");
    return this;
};

// Create an object instance
var house = new Accommodation();

// Because each method returns its context, which in this case is the object instance, we can
// chain method calls one after another
house.lock().alarm().unlock();