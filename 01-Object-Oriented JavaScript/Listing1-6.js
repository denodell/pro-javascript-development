// Outside of any function, ‘this’ represents the global ‘window’ object
alert(this === window); // true

// Because the doSomething function is called outside of an object, the keyword this adopts
// the global JavaScript window object in the browser.
function doSomething() {
    alert(this === window); // true
}

doSomething();

var house = {
    floors: 2,
    isLocked: false,
    lock: function() {
        alert(this === house); // true, as the this keyword represents the object containing this method

        // We can treat ‘this’ as equivalent to the ‘house’ object, including using dot notation
        this.isLocked = true;
    }
};

house.lock();

alert(house.isLocked); // true