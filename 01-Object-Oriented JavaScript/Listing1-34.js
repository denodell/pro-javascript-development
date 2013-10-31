// Define a simple object with two properties
var personalDetails = {
    name: "Den Odell",
    email: "den.odell@me.com"
};

// Define a new individual property for the object
Object.defineProperty(personalDetails, "age", {
    value: 35,
    writable: false,
    enumerable: true,
    configurable: true
});

// Define multiple new properties at the same time
Object.defineProperty(personalDetails, {
    age: {
        value: 35,
        writable: false,
        enumerable: true,
        configurable: true
    },
    town: {
        value: "London",
        writable: true
    }
});