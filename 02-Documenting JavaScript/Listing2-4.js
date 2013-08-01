/**
 * Accomodation-related classes
 *
 * @module Accomodation-related
 */

/**
 * A class defining types of accomodation
 *
 * @class Accomodation
 * @constructor
 * @example
 *     var myAccomodation = new Accomodation();
 */

var Accomodation = Class.create((function() {

    /**
     * Denotes whether the acommodation is currently locked
     *
     * @property {Boolean} isLocked
     * @protected
     */

    var isLocked = true,
        publicPropertiesAndMethods = {

            /**
             * Locks the accomodation
             *
             * @method lock
             * @example
             *     var myAccomodation = new Accomodation();
             *     myAccomodation.lock();
             */

            lock: function() {
                isLocked = true;
            },

            /**
             * Unlocks the accomodation
             *
             * @method unlock
             * @example
             *     var myAccomodation = new Accomodation();
             *     myAccomodation.unlock();
             */

            unlock: function() {
                isLocked = false;
            },

            /**
             * Establishes whether the accomodation is currently locked or not
             *
             * @method getIsLocked
             * @return {Boolean} Value indicating lock status - 'true' means locked
             * @example
             *     var myAccomodation = new Accomodation();
             *     myAccomodation.getIsLocked(); // false
             *
             * @example
             *     var myAccomodation = new Accomodation();
             *     myAccomodation.lock();
             *     myAccomodation.getIsLocked(); // true
             */

            getIsLocked: function() {
                return isLocked;
            },

            /**
             * Executed automatically upon creation of an object instance of this class.
             * Unlocks the accomodation.
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
 * Class representing a house, a specific type of accomodation
 *
 * @class House
 * @constructor
 * @extends Accomodation
 * @example
 *     var myHouse = new House();
 */

var House = Accomodation.extend({

    /**
     * Indicates whether the house is alarmed or not - 'true' means alarmed
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
    }

    /**
     * Locks the house and activates the alarm
     *
     * @method lock
     */

    lock: function() {
        Accomodation.prototype.lock.call(this);
        this.alarm();
    }
});