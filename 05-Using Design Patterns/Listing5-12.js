// Imagine the following interface exists deep in your large code base for making Ajax requests
// over HTTP
var http = {
    makeRequest: function(type, url, callback, data) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status === 200) {
                callback(xhr.responseText);
            }
        };

        xhr.open(type.toUpperCase(), url);
        xhr.send(data);
    }
};

// The makeRequest method of the http singleton could be called as follows
http.makeRequest("get", "/", function(response) {
    alert("Response recieved: " + response);
});

http.makeRequest("post", "/", function(response) {
    alert("Response recieved: " + response);
}, "userID=1234567890&name=Den%20Odell");

// Now imagine in a refactor of your project, you decide to introduce a new structure using a
// namespace and splitting out the makeRequest method into separate methods for get and post
// requests
var myProject = {
    data: {
        ajax: (function() {
            function createRequestObj(callback) {
                var xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function() {
                    if (xhr.readyState !== 4) {
                        return;
                    }

                    if (xhr.status === 200) {
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

// These new methods could be called as follows
myProject.data.ajax.get("/", function(response) {
    alert("Response recieved: " + response);
});

myProject.data.ajax.post("/", "userID=1234567890&name=Den%20Odell", function(response) {
    alert("Response recieved: " + response);
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
// newer code
http.makeRequest("get", "/", function(response) {
    alert("Response recieved: " + response);
});

http.makeRequest("post", "/", function(response) {
    alert("Response recieved: " + response);
}, "userID=1234567890&name=Den%20Odell");