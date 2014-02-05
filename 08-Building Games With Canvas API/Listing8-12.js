var Turtles = (function() {
    var turtles = [
        new Turtle(-1), new Turtle(3), new Turtle(9),
        new Turtle2(1), new Turtle2(8)
    ];

    return {
        render: function() {
            var index = 0,
                length = turtles.length;

            for (; index < length; index++) {
                turtles[index].render();
            }
        },

        isCollision: function(frogPosition, frogDimensions) {
            var isCollision = false;

            var index = 0,
                length = turtles.length;

            for (; index < length; index++) {
                if (turtles[index].isCollision(frogPosition, frogDimensions)) {
                    isCollision = true;
                    break;
                }
            }

            return isCollision;
        }
    };
}());