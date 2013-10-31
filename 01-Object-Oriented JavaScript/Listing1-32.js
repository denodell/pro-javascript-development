// Define a simple object with two properties
var personalDetails = {
    name: "Den Odell",
    email: "den.odell@me.com"
};

// Lock down the object so that not even its existing properties can be manipulated
Object.freeze(personalDetails);

alert(Object.isFrozen(personalDetails)); // true

personalDetails.name = "John Odell"; // Throws an error if using strict mode as the object
                                     // cannot be altered once frozen