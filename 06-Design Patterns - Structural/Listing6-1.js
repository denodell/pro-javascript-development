// Imagine the following interface exists deep in your large code base for making Ajax requests
// over HTTP
var http = {
    makeRequest: function(type, url, callback, data) {
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

        xhr.open(type.toUpperCase(), url);
        xhr.send(data);
    }
};

// The http.makeRequest() method defined above could be called as follows, for getting and
// updating user data in a system for a user with an ID of "12345":
http.makeRequest("get", "/user/12345", function(response) {
    alert("HTTP GET response received. User data: " + response);
});

http.makeRequest("post", "/user/12345", function(response) {
    alert("HTTP POST response received. New user data: " + response);
}, "company=AKQA&name=Den%20Odell");

// Now imagine in a refactor of your project, you decide to introduce a new structure using a
// namespace and splitting out the makeRequest() method into separate methods for HTTP GET
// and POST requests
var myProject = {
    data: {
        ajax: (function() {
            function createRequestObj(callback) {
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

                return xhr;
            }

            return {
                get: function(url, callback) {
                    var requestObj = createRequestObj(callback);

                    requestObj.open("GET", url);
                    requestObj.send();
                },

                post: function(url, data, callback) {
                    var requestObj = createRequestObj(callback);

                    requestObj.open("POST", url);
                    requestObj.send(data);
                }
            };
        }())
    }
};

// These new get() and post() methods could be called as follows:
myProject.data.ajax.get("/user/12345", function(response) {
    alert("Refactored HTTP GET response received. User data: " + response);
});

myProject.data.ajax.post("/user/12345", "company=AKQA&name=Den%20Odell", function(response) {
    alert("Refactored HTTP POST response received. New user data: " + response);
});

// To avoid rewriting every call to the http.makeRequest() method in the rest of your code
// base, you could create an adapter to map the old interface to the new methods. The adapter
// needs to take the same input parameters as the original method it is designed to replace,
// and calls the new methods internally instead
function httpToAjaxAdapter(type, url, callback, data) {
    if (type.toLowerCase() === "get") {
        myProject.data.ajax.get(url, callback);
    } else if (type.toLowerCase() === "post") {
        myProject.data.ajax.post(url, data, callback);
    }
}

// Finaly, apply the adapter to replace the original method. It will then map the old
// interface to the new one without needing to rewrite the rest of your code at the same time
http.makeRequest = httpToAjaxAdapter;

// Use the new adapter in the same way as the original method - internally it will call the
// newer code, but externally it will appear identical to the old makeRequest() method
http.makeRequest("get", "/user/12345", function(response) {
    alert("Adapter HTTP GET response received. User data: " + response);
});

http.makeRequest("post", "/user/12345", function(response) {
    alert("Adapter HTTP POST response received. New user data: " + response);
}, "company=AKQA&name=Den%20Odell");