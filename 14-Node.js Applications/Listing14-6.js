// Define a function which converts a text string to camel case, with an uppercase letter at
// the start of each word
function toCamelCase(inputString) {
    return inputString.replace(/\s+[a-z]/g, function(firstLetter) {
        return firstLetter.toUpperCase();
    });
}

// Define a function which converts a text string from camel case to hyphens, where all letters
// become lowercase, and spaces replaced with hyphens
function toHyphens(inputString) {
    return inputString.replace(/\s+([A-Z])/g, '-$1').toLowerCase();
}

// Export two public methods to any referenced file, toCamelCase(), which internally references
// the function of the same name, and toHyphens() which does the same
module.exports = {
    toCamelCase: toCamelCase,
    toHyphens: toHyphens
};