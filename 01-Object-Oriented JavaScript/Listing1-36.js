// Define a simple object with two properties
var personalDetails = {
        firstName: "Den",
        lastName: "Odell"
    },

    // Create a duplicate of this object
    fathersDetails = Object.create(personalDetails);

// Customize the duplicated object
fathersDetails.firstName = "John";

// The properties set via the original object are still intact
alert(fathersDetails.lastName); // "Odell"