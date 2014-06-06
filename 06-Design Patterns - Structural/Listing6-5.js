// Define a function which acts as a façade to simplify and facilitate cross-browser Ajax calls,
// supporting browsers all the way back to Internet Explorer 5
function ajaxCall(type, url, callback, data) {

    // Get a reference to an Ajax connection object relevant to the current browser
    var xhr = (function() {
            try {

                // The standard method, used in all modern browsers
                return new XMLHttpRequest();
            }
            catch(e) {}

            // Older versions of Internet Explorer utilise an ActiveX object installed on the
            // user's machine
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");
            }
            catch(e) {}

            try {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            }
            catch(e) {}

            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e) {}

            // If no relevant Ajax connection object can be found, throw an error
            throw new Error("Ajax not supported in this browser.");
        }()),
        STATE_LOADED = 4,
        STATUS_OK = 200;

    // Execute the given callback method once a succesful response is received from the server
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== STATE_LOADED) {
            return;
        }

        if (xhr.status === STATUS_OK) {
            callback(xhr.responseText);
        }
    };

    // Use the browser's Ajax connection object to make the relevant call to the given URL
    xhr.open(type.toUpperCase(), url);
    xhr.send(data);
}