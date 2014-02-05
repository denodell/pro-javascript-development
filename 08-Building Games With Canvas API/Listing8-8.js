var Cars = (function() {
    var vehicles = [
        new Truck(1), new Truck(7),
        new RacingCarType2(1), new RacingCarType2(7),
        new RoadCar(1), new RoadCar(7),
        new Bulldozer(1), new Bulldozer(5), new Bulldozer(9),
        new RacingCar(1), new RacingCar(5), new RacingCar(9)
    ];

    return {
        render: function() {
            var index = 0,
                length = vehicles.length;

            for (; index < length; index++) {
                vehicles[index].render();
            }
        },

        pause: function() {
            var index = 0,
                length = vehicles.length;

            for (; index < length; index++) {
                vehicles[index].pause();
            }
        },

        isCollision: function(frogPosition, frogDimensions) {
            var index = 0,
                length = vehicles.length,
                isCollision = false;

            for (; index < length; index++) {
                if (vehicles[index].isCollision(frogPosition, frogDimensions)) {
                    isCollision = true;
                    break;
                }
            }

            return isCollision;
        },

        reset: function() {
            var index = 0,
                length = vehicles.length;

            for (; index < length; index++) {
                vehicles[index].reset();
            }
        }
    };
}());