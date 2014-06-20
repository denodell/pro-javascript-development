var cookie = (function() {
    var allCookies = document.cookie.split(";"),
        cookies = {},
        cookiesIndex = 0,
        cookiesLength = allCookies.length,
        cookie;

    for (; cookiesIndex < cookiesLength; cookiesIndex++) {
        cookie = allCookies[cookiesIndex].split("=");

        cookies[unescape(cookie[0])] = unescape(cookie[1]);
    }

    return {
        get: function(name) {
            return cookies[name] || "";
        },

        set: function(name, value) {
            cookies[name] = value;
            document.cookie = escape(name) + "=" + escape(value);
        },

        remove: function(name) {

            // Remove the cookie by removing its entry from the cookies object and setting its
            // expiry date in the past
            delete cookies[name];
            document.cookie = escape(name) + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        },

        // Supply an execute() method, which is used to abstract calls to other methods so that
        // other method names can be changed as needs be in future without affecting the API
        // available to the rest of the code - provided this execute() method continues to exist
        execute: function(command, params) {

            // The command parameter contains the method name to execute, so check that the
            // method exists and is a function
            if (this.hasOwnProperty(command) && typeof this[command] === "function") {

                // If the method exists and can be executed, then execute it, passing across the
                // supplied params
                return this[command].apply(this, params);
            }
        }
    };
}());

// Set a cookie using the execute() method to indirectly call the set() method of the cookie
// singleton and supplying parameters to pass onto that method
cookie.execute("set", ["name", "Den Odell"]);

// Check that the cookie was set correctly using execute() with the "get" method
alert(cookie.execute("get", ["name"])); // Den Odell