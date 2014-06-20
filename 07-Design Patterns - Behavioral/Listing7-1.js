// Define an object listing different levels of logging in a system - info, warn, and error –
// each indicating something more severe than the last
var LogLevel = {
        INFO: 'INFO',
        WARN: 'WARN',
        ERROR: 'ERROR'
    },
    log;

// Define a "class" to create appropriately formatted log messages for different logging levels
function LogFormatter(logLevel) {
    this.logLevel = logLevel;
}

LogFormatter.prototype = {

    // Define a property to store the successor to this object instance in the chain
    // of responsibility
    nextInChain: null,

    // Define a method to set the successor in the chain of responsibility
    setNextInChain: function(next) {
        this.nextInChain = next;
    },

    // Define a method to create an appropriately formatted log message based on the current
    // logging level
    createLogMessage: function(message, logLevel) {
        var returnValue;

        // If the logging level assigned to the current object instance is the same as that
        // passed in, then format the log message
        if (this.logLevel === logLevel) {

            // Format the log message as appropriate according to the logging level
            if (logLevel === LogLevel.ERROR) {
                returnValue = logLevel + ": " + message.toUpperCase();
            } else if (logLevel === LogLevel.WARN) {
                returnValue = logLevel + ": " + message;
            } else {
                returnValue = message;
            }

        // If the logging level assigned to the current object instance does not match that
        // passed in, then pass the message onto the next object instance in the chain
        // of responsibility
        } else if (this.nextInChain) {
            returnValue = this.nextInChain.createLogMessage(message, logLevel);
        }

        return returnValue;
    }
};

// Define a singleton we can use for storing and outputting logs in a system
log = (function() {

    // Define a storage array for log messages
    var logs = [],

        // Create object instances representing the three levels of logging - info, warn,
        // and error
        infoLogger = new LogFormatter(LogLevel.INFO),
        warnLogger = new LogFormatter(LogLevel.WARN),
        errorLogger = new LogFormatter(LogLevel.ERROR),

        // Set the 'error' logging level to be the first and highest level in our chain of
        // responsibility, which we'll store in the 'logger' variable
        logger = errorLogger;

    // Set the chain of responsibility hierarchy using the setNextInChain() method on each
    // object instance - we're assuming that the 'error' logging level is the most important and
    // is first in the chain

    // The next in the logging hierarchy after 'error' should be 'warn' as this is
    // less important
    errorLogger.setNextInChain(warnLogger);

    // The next in the chain after the 'warn' logging level should be 'info' as this is the
    // least important level
    warnLogger.setNextInChain(infoLogger);

    return {

        // Define a method for reading out the stored log messages
        getLogs: function() {
            return logs.join("\n");
        },

        // Define a method for formatting a log message appropriately according to its
        // logging level
        message: function(message, logLevel) {

            // We call the createLogMessage() method on the first object instance in our
            // hierarchy only, which in turn calls those further down the chain if it does not
            // handle the specified logging level itself. The message passes further down the
            // chain of responsibility until it reaches an object instance who can handle the
            // specific logging level
            var logMessage = logger.createLogMessage(message, logLevel);

            // Add the formatted log message to the storage array
            logs.push(logMessage);
        }
    };
}());

// Execute the message() method of the 'log' singleton, passing in a message and the logging
// level. The first object in the chain of responsibility handles the 'error' logging level, so
// the message is not passed down the chain of responsibility and is returned by the
// errorLogger object
log.message("Something vary bad happened", LogLevel.ERROR);

// This message is passed through the errorLogger object to the warnLogger object through the
// chain of responsibility since the errorLogger object is only told to handle messages with the
// 'error' logging level
log.message("Something bad happened", LogLevel.WARN);

// This message is passed through the errorLogger object to the warnLogger object, and onto the
// infoLogger object which is the one handling 'info' type log messages
log.message("Something happened", LogLevel.INFO);

// Output the stored logs
alert(log.getLogs());

// Outputs the following:
/*
ERROR: SOMETHING VERY BAD HAPPENED
WARN: Something bad happened
Something happened
*/