// The Presenter "class" is created in much the same was as the Controller in the MVC pattern.
// Uses the observer pattern methods from Listing 7-6.
function EmailPresenter(model, view) {
    this.model = model;
    this.view = view;
}

EmailPresenter.prototype = {

    // The initialize() method is the same as it was for the Controller in the MVC pattern
    initialize: function() {
        var modelData = this.model.getAll();

        this.view.render(modelData);
        this.bindEvents();
    },

    // The difference is in the bindEvents() method, where we connect the events triggered from
    // the Model through to the View, and vice versa - no longer can the Model directly update
    // the View without intervention. This clarifies the distinction between the Model and View,
    // making the separation clearer, and giving developers a better idea where to look should
    // problems occur connecting the data to the user interface
    bindEvents: function() {
        var that = this;

        // When the View triggers the "add" event, execute the add() method of the Model
        observer.subscribe("view.email-view.add", function(email) {
            that.model.add(email);
        });

        // When the View triggers the "remove" event, execute the remove() method of the Model
        observer.subscribe("view.email-view.remove", function(email) {
            that.model.remove(email);
        });

        // When the Model triggers the "added" event, execute the addEmail() method of the View
        observer.subscribe("model.email-address.added", function(email) {

            // Tell the View that the email address has changed. We will need to ensure this
            // method is available on any View passed to the Presenter on instantiation, which
            // includes generic Views that contain child Views
            that.view.addEmail(email);
        });

        // When the Model triggers the "removed" event, execute the removeEmail() method of
        // the View
        observer.subscribe("model.email-address.removed", function(email) {
            that.view.removeEmail(email);
        });
    }
};