// Define two mediators for our code base, one pertaining to code for a forms feature, and
// another to enable a message logging feature.
// The formsMediator will feature two events: "form-submit", and "ajax-response", whereas
// the loggingMediator will feature three events, "log", "retrieve-log", and "log-retrieved".
// Note how we're able to separate events for different features in our code using the
// mediator pattern
var formsMediator = new Mediator(),
    loggingMediator = new Mediator();

// Define a module for Ajax communication which POSTs some supplied data to the server when a
// "form-submit" event is triggered within the formsMediator
(function(formsMediator) {
    function ajaxPost(url, data, callback) {
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

        xhr.open("POST", url);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    formsMediator.subscribe("form-submit", function(url, formData) {
        ajaxPost(url, formData, function(response) {
            formsMediator.publish("ajax-response", response);
        });
    });
}(formsMediator));

// Define a module for handling submission of a simple form on the page containing text fields
// only with an ID of "my-form". When the form is submitted, the "form-submit" event is
// triggered within the formsMediator
(function(formsMediator) {
    var form = document.getElementById("my-form"),
        action = form.action,
        data = [],
        fields = form.getElementsByTagName("input"),
        index = 0,
        length = fields.length,
        field,

        thankYouMessage = document.createElement("p");

    function onFormSubmit(e) {
        e.preventDefault();

        for (; index < length; index++) {
            field = fields[index];
            data.push(escape(field.name) + "=" + escape(field.value));
        }

        formsMediator.publish("form-submit", action, data.join("&"));
    }

    form.addEventListener("submit", onFormSubmit, false);

    formsMediator.subscribe("ajax-response", function(response) {
        thankYouMessage.innerHTML = "Thank you for your form submission.<br>The server responded with: " + response;
        form.parentNode.appendChild(thankYouMessage);
    });
}(formsMediator));

// Define a module for logging messages within the system to aid with debugging of issues that
// might occur. Uses the loggingMediator to separate the logging feature of the code base
// separate from that handling the form submission with the formsMediator
(function(loggingMediator) {

    // Create an array to store the logs
    var logs = [];

    // When the "log" event is triggered on the loggingMediator, add an object to the logs
    // containing a supplied message and the date / time that the message was received at
    loggingMediator.subscribe("log", function(message) {
        logs.push({
            message: message,
            date: new Date()
        });
    });

    // When the "retrieve-log" event is triggered on the loggingMediator, trigger the
    // "log-retrieved" event, passing along the current state of the stored logs
    loggingMediator.subscribe("retrieve-log", function() {
        loggingMediator.publish("log-retrieved", logs);
    });
}(loggingMediator));

// Define a module which allows the stored logs in the loggingMediator to be displayed on screen
(function(loggingMediator) {

    // Create a button which, when clicked, will display the current state of the log
    var button = document.createElement("button");

    button.innerHTML = "Show logs";

    button.addEventListener("click", function() {

        // Trigger the "retrieve-log" event within the loggingMediator. This triggers the
        // "log-retrieved" event, passing along the current state of the logs
        loggingMediator.publish("retrieve-log");
    }, false);

    // When the "log-retrieved" event occurs, display the logs on screen
    loggingMediator.subscribe("log-retrieved", function(logs) {
        var index = 0,
            length = logs.length,
            ulTag = document.createElement("ul"),
            liTag = document.createElement("li"),
            listItem;

        // Loop through each log in the list of logs, rendering the date / time and message
        // stored within a <li> tag
        for (; index < length; index++) {
            listItem = liTag.cloneNode(false);
            listItem.innerHTML = logs[index].date.toUTCString() + ": " + logs[index].message;
            ulTag.appendChild(listItem);
        }

        // Add the <ul> tag containing all the <li> tags representing the log data to the bottom
        // of the page
        document.body.appendChild(ulTag);
    });

    // Add the button to the bottom of the current page
    document.body.appendChild(button);
}(loggingMediator));

// Define a module which logs events that occur within the formsMediator. This is the only
// module in this example to use more than one mediator
(function(formsMediator, loggingMediator) {

    // Use the loggingMediator's "log" events to log the URL the form is submitted to when the
    // "form-submit" event is triggered within the formsMediator
    formsMediator.subscribe("form-submit", function(url) {
        loggingMediator.publish("log", "Form submitted to " + url);
    });

    // Log the response from the server that is supplied when the "ajax-response" event is
    // triggered within the formsMediator
    formsMediator.subscribe("ajax-response", function(response) {
        loggingMediator.publish("log", "The server responded to an Ajax call with: " + response);
    });
}(formsMediator, loggingMediator));