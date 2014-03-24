// Use an object literal to create a hierarchy of grouped properties and methods,
// known as a "namespace"
var myProject = {
    data: {

        // Each nested property represents a new, deeper level in the namespace hierarchy
        ajax: {

            // Create a method to send an Ajax GET request
            get: function(url, callback) {
                var xhr = new XMLHttpRequest(),
                    LOADED_STATE = 4,
                    OK_STATUS = 200;

                xhr.onreadystatechange = function() {
                    if (xhr.readyState !== LOADED_STATE) {
                        return;
                    }

                    if (xhr.status === OK_STATUS) {
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
myProject.data.ajax.get("/", function(response) {
    alert("Received the following response: " + response);
});

// Note how using the hierarchy adds clarity to the final method call
myProject.data.cookies.set("userID", "1234567890");
myProject.data.cookies.set("name", "Den Odell");

// Read back the cookie valus set previously
alert(myProject.data.cookies.get("userID")); // 1234567890
alert(myProject.data.cookies.get("name")); // Den Odell