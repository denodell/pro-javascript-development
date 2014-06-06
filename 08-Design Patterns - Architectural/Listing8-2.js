// We will be building a page consisting of two parts: a text input field and associated
// button, for adding new email addresses to our list of stored addresses, and a list displaying
// the stored email addresses with a "Remove" button beside each to allow us to remove email
// addresses from the list of stored addresses. We will also define a generic View which acts
// as a holder for multiple child views, and we'll use this as a way of linking the two views
// together in Listing 8-3. As with the Model in Listing 8-1, we will be taking advantage of
// the observer pattern methods from Listing 7-6
//
// Define a View representing a simple form for adding new email addresses to the displayed
// list. We define this as a "class" so that we can create and display as many instances of
// this form as we wish within our user interface
function EmailFormView() {

    // Create new DOM elements to represent the form we are creating (you may wish to store
    // the HTML tags you need directly within your page rather than create them here)
    this.form = document.createElement("form");
    this.input = document.createElement("input");
    this.button = document.createElement("button");

    // Ensure we are creating a <input type="text"> field with appropriate placeholder text
    this.input.setAttribute("type", "text");
    this.input.setAttribute("placeholder", "New email address");

    // Ensure we are creating a <button type="submit">Add</button> tag
    this.button.setAttribute("type", "submit");
    this.button.innerHTML = "Add";
}

EmailFormView.prototype = {

    // All Views should have a render() method, which is called by the Controller at some point
    // after its instantiation by the Controller. It would typically be passed the data from
    // the Model also, though in this particular case, we do not need that data
    render: function() {

        // Nest the <input> field and <button> tag within the <form> tag
        this.form.appendChild(this.input);
        this.form.appendChild(this.button);

        // Add the <form> to the end of the current HTML page
        document.body.appendChild(this.form);

        // Connect up any events to the DOM elements represented in this View
        this.bindEvents();
    },

    // Define a method for connecting this View to system-wide events
    bindEvents: function() {
        var that = this;

        // When the form represented by this View is submitted, publish a system-wide event
        // indicating that a new email address has been added via the UI, passing across this
        // new email address value
        this.form.addEventListener("submit", function(evt) {

            // Prevent the default behavior of the submit action on the form (to prevent the
            // page refreshing)
            evt.preventDefault();

            // Broadcast a system-wide event indicating that a new email address has been
            // added via the form represented by this View. The Controller will be listening
            // for this event and will interact with the Model on behalf of the View to
            // add the data to the list of stored addresses
            observer.publish("view.email-view.add", that.input.value);
        }, false);

        // Hook into the event triggered by the Model that tells us that a new email address
        // has been added in the system, clearing the text in the <input> field when this
        // occurs
        observer.subscribe("model.email-address.added", function() {
            that.clearInputField();
        });
    },

    // Define a method for emptying the text value in the <input> field, called whenever an
    // email address is added to the Model
    clearInputField: function() {
        this.input.value = "";
    }
};

// Define a second View, representing a list of email addresses in the system. Each item in
// the list is displayed with a "Remove" button beside it to allow its associated address to
// be removed from the list of stored addresses
function EmailListView() {

    // Create DOM elements for <ul>, <li>, <span> and <button> tags
    this.list = document.createElement("ul");
    this.listItem = document.createElement("li");
    this.listItemText = document.createElement("span");
    this.listItemRemoveButton = document.createElement("button");

    // Give the <button> tag the display text "Remove"
    this.listItemRemoveButton.innerHTML = "Remove";
}

EmailListView.prototype = {

    // Define the render() method for this View, which takes the provided Model data and
    // renders a list, with a list item for each email address stored in the Model
    render: function(modelData) {
        var index = 0,
            length = modelData.length,
            email;

        // Loop through the array of Model data containing the list of stored email addresses
        // and create a list item for each, appending it to the list
        for (; index < length; index++) {
            email = modelData[index];

            this.list.appendChild(this.createListItem(email));
        }

        // Append the list to the end of the current HTML page
        document.body.appendChild(this.list);

        // Connect this View up to the system-wide events
        this.bindEvents();
    },

    // Define a method which, given an email address, creates and returns a populated list
    // item <li> tag representing that email
    createListItem: function(email) {

        // Cloning the existing, configured DOM elements is more efficient than creating new
        // ones from scratch each time
        var listItem = this.listItem.cloneNode(false),
            listItemText = this.listItemText.cloneNode(false),
            listItemRemoveButton = this.listItemRemoveButton.cloneNode(true);

        // Assign a "data-email" attribute to the <li> element, populated with the email
        // address it represents - this simplifies the attempt to locate the list item
        // associated with a particular email address in the removeEmail() method later
        listItem.setAttribute("data-email", email);
        listItemRemoveButton.setAttribute("data-email", email);

        // Display the email address within the <span> element, and append this, together with
        // the "Remove" button, to the list item element
        listItemText.innerHTML = email;
        listItem.appendChild(listItemText).appendChild(listItemRemoveButton);

        // Return the new list item to the calling function
        return listItem;
    },

    // Define a method for connecting this View to system-wide events
    bindEvents: function() {
        var that = this;

        // Create an event delegate on the list itself to handle clicks of the <button> within
        this.list.addEventListener("click", function(evt) {
            if (evt.target && evt.target.tagName === "BUTTON") {

                // When the <button> is clicked, broadcast a system-wide event which will be
                // picked up by the Controller. Pass the email address associated with the
                // <button> to the event
                observer.publish("view.email-view.remove", evt.target.getAttribute("data-email"));
            }
        }, false);

        // Listen for the event fired by the Model indicating that a new email address has
        // been added, and execute the addEmail() method
        observer.subscribe("model.email-address.added", function(email) {
            that.addEmail(email);
        });

        // Listen for the event fired by the Model indicating that an email address has been
        // removed, and execute the removeEmail() method
        observer.subscribe("model.email-address.removed", function(email) {
            that.removeEmail(email);
        });
    },

    // Define a method, called when an email address is added to the Model, which inserts a
    // new list item to the top of the list represented by this View
    addEmail: function(email) {
        this.list.insertBefore(this.createListItem(email), this.list.firstChild);
    },

    // Define a method, called when an email address is removed from the Model, which removes
    // the associated list item from the list represented by this View
    removeEmail: function(email) {
        var listItems = this.list.getElementsByTagName("li"),
            index = 0,
            length = listItems.length;

        // Loop through all the list items, locating the one representing the provided email
        // address, and removing it once found
        for (; index < length; index++) {
            if (listItems[index].getAttribute("data-email") === email) {
                this.list.removeChild(listItems[index]);

                // Once we've removed the email address, stop the for loop from executing
                break;
            }
        }
    }
};

// Define a generic View which can contain child Views. When its render() method is called, it
// calls the render() methods of its child Views in turn, passing along any Model data
// provided upon instantiation
function EmailView(views) {
    this.views = views || [];
}

EmailView.prototype = {

    // All Views need to have a render() method - in the case of this generic View, it simply
    // executes the render() method of each of its child Views
    render: function(modelData) {
        var index = 0,
            length = this.views.length;

        // Loop through the child views, executing their render() methods, passing along any
        // Model data provided upon instantiation
        for (; index < length; index++) {
            this.views[index].render(modelData);
        }
    }
};