/**
 * A "class" defining types of accommodation
 *
 * @class Accommodation
 * @constructor
 */

var Accommodation = Class.create({

    /**
     * Denotes whether the acommodation is currently locked
     *
     * @property {Boolean} isLocked
     */

    isLocked: true,

    /**
     * Denotes whether the acommodation is currently alarmed - thieves beware!
     *
     * @property {Boolean} isAlarmed
     */

    isAlarmed: true,

    /**
     * Locks the accommodation
     *
     * @method lock
     */

    lock: function() {
        this.isLocked = true;
    },

    /**
     * Unlocks the accommodation
     *
     * @method unlock
     */

    unlock: function() {
        this.isLocked = false;
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
});