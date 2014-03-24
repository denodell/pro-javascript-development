// Define a ViewModel for the email system which connects up a static View to the data stored in
// a Model. It parses the View for specific HTML5 data attributes and uses these as instructions
// to affect the behavior of the system. Provided the ViewModel is expecting the specific data
// attributes included in the View, the system will work as expected. The more generic the
// ViewModel, therefore, the more variation is possible in the View without needing to update
// thes code here. Uses the observer pattern methods from Listing 7-6.
function EmailViewModel(model, view) {
    var that = this;

    this.model = model;
    this.view = view;

    // Define the methods we wish to make available to the View for selection via HTML5 data
    // attributes
    this.methods = {

        // The addEmail() method will add a supplied email address to the Model, which in turn
        // will broadcast an event indicating that the Model has updated
        addEmail: function(email) {
            that.model.add(email);
        },

        // The removeEmail() method will remove a supplied email address from the Model, which
        // in turn will broadcast an event indicating that the Model has updated
        removeEmail: function(email) {
            that.model.remove(email);
        }
    };
}

// Define the method to initialize the connection between the Model and the View
EmailViewModel.prototype.initialize = function() {

    // Locate the <ul data-loop> element which will be used as the root element for looping
    // through the email addresses stored in the Model and displaying each using a copy of the
    // <li> tag located beneath it in the DOM tree
    this.listElement = this.view.querySelectorAll("[data-loop]")[0];

    // Store the <li> tag beneath the <ul data-loop> element
    this.listItemElement = this.listElement.getElementsByTagName("li")[0];

    // Connect the <form data-submit> in the View to the Model
    this.bindForm();

    // Connect the <ul data-loop> in the View to the Model
    this.bindList();

    // Connect the events broadcast by the Model to the View
    this.bindEvents();
};

// Define a method to configure the <form data-submit> in the View
EmailViewModel.prototype.bindForm = function() {
    var that = this,

        // Locate the <form data-submit> tag
        form = this.view.querySelectorAll("[data-submit]")[0],

        // Get the method name stored in the "data-submit" HTML5 attribute value
        formSubmitMethod = form.getAttribute("data-submit");

    // Create an event listener to execute the method by the given name when the <form> is
    // submitted
    form.addEventListener("submit", function(evt) {

        // Ensure the default <form> tag behavior does not run and the page does not refresh
        evt.preventDefault();

        // Grab the email address entered in the <input> field within the <form>
        var email = form.getElementsByTagName("input")[0].value;

        // Locate the given method in the ViewModel's "methods" property and execute it,
        // passing in the email address entered in the <form>
        if (that.methods[formSubmitMethod] && typeof that.methods[formSubmitMethod] === "function") {
            that.methods[formSubmitMethod](email);
        }
    });
};

// Define a method to construct the list of email addresses from the data stored in the Model.
// This method is later connected to the events triggered by the Model such that the list is
// recreated each time the data in the Model changes
EmailViewModel.prototype.bindList = function() {

    // Get the latest data from the Model
    var data = this.model.getAll(),
        index = 0,
        length = data.length,
        that = this;

    // Define a function to create an event handler function based on a given email address,
    // which executes the method name stored in the "data-click" HTML5 data attribute when the
    // <button> tag containing that attribute is clicked, passing across the email address
    function makeClickFunction(email) {
        return function(evt) {

            // Locate the method name stored in the HTML5 "data-click" attribute
            var methodName = evt.target.getAttribute("data-click");

            // Locate the given method in the ViewModel's "methods" property and execute it,
            // passing in the email address provided
            if (that.methods[methodName] && typeof that.methods[methodName] === "function") {
                that.methods[methodName](email);
            }
        };
    }

    // Empty the contents of the <ul data-loop> element, removing all previously created <li>
    // elements within it
    this.listElement.innerHTML = "";

    // Loop through the email addresses stored in the Model, creating <li> tags for each
    // based on the structure from the original state of the View which we stored previously
    for (; index < length; index++) {
        email = data[index];

        // Create a new <li> tag as a clone of the stored tag
        newListItem = this.listItemElement.cloneNode(true);

        // Locate the <span data-text> element and populate it with the email address
        newListItem.querySelectorAll("[data-text]")[0].innerHTML = email;

        // Locate the <button data-click> element and execute the makeClickFunction() function
        // to create an event handler specific to the email address in this turn of the loop
        newListItem.querySelectorAll("[data-click]")[0].addEventListener("click", makeClickFunction(email), false);

        // Append the populated <li> tag to the <ul data-loop> element in the View
        this.listElement.appendChild(newListItem);
    }
};

// Define a method to clear the email address entered in the <input> field
EmailViewModel.prototype.clearInputField = function() {
    var textField = this.view.querySelectorAll("input[type=text]")[0];

    textField.value = "";
};

// The bindEvents() method connects the events broadcast by the Model to the View
EmailViewModel.prototype.bindEvents = function() {
    var that = this;

    // Define a function to execute whenever the data in the Model is updated
    function updateView() {

        // Recreate the list of email addresses from scratch
        that.bindList();

        // Clear any text entered in the <input> field
        that.clearInputField();
    }

    // Connect the updateView() function to the two events triggered by the Model
    observer.subscribe("model.email-address.added", updateView);
    observer.subscribe("model.email-address.removed", updateView);
};