// Define a regular expression through JavaScript’s RegExp constructor, where the expression
// is passed in the first parameter as a string, and any modifiers are passed as a string to
// the second parameter
var caps1 = new RegExp("[A-Z]", "g");

// Define a regular expression literal, where the expression is delimited by slashes (/) and
// any modifiers follow immediately after
var caps2 = /[A-Z]/g;