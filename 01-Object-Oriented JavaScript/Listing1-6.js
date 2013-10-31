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