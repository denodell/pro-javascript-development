/**
 * Accommodation-related "classes"
 *
 * @module Accommodation-related
 */

/**
 * A "class" defining types of accommodation
 *
 * @class Accommodation
 * @constructor
 * @example
 *     var myAccommodation = new Accommodation();
 */

var Accommodation = Class.create((function() {

    /**
     * Denotes whether the accommodation is currently locked
     *
     * @property {Boolean} _isLocked
     * @protected
     */

    var _isLocked = true,
        publicPropertiesAndMethods = {

            /**
             * Locks the accommodation
             *
             * @method lock
             * @example
             *     var myAccommodation = new Accommodation();
             *     myAccommodation.lock();
             */

            lock: function() {
                _isLocked = true;
            },

            /**
             * Unlocks the accommodation
             *
             * @method unlock
             * @example
             *     var myAccommodation = new Accommodation();
             *     myAccommodation.unlock();
             */

            unlock: function() {
                _isLocked = false;
            },

            /**
             * Establishes whether the accommodation is currently locked or not
             *
             * @method getIsLocked
             * @return {Boolean} Value indicating lock status—'true' means locked
             * @example
             *     var myAccommodation = new Accommodation();
             *     myAccommodation.getIsLocked(); // false
             *
             * @example
             *     var myAccommodation = new Accommodation();
             *     myAccommodation.lock();
             *     myAccommodation.getIsLocked(); // true
             */

            getIsLocked: function() {
                return _isLocked;
            },

            /**
             * Executed automatically upon creation of an object instance of this "class".
             * Unlocks the accommodation.
             *
             * @method initialize
             */

            initialize: function() {
                this.unlock();
            }
        };

    return publicPropertiesAndMethods;
}()));

/**
 * "Class" representing a house, a specific type of accommodation
 *
 * @class House
 * @constructor
 * @extends Accommodation
 * @example
 *     var myHouse = new House();
 */

var House = Accommodation.extend({

    /**
     * Indicates whether the house is alarmed or not—'true' means alarmed
     *
     * @property {Boolean} isAlarmed
     */

    isAlarmed: false,

    /**
     * Activates the house alarm
     *
     * @method alarm
     */

    alarm: function() {
        this.isAlarmed = true;
        alert("Alarm activated!");
    },

    /**
     * Locks the house and activates the alarm
     *
     * @method lock
     */

    lock: function() {
        Accommodation.prototype.lock.call(this);
        this.alarm();
    }
});