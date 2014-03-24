// The Model represents the data in the system. In this system, we wish to manage a list of
// email addresses on screen, allowing them to be added and removed from the displayed list. The
// Model here, therefore, represents the stored email addresses themselves. When addresses are
// added or removed, the Model broadcasts this fact using the observer pattern methods from
// Listing 7-6
//
// Define the Model as a "class" such that multiple object instances can be created if desired
function EmailModel(data) {

    // Create a storage array for email addresses, defaulting to an empty array if no addresses
    // are provided at instantiation
    this.emailAddresses = data || [];
}

EmailModel.prototype = {

    // Define a method which will add a new email address to the list of stored addresses
    add: function(email) {

        // Add the new email to the start of the array
        this.emailAddresses.unshift(email);

        // Broadcast an event to the system, indicating that a new email address has been
        // added, and passing across that new email address to any code module listening for
        // this event
        observer.publish("model.email-address.added", email);
    },

    // Define a method to remove an email address from the list of stored addresses
    remove: function(email) {
        var index = 0,
            length = this.emailAddresses.length;

        // Loop through the list of stored addresses, locating the provided email address
        for (; index < length; index++) {
            if (this.emailAddresses[index] === email) {

                // Once the email address is located, remove it from the list of stored email
                // addresses
                this.emailAddresses.splice(index, 1);

                // Broadcast an event to the system, indicating that an email address has been
                // removed from the list of stored addresses, passing across the email address
                // that was removed
                observer.publish("model.email-address.removed", email);

                // Break out of the for loop so as not to waste processor cycles now we've
                // found what we were looking for
                break;
            }
        }
    },

    // Define a method to return the entire list of stored email addresses
    getAll: function() {
        return this.emailAddresses;
    }
};