// Define the EmailFormView "class" constructor as before to initialize the View's DOM elements.
// Uses the observer pattern methods from Listing 7-6.
function EmailFormView() {
    this.form = document.createElement("form");
    this.input = document.createElement("input");
    this.button = document.createElement("button");

    this.input.setAttribute("type", "text");
    this.input.setAttribute("placeholder", "New email address");

    this.button.setAttribute("type", "submit");
    this.button.innerHTML = "Add";
}

EmailFormView.prototype = {

    // The render() method is the same as it was in the MVC pattern
    render: function() {
        this.form.appendChild(this.input);
        this.form.appendChild(this.button);

        document.body.appendChild(this.form);

        this.bindEvents();
    },

    // Note how the bindEvents() method differs from that in the MVC pattern - we no longer
    // subscribe to events broadcast from the Model, we only trigger View-based events and the
    // Presenter handles the communication between Model and View
    bindEvents: function() {
        var that = this;

        this.form.addEventListener("submit", function(evt) {
            evt.preventDefault();

            observer.publish("view.email-view.add", that.input.value);
        }, false);
    },

    // We make an addEmail() method available to each View, which the Presenter calls when
    // the Model indicates that a new email address has been added
    addEmail: function() {
        this.input.value = "";
    },

    // We make an removeEmail() method available to each View, which the Presenter calls when
    // the Model indicates that an email address has been removed. Here we do not need to do
    // anything with that information so we leave the method empty
    removeEmail: function() {

    }
};

// Define the EmailListView "class" constructor as before to initialize the View's DOM elements.
function EmailListView() {
    this.list = document.createElement("ul");
    this.listItem = document.createElement("li");
    this.listItemText = document.createElement("span");
    this.listItemRemoveButton = document.createElement("button");

    this.listItemRemoveButton.innerHTML = "Remove";
}

EmailListView.prototype = {
    render: function(modelData) {
        var index = 0,
            length = modelData.length,
            email;

        for (; index < length; index++) {
            email = modelData[index];

            this.list.appendChild(this.createListItem(email));
        }

        document.body.appendChild(this.list);

        this.bindEvents();
    },

    createListItem: function(email) {
        var listItem = this.listItem.cloneNode(false),
            listItemText = this.listItemText.cloneNode(false),
            listItemRemoveButton = this.listItemRemoveButton.cloneNode(true);

        listItem.setAttribute("data-email", email);
        listItemRemoveButton.setAttribute("data-email", email);

        listItemText.innerHTML = email;
        listItem.appendChild(listItemText).appendChild(listItemRemoveButton);

        return listItem;
    },

    // The bindEvents() method only publishes View events, it no longer subscribes to Model
    // events - these are handled in the Presenter
    bindEvents: function() {
        this.list.addEventListener("click", function(evt) {
            if (evt.target && evt.target.tagName === "BUTTON") {
                observer.publish("view.email-view.remove", evt.target.getAttribute("data-email"));
            }
        }, false);
    },

    // Create this View's addEmail() method, called by the Presenter when the Model indicates
    // that an email address has been added
    addEmail: function(email) {
        this.list.insertBefore(this.createListItem(email), this.list.firstChild);
    },

    // Create this View's removeEmail() method, called by the Presenter when the Model indicates
    // that an email address has been removed
    removeEmail: function(email) {
        var listItems = this.list.getElementsByTagName("li"),
            index = 0,
            length = listItems.length;

        for (; index < length; index++) {
            if (listItems[index].getAttribute("data-email") === email) {
                this.list.removeChild(listItems[index]);
                break;
            }
        }
    }
};

// Create the generic View which can contain child Views
function EmailView(views) {
    this.views = views || [];
}

EmailView.prototype = {

    // The render() method is as it was in the MVC pattern
    render: function(modelData) {
        var index = 0,
            length = this.views.length;

        for (; index < length; index++) {
            this.views[index].render(modelData);
        }
    },

    // Even the generic View needs the addEmail() and removeEmail() methods. When these are
    // called, they must execute the methods of the same name on any child Views, passing
    // along the email address provided
    addEmail: function(email) {
        var index = 0,
            length = this.views.length;

        for (; index < length; index++) {
            this.views[index].addEmail(email);
        }
    },

    removeEmail: function(email) {
        var index = 0,
            length = this.views.length;

        for (; index < length; index++) {
            this.views[index].removeEmail(email);
        }
    }
};