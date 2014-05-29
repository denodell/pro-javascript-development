// Reference our exported utility methods the utility.js file
var utility = require("./utility"),

    // Load the data from our comment-free package.json file (see Listing 14-4)
    pkg = require("./package.json"),

    // Use the exported utility method toCamelCase() to convert the description text from the
    // package.json file into camel case
    camelCaseDescription = utility.toCamelCase(pkg.description),

    // Use the utility method toHyphens() to convert the camel case description into a
    // lower case hyphenated form
    hyphensDescription = utility.toHyphens(camelCaseDescription);

// Write out the description of the package to the command line in its different forms
console.log(camelCaseDescription); // outputs: "This Is My Test Project"
console.log(hyphensDescription); // outputs: "this-is-my-test-project"