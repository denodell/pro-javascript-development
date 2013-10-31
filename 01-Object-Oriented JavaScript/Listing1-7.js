var apartment = {
    isLocked: false,
    lock: function() {
        var that = this;

        // Set the isLocked property
        this.isLocked = true;

        function doSomething() {
            alert(this === apartment); // false
            alert(this === window); // true
            alert(that === apartment); // true

            // Overwrite the isLocked property of the object,
            // accessing it through the stored variable
            that.isLocked = false;
        }

        doSomething();
    }
};

apartment.lock();

alert(apartment.isLocked); // false