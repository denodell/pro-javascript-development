// Define a module for Ajax communication, with a dependency on the observer object
// from Listing 7-6
(function(observer) {

    // Define a function for performing an Ajax POST based on a supplied URL, form-encoded data
    // string, and a callback function to execute once a response has been received from
    // the server
    function ajaxPost(url, data, callback) {
        var xhr = new XMLHttpRequest(),
            STATE_LOADED = 4,
            STATUS_OK = 200;

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== STATE_LOADED) {
                return;
            }

            if (xhr.status === STATUS_OK) {

                // Execute the supplied callback function once a successful response has been
                // received from the server
                callback(xhr.responseText);
            }
        };

        xhr.open("POST", url);

        // Inform the server that we will be sending form-encoded data, where names and values
        // are separated by the equals sign (=) character, and name/value pairs are separated by
        // the ampersand (&) character
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // POST the data to the server
        xhr.send(data);
    }

    // Subscribe to the global, custom "form-submit" event and, when this event is triggered by
    // another module in the code base, make a Ajax POST request to the server using the
    // supplied URL and data. Trigger the "ajax-response" event when complete, passing in the
    // server's response from the Ajax call
    observer.subscribe("form-submit", function(url, formData) {
        ajaxPost(url, formData, function(response) {

            // Trigger the global "ajax-response" event, passing along the data returned from
            // the server during the Ajax POST
            observer.publish("ajax-response", response);
        });
    });
}(observer));

// Define a module for handling submission of a simple form on the page containing text fields
// only with an ID of "my-form". Note that neither of the modules in this code listing reference
// each other, they only reference the observer object which handles all communication between
// modules in the system. Each module is said to be "loosely-coupled" as it has no hardcoded
// dependency on any other module
(function(observer) {

    // Get a reference to a form on the current HTML page with ID "my-form"
    var form = document.getElementById("my-form"),

        // Get the "action" attribute value from the form, which will be the URL we perform an
        // Ajax POST to
        action = form.action,
        data = [],

        // Get a reference to all <input> fields within the form
        fields = form.getElementsByTagName("input"),
        index = 0,
        length = fields.length,
        field,

        // Create a HTML <p> tag for use as a thank you message after form submission has
        // taken place
        thankYouMessage = document.createElement("p");

    // Define a function to execute on submission of the form which uses the observer pattern to
    // submit the form field data over Ajax
    function onFormSubmit(e) {

        // Prevent the default behavior of the submit event, meaning a normal in-page HTML form
        // submission will not occur
        e.preventDefault();

        // Loop through all <input> tags on the page, creating an array of name/value pairs of
        // the data entered into the form
        for (; index < length; index++) {
            field = fields[index];

            data.push(escape(field.name) + "=" + escape(field.value));
        }

        // Trigger the global "form-submit" event on the observer object, passing it the URL to
        // use for the Ajax POST and the form data to be sent. The Ajax communication module is
        // listening for this event and will handle everything pertaining to the submission of
        // that data to the server.
        observer.publish("form-submit", action, data.join("&"));
    }

    // Wire up the onFormSubmit() function to the "submit" event of the form
    form.addEventListener("submit", onFormSubmit, false);

    // Subscribe to the global, custom "ajax-response" event, and use the server's response data
    // sent along with the event to populate a Thank You message to display on the page beside
    // the form
    observer.subscribe("ajax-response", function(response) {
        thankYouMessage.innerHTML = "Thank you for your form submission.<br>The server responded with: " + response;

        form.parentNode.appendChild(thankYouMessage);
    });
}(observer));