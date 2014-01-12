// Define an instance of a memento to allow us to save and restore the state of objects
var memento = new Memento(),

    // Define an object whose state we wish to be able to save and restore
    user = {
        name: "Den Odell",
        age: 35
    };

// Save the current state of the user object using the memento
memento.saveState("user", user);

// Prove that the state of the object is save in JSON format by reading from the storage object
// of the memento directly
alert(memento.storage["user"]); // {"name":"Den Odell","age":35}

// Now change the values in the user object as you wish
user.name = "John Smith";
user.age = 21;

// Output the current state of the user object
alert(JSON.stringify(user)); // {"name":"John Smith","age":21}

// Whenever you wish to restore the last saved state of the user object, simply call the restoreState() method of the memento
user = memento.restoreState("user");

// Output the new value of the user object, which has been restored to its last saved state
alert(JSON.stringify(user)); // {"name":"Den Odell","age":35}