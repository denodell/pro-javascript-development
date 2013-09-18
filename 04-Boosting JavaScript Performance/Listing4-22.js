var regEx = /[A-M]/g,
    string = "The Great Escape",
    match = string.match(regEx),
    search = string.search(regEx),
    replace = string.replace(regEx, "_");

match;   // ["G", "E"]
search;  // 4
replace; // "The _reat _scape"