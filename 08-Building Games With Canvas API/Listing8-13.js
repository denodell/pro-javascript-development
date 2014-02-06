var Rows = (function() {
    var rows = [new HomeRow({
        row: 2,
        traffic: [new HomeBase(0.5, 1,5), new HomeBase(3, 4), new HomeBase(5.5, 6,5), new HomeBase(8, 9), new HomeBase(10.5, 11,5)]
    }), new TurtleRow({
        row: 3,
        speed: 5,
        traffic: [new Turtle2(1), new Turtle2(7)]
    }), new TurtleRow({
        row: 6,
        speed: 5,
        traffic: [new Turtle(1), new Turtle(7)]
    }), new LogRow({
        row: 4,
        direction: direction.RIGHT,
        speed: 6,
        traffic: [new ShortLog(1), new ShortLog(6), new ShortLog(11)]
    }), new LogRow({
        row: 5,
        direction: direction.RIGHT,
        speed: 4,
        traffic: [new LongLog(1), new LongLog(7)]
    }), new LogRow({
        row: 7,
        direction: direction.RIGHT,
        speed: 5,
        traffic: [new MediumLog(1), new MediumLog(7)]
    }), new RoadRow({
        row: 9,
        speed: 6,
        traffic: [new Truck(1), new Truck(7)]
    }), new RoadRow({
        row: 10,
        direction: direction.RIGHT,
        speed: 5,
        traffic: [new RacingCarType2(1), new RacingCarType2(7)]
    }), new RoadRow({
        row: 11,
        speed: 4,
        traffic: [new RoadCar(1), new RoadCar(7)]
    }), new RoadRow({
        row: 12,
        direction: direction.RIGHT,
        speed: 3,
        traffic: [new Bulldozer(1), new Bulldozer(7)]
    }), new RoadRow({
        row: 13,
        speed: 2,
        traffic: [new RacingCar(2), new RacingCar(6)]
    })];

    return {
        render: function() {
            for (var index = 0, length = rows.length; index < length; index++) {
                var row = rows[index];
                row.render();
            }
        },

        isCollision: function() {
            var isCollision = false;

            for (var index = 0, length = rows.length; index < length; index++) {
                var row = rows[index];
                if (Frog.getRow() === row.getRow()) {
                    isCollision = row.isCollision(Frog.getPosition());
                    if (isCollision) {
                        break;
                    }
                }
            }

            return isCollision;
        },

        pause: function() {
            for (var index = 0, length = rows.length; index < length; index++) {
                var row = rows[index];
                row.pause();
            }
        },

        reset: function() {
            for (var index = 0, length = rows.length; index < length; index++) {
                var row = rows[index];
                row.reset();
            }
        }
    };
}());