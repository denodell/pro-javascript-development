// Create a singleton for allowing execution of other methods and providing the ability to
// 'undo' the actions of those methods
var command = (function() {

    // Create an array to store the 'undo' commands in order, also known as a 'stack'
    var undoStack = [];

    return {

        // Define a method to execute a supplied function parameter, storing a second function
        // parameter for later execution to 'undo' the action of the first function
        execute: function(command, undoCommand) {
            if (command && typeof command === "function") {

                // If the first parameter is a function, execute it, and add the second
                // parameter to the stack in case the command needs to be reversed at some point
                // in future
                command();
                undoStack.push(undoCommand);
            }
        },

        // Define a method to reverse the execution of the last command executed, using the
        // stack of 'undo' commands
        undo: function() {

            // Remove and store the last command from the stack, which will be the one most
            // recently added to it. This will remove that command from the stack, reducing the
            // size of the array
            var undoCommand = undoStack.pop();
            if (undoCommand && typeof undoCommand === "function") {

                // Check the command is a valid function and then execute it to effectively
                // 'undo' the last command
                undoCommand();
            }
        }
    };
}());

// Wrap each piece of functionality that can be 'undone' in a call to the command.execute()
// method, passing the command to execute immediately as the first parameter, and the function
// to execute to reverse that command as the second parameter which will be stored until such
// point as it is needed
command.execute(function() {

    // Using the code from Listing 7-2, set a cookie - this will be executed immediately
    cookie.execute("set", ["name", "Den Odell"]);
}, function() {

    // The reverse operation of setting a cookie is removing that cookie - this operation will
    // be stored for later execution if the command.undo() method is called
    cookie.execute("remove", ["name"]);
});

// Execute a second piece of functionality, setting a second cookie
command.execute(function() {
    cookie.execute("set", ["company", "AKQA"]);
}, function() {
    cookie.execute("remove", ["company"]);
});

// Check the value of the two cookies
alert(cookie.get("name")); // Den Odell
alert(cookie.get("company")); // AKQA

// Reverse the previous operation, removing the 'company' cookie
command.undo();

// Check the value of the two cookies
alert(cookie.get("name")); // Den Odell
alert(cookie.get("company")); // "" (an empty string), since the cookie has now been removed

// Reverse the first operation, removing the 'name' cookie
command.undo();

// Check the value of the two cookies
alert(cookie.get("name")); // "", since the cookie has now been removed
alert(cookie.get("company")); // ""