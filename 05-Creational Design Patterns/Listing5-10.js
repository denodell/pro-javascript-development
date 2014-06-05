// Define a singleton containing cookie-related methods. Initialization code is achieved by
// using a self-executing function closure, which allows code to be executed at creation which
// is then unavailable publicly to the rest of the application
var cookie = (function() {

    // Cookies are stored in the document.cookie string, separated by semi-colons (;)
    var allCookies = document.cookie.split(";"),
        cookies = {},
        cookiesIndex = 0,
        cookiesLength = allCookies.length,
        cookie;

    // Loop through all cookies, adding them to the "cookies" object, using the cookie names
    // as the property names
    for (; cookiesIndex < cookiesLength; cookiesIndex++) {
        cookie = allCookies[cookiesIndex].split("=");

        cookies[unescape(cookie[0])] = unescape(cookie[1]);
    }

    // Returning methods here will make them available to the global "cookie" variable defined
    // at the top of this code listing
    return {

        // Create a function to get a cookie value by name
        get: function(name) {
            return cookies[name] || "";
        },

        // Create a function to add a new session cookie
        set: function(name, value) {

            // Add the new cookie to the "cookies" object as well as the document.cookie string
            cookies[name] = value;
            document.cookie = escape(name) + "=" + escape(value);
        }
    };
}());

// Set a cookie using the "set" method exposed through the "cookie" singleton
cookie.set("name", "Den Odell");

// Check that the cookie was set correctly
alert(cookie.get("name")); // Den Odell