// The registerHelper() method accepts two arguments - the name of the helper, as it will
// be used within the template, and a function which will be executed whenever the
// helper is encountered within the template. The function is always passed at least one
// parameter, an object containing, amongst others, a fn() method which performs the same
// operation as Handlebars' own render ability. This method takes a data object and
// returns a string combining the template within the block helper with the data in
// this object

// Define a block helper which does nothing other than pass through the data in the
// current context and combine it with the template section within the block
Handlebars.registerHelper("doNothing", function(options) {

    // To use the current data context with the template within the block, simply use
    // the 'this' keyword
    return options.fn(this);
});

// The helper can be passed parameters, if required, listed one by one after the helper
// name within double braces. These are then made available within the function as
// separate input parameters. The final parameter is always the options object, as before
Handlebars.registerHelper("ifTruthy", function(conditional, options) {
    return conditional ? options.fn(this) : options.inverse(this);
});

// If more than one or two parameters need to be passed into the helper, named parameters
// can be used. These are listed as name/value pairs in the template when the helper is
// called, and are made available within the options.hash property as a standard
// JavaScript object ready to pass to the options.fn() method and used to render the
// data within
Handlebars.registerHelper("data", function(options) {

    // The options.hash property contains a JavaScript object representing the name/value
    // pairs supplied to the helper within the template. Rather than pass through the
    // data context value 'this', here we pass through the supplied data object to the
    // template section within the helper instead
    return options.fn(options.hash);
});

// Create a simple inline helper for converting simple URLs into HTML links. Inline helpers
// can be used without being preceded by a hash (#) character in the template.
Handlebars.registerHelper("link", function(url) {

    // The SafeString() method keeps HTML content intact when rendered in a template
    return new Handlebars.SafeString("<a href=\"" + url + "\">" + url + "</a>");
});