// Use an object literal to create a hierarchy of grouped properties and methods,
// known as a "namespace"
var myProject = {
    data: {

        // Each nested property represents a new, deeper level in the namespace hierarchy
        ajax: {

            // Create a method to send an Ajax GET request
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
        }
    }
};

// Add to the namespace after creation using dot notation
myProject.data.cookies = {

    // Create a method for reading a cookie value by name
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

    // Create a method for setting a cookie name/value pair
    set: function(name, value) {
        document.cookie = escape(name) + "=" + escape(value);
    }
};

// Execute methods directly through the "namespace" hierarchy using dot notation
myProject.data.ajax.get("/user/12345", function(response) {
    alert("HTTP GET response received. User data: " + response);
});

// Note how using the hierarchy adds clarity to the final method call
myProject.data.cookies.set("company", "AKQA");
myProject.data.cookies.set("name", "Den Odell");

// Read back the cookie valus set previously
alert(myProject.data.cookies.get("company")); // AKQA
alert(myProject.data.cookies.get("name")); // Den Odell