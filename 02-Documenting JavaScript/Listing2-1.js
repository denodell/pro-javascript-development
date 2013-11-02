var Accommodation = Class.create({
    isLocked: true,
    isAlarmed: true,
    lock: function() {
        this.isLocked = true;
    },
    unlock: function() {
        this.isLocked = false;
    },
    initialize: function() {
        this.unlock();
    }
});