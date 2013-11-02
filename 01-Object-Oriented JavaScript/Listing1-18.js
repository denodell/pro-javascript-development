// We wrap our "class" definition code in a self-executing function which returns the "class" we
// create and places it into a variable for use throughout the rest of our code.
var Accommodation = (function() {

    // Create our constructor function for our "class". Since we are inside a new function, we
    // have a new scope, therefore we can use the same name as the variable we are returning
    // our "class" to, for use in the rest of our code
    function Accommodation() {}

    // Any variable defined here is considered ‘private’, it isn’t available outside this scope
    // We can denote it as such by prefixing its name with an underscore.
    var _isLocked = false,
        _isAlarmed = false,
        _alarmMessage = "Alarm activated!";

    // Any function defined in this scope only (not on the prototype of the constructor
    // function), is considered ‘private’ also
    function _alarm() {
        _isAlarmed = true;
        alert(_alarmMessage);
    }

    function _disableAlarm() {
        _isAlarmed = false;
    }

    // Any method placed on the prototype is going to be ‘public’, accessible outside this scope
    // once the "class" is returned later on in this closure
    Accommodation.prototype.lock = function() {
        _isLocked = true;
        _alarm();
    };

    Accommodation.prototype.unlock = function() {
        _isLocked = false;
        _disableAlarm();
    };

    // Create a ‘getter’ function to allow public read-only access to the value inside the
    // private variable ‘isLocked’ – effectively making this variable ‘protected’
    Accommodation.prototype.getIsLocked = function() {
        return _isLocked;
    };

    // Create a ‘setter’ function to allow public write-only access to the ‘_alarmMessage’
    // private variable – effectively making it ‘protected’
    Accommodation.prototype.setAlarmMessage = function(message) {
        _alarmMessage = message;
    };

    // Return the "class" we created in this scope to make it available to the surrounding scope
    // and hence the rest of our code. Only the public properties and methods will be available
    return Accommodation;
}());

// Create an object instance
var house = new Accommodation();
house.lock();        // Alerts “Alarm activated”

house._alarm();       // error! The ‘_alarm’ function was never exposed publicly so it’s not
                     //  available directly to any object instance created from the "class"

alert(house._isLocked);// undefined (‘_isLocked’ is private and cannot be accessed outside
                      //  the closure)

house.getIsLocked(); // true (returns the value of the ‘_isLocked’ variable, but doesn’t allow
                     //  direct access to it, so it’s a read-only value)

house.setAlarmMessage("The alarm is now activated!");
house.lock();        // Alerts "The alarm is now activated"