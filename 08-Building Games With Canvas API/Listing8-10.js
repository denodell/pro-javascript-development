var Logs = (function() {
    var logs = [
        new MediumLog(1), new MediumLog(7), new MediumLog(13),
        new LongLog(2), new LongLog(10),
        new ShortLog(1), new ShortLog(6), new ShortLog(11)
    ];

    return {
        render: function() {
            var index = 0,
                length = logs.length;

            for (; index < length; index++) {
                logs[index].render();
            }
        },

        pause: function() {
            var index = 0,
                length = logs.length;

            for (; index < length; index++) {
                logs[index].pause();
            }
        },

        isCollision: function(frogPosition, frogDimensions) {
            var index = 0,
                length = logs.length,
                isCollision = false;

            for (; index < length; index++) {
                if (logs[index].isCollision(frogPosition, frogDimensions)) {
                    isCollision = true;
                    break;
                }
            }

            return isCollision;
        },

        getLogAtPosition: function(frogPosition, frogDimensions) {
            var index = 0,
                length = logs.length;

            for (; index < length; index++) {
                if (logs[index].isCollision(frogPosition, frogDimensions)) {
                    break;
                }
            }

            return logs[index];
        },

        reset: function() {
            var index = 0,
                length = logs.length;

            for (; index < length; index++) {
                logs[index].reset();
            }
        }
    };
}());