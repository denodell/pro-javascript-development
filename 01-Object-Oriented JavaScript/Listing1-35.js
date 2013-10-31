// Define a simple object with two properties
var personalDetails = {
        name: "Den Odell",
        email: "den.odell@me.com"
    },
    keys = Object.keys(personalDetails);

alert(keys.join(", ")); // "name, email"