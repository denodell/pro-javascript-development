// This regular expression locates all capital letters from A to M, inclusive. The 'g' modifier
// indicates that the expression shouldn't stop when it reaches the first match, but continue to
// search through the rest of the applied string
var regEx = /[A-M]/g,
    string = "The Great Escape",
    match,
    search,
    replace;

// match() returns an array of the characters in the string found by the regular expression
match = string.match(regEx); // = ["G", "E"]

// search() returns the index of the first located character - the 'g' modifier in the regular
// expression is ignored
search = string.search(regEx); // = 4

// replace() switches out any located characters matched by the regular expression with the
// value in the second parameter
replace = string.replace(regEx, "_"); // = "The _reat _scape"