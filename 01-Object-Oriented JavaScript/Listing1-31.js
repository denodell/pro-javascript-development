// Define a simple object with two properties
var personalDetails = {
    name: "Den Odell",
    email: "den.odell@me.com"
};

alert(Object.isExtensible(personalDetails)); // true, as by default all objects can be extended

// Prevent the ‘personalDetails’ object being added to
Object.preventExtensions(personalDetails);

alert(Object.isExtensible(personalDetails)); // false, as the object is now locked down

// Attempt to add a new property to the ‘personalDetails’ object
personalDetails.age = 35; // Throws an exception if using ‘strict’ mode as the object is locked