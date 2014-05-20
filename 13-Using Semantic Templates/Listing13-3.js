// Define the HTML template to apply data to, using {{ ... }} to denote the data property name
// to be replaced with real data
var template = "<p>Name: <a href=\"mailto:{{email}}\">{{firstName}} {{lastName}}</a><br>Company: {{company}}</p><p>City: {{city}}</p>",

    // Define two data objects containing properties to be inserted into the HTML template using
    // the property name as key
    me = {
        firstName: "Den",
        lastName: "Odell",
        email: "denodell@me.com",
        company: "AKQA",
        city: "London"
    },
    bill = {
        firstName: "Bill",
        lastName: "Gates",
        email: "bill@microsoft.com",
        company: "Microsoft",
        city: "Seattle"
    };

// Define a simple function to apply data from a JavaScript object into a HTML template,
// represented as a string
function applyDataToTemplate(templateString, dataObject) {
    var key,
        value,
        regex;

    // Loop through each property name in the supplied data object, replacing all instances of
    // that name surrounded by {{ and }} with the value from the data object
    for (key in dataObject) {
        regex = new RegExp("{{" + key + "}}", "g");
        value = dataObject[key];

        // Perform the replace
        templateString = templateString.replace(regex, value);
    }

    // Return the new, replaced HTML string
    return templateString;
}

// Outputs:
// <p>Name: <a href="mailto:denodell@me.com">Den Odell</a><br>Company: AKQA</p>
//     <p>City: London</p>
alert(applyDataToTemplate(template, me));

// Outputs:
// <p>Name: <a href="mailto:bill@microsoft.com">Bill Gates</a><br>Company: Microsoft</p>
//     <p>City: Seattle</p>
alert(applyDataToTemplate(template, bill));