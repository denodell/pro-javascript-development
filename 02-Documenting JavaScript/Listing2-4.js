/**
 * A "class" defining types of accommodation
 *
 * @class Accommodation
 * @constructor
 */

var Accommodation = (function() {
    function Accommodation() {}

    /**
     * Denotes whether the property is currently locked
     *
     * @property {Boolean} _isLocked
     * @protected
     */

    var _isLocked = false,

        /**
         * Denotes whether the property is currently alarmed
         *
         * @property {Boolean} _isAlarmed
         * @private
         */

        _isAlarmed = false,

        /**
         * Message to display when the alarm is activated
         *
         * @property {String} _alarmMessage
         * @protected
         */

        _alarmMessage = "Alarm activated!";

    /**
     * Activates the alarm
     *
     * @method _alarm
     * @private
     */

    function _alarm() {
        _isAlarmed = true;
        alert(_alarmMessage);
    }

    /**
     * Disables the alarm
     *
     * @method _disableAlarm
     * @private
     */

    function _disableAlarm() {
        _isAlarmed = false;
    }

    /**
     * Locks the accommodation
     *
     * @method lock
     */

    Accommodation.prototype.lock = function() {
        _isLocked = true;
        _alarm();
    };

    /**
     * Unlocks the accommodation
     *
     * @method unlock
     */

    Accommodation.prototype.unlock = function() {
        _isLocked = false;
        _disableAlarm();
    };

    /**
     * Returns the current lock state of the accommodation
     *
     * @method getIsLocked
     * @return {Boolean} Indicates lock state, ‘true’ indicates that the accommodation is locked
     */

    Accommodation.prototype.getIsLocked = function() {
        return _isLocked;
    };

    /**
     * Sets a new alarm message to be displayed when the accommodation is locked
     *
     * @method setAlarmMessage
     * @param {String} message The new alarm message text
     */

    Accommodation.prototype.setAlarmMessage = function(message) {
        _alarmMessage = message;
    };

    return Accommodation;
}());