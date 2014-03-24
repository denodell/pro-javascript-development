localStorage["stack"] = localStorage["stack"] || [];

function ajax(url, callback) {
    var xhr = new XMLHttpRequest(),
        LOADED_STATE = 4,
        OK_STATUS = 200;

    if (!navigator.onLine) {

        // Data in localStorage is stored as strings, so to store complex data structures such
        // as arrays or objects, we need to convert those into a JSON-formatted string first
        localStorage["stack"].push(JSON.stringify(arguments));
    } else {
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

function clearStack() {
    if (navigator.onLine) {
        while (localStorage["stack"].length) {

            // After reading the JSON-formatted string data out of localStorage, it needs to be
            // converted back into a complex data form for use with the ajax() function
            ajax.apply(ajax, JSON.parse(localStorage["stack"].shift()));
        }
    }
}

// Check on page load if there are any previously stacked Ajax calls that could now be sent
window.addEventListener("load", clearStack, false);
window.addEventListener("online", clearStack, false);