var formsMediator = new Mediator(),
    loggingMediator = new Mediator();

(function(formsMediator) {
    function ajaxPost(url, data, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status === 200) {
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

(function(formsMediator) {
    var form = document.getElementById("mailinglist-form"),
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

(function(loggingMediator) {
    var logs = [];

    loggingMediator.subscribe("log", function(trackingText) {
        logs.push({
            message: trackingText,
            date: new Date()
        });
    });

    loggingMediator.subscribe("retrieve-log", function() {
        loggingMediator.publish("log-retrieved", logs);
    });
}(loggingMediator));

(function(formsMediator, loggingMediator) {
    var button = document.createElement("button");

    loggingMediator.subscribe("log-retrieved", function(logs) {
        var index = 0,
            length = logs.length,
            ulTag = document.createElement("ul"),
            liTag = document.createElement("li"),
            listItem;

        for (; index < length; index++) {
            listItem = liTag.cloneNode(false);
            listItem.innerHTML = logs[index].date.toUTCString() + ": " + logs[index].message;
            ulTag.appendChild(listItem);
        }

        document.body.appendChild(ulTag);
    });

    formsMediator.subscribe("form-submit", function(url) {
        loggingMediator.publish("log", "Form submitted to " + url);
    });

    formsMediator.subscribe("ajax-response", function(response) {
        loggingMediator.publish("log", "The server responded to an Ajax call with: " + response);
    });

    button.innerHTML = "Show logs";

    button.addEventListener("click", function() {
        loggingMediator.publish("retrieve-log");
    }, false);

    document.body.appendChild(button);
}(formsMediator, loggingMediator));