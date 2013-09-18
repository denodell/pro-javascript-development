/*jslint devel: true, white: true */
/*global Class: false */

var Accomodation = Class.create((function() {
    "use strict";

    var isLocked = true,
        publicPropertiesAndMethods = {
            lock: function() {
                isLocked = true;
            },
            unlock: function() {
                isLocked = false;
            },
            getIsLocked: function() {
                return isLocked;
            },
            initialize: function() {
                this.unlock();
            }
        };

    return publicPropertiesAndMethods;
}()));

var House = Accomodation.extend({
    isAlarmed: false,
    alarm: function() {
        "use strict";

        this.isAlarmed = true;
        alert("Alarm activated!");
    },
    lock: function() {
        "use strict";

        Accomodation.prototype.lock.call(this);
        this.alarm();
    }
});