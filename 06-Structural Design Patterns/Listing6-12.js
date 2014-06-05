// The module pattern is distinctive as it uses a combination of a self-executing anonymous
// function closure, with any dependencies passed in as parameters, and an optional return
// statement which allows code created within the closure to be made available externally

// Our only dependency is the 'document' object which contains the browser's cookie data. As an
// added security measure, we can include a final listed parameter named 'undefined' to which we
// never pass a value. This ensures that the variable named 'undefined' always contains an
// undefined value provided we always ensure we never pass in a value to this parameter.
// Otherwise it might be possible for other code, whether through malicious reasons or
// otherwise, to overwrite this value as it is not a reserved word in the language causing all
// kinds of havoc to the way our code behaves.
var cookie = (function(document, undefined) {
    var allCookies = document.cookie.split(";"),
        cookies = {},
        cookiesIndex = 0,
        cookiesLength = allCookies.length,
        cookie;

    for (; cookiesIndex < cookiesLength; cookiesIndex++) {
        cookie = allCookies[cookiesIndex].split("=");

        cookies[unescape(cookie[0])] = unescape(cookie[1]);
    }

    // Return any methods, properties or values that you wish to make available to the rest of
    // your code base. In this case, the following two methods will be exposed through the
    // 'cookie' variable, creating a singleton
    return {
        get: function(name) {
            return cookies[name] || "";
        },

        set: function(name, value) {
            cookies[name] = value;
            document.cookie = escape(name) + "=" + escape(value);
        }
    };

// Pass in any dependencies at the point of function execution
}(document));