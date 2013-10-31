// Define a simple object with two properties
var personalDetails = {
    name: "Den Odell",
    email: "den.odell@me.com"
};

Object.getOwnPropertyDescriptor(personalDetails, "name");
// Returns the following object literal representing the 'name' property:
// {
//     configurable: true,
//     enumerable: true,
//     value: "Den Odell",
//     writable: true
// }