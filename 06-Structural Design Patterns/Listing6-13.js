// Define a namespace which we will populate with code modules
var myData = {};

// Ajax module, added to the myData namespace through augmentation
// The namespace is passed in as a parameter and, once it has been augmented with new method, is
// finally returned back, overwriting the original namespace with the new, augmented one
myData = (function(myNamespace, undefined) {

    // Add an 'ajax' object property to the namespace and populate it with related methods
    myNamespace.ajax = {
        get: function(url, callback) {
            var xhr = new XMLHttpRequest(),
                STATE_LOADED = 4,
                STATUS_OK = 200;

            xhr.onreadystatechange = function() {
                if (xhr.readyState !== STATE_LOADED) {
                    return;
                }

                if (xhr.status === STATUS_OK) {
                    callback(xhr.responseText);
                }
            };

            xhr.open("GET", url);
            xhr.send();
        }
    };

    // Return the new, augmented namespace back to the myData variable
    return myNamespace;

// We can use the following defence mecahnism, which reverts to an empty object if the myData
// namespace object does not yet exist. This is useful when you have modules split over several
// files in a large namespace and you're unsure if the namespace passed in has been initialized
// elsewhere before
}(myData || {}));

// Cookies module, added to the myData namespace through augmentation
// As before, the namespace is passed in, augmented, and then returned, overwriting the original
// namespace object. At this point, the myData namespace contains the Ajax module code
myData = (function(myNamespace, undefined) {

    // Add a 'cookies' object property to the namespace and populate it with related methods
    myNamespace.cookies = {
        get: function(name) {
            var output = "",
                escapedName = escape(name),
                start = document.cookie.indexOf(escapedName + "="),
                end = document.cookie.indexOf(";", start);

            end = end === -1 ? (document.cookie.length - 1) : end;

            if (start >= 0) {
                output = document.cookie.substring(start + escapedName.length + 1, end);
            }

            return unescape(output);
        },
        set: function(name, value) {
            document.cookie = escape(name) + "=" + escape(value);
        }
    };

    return myNamespace;
}(myData || {}));

// Execute methods directly through the myData namespace object, which now contains both Ajax
// and Cookies modules
myData.ajax.get("/user/12345", function(response) {
    alert("HTTP GET response received. User data: " + response);
});
myData.cookies.set("company", "AKQA");
myData.cookies.set("name", "Den Odell");

alert(myData.cookies.get("company")); // AKQA
alert(myData.cookies.get("name")); // Den Odell