// Define a method to load a string of HTML from a specific URL and place this within a given
// element on the current page
function loadHTMLAndReplace(url, element) {

    // Perform an Ajax request to the given URL and populate the given element with the response
    var xhr = new XMLHttpRequest(),
        LOADED_STATE = 4,
        OK_STATUS = 200;

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== LOADED_STATE) {
            return;
        }

        if (xhr.status === OK_STATUS) {
            // Populate the given element with the returned HTML
            element.innerHTML = xhr.responseText;
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

// Load the HTML from two specific URLs and populate the given elements with the returned markup
loadHTMLAndReplace("/ajax/ticket-form.html", document.getElementById("ticket-form"));
loadHTMLAndReplace("/ajax/business-card.html", document.getElementById("business-card"));