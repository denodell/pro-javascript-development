var Rows = (function() {
    var rows = [new HomeRow({
        row: 2,
        obstacles: [new HomeBase(33, 111), new HomeBase(237, 315), new HomeBase(441, 519), new HomeBase(645, 723), new HomeBase(849, 927)]
    }), new LogRow({
        row: 3,
        direction: Frogger.direction.RIGHT,
        speed: 5,
        obstacles: [new MediumLog(GameBoard.getColumnPosition(1)), new MediumLog(GameBoard.getColumnPosition(6)), new MediumLog(GameBoard.getColumnPosition(11))]
    }), new TurtleRow({
        row: 4,
        speed: 6,
        obstacles: [new TwoTurtles(GameBoard.getColumnPosition(0)), new TwoTurtles(GameBoard.getColumnPosition(3)), new TwoTurtles(GameBoard.getColumnPosition(6)), new TwoTurtles(GameBoard.getColumnPosition(9))]
    }), new LogRow({
        row: 5,
        direction: Frogger.direction.RIGHT,
        speed: 7,
        obstacles: [new LongLog(GameBoard.getColumnPosition(1)), new LongLog(GameBoard.getColumnPosition(10))]
    }), new LogRow({
        row: 6,
        direction: Frogger.direction.RIGHT,
        speed: 3,
        obstacles: [new ShortLog(GameBoard.getColumnPosition(1)), new ShortLog(GameBoard.getColumnPosition(6)), new ShortLog(GameBoard.getColumnPosition(11))]
    }), new TurtleRow({
        row: 7,
        speed: 5,
        obstacles: [new ThreeTurtles(GameBoard.getColumnPosition(0)), new ThreeTurtles(GameBoard.getColumnPosition(3.5)), new ThreeTurtles(GameBoard.getColumnPosition(7)), new ThreeTurtles(GameBoard.getColumnPosition(10.5))]
    }), new RoadRow({
        row: 9,
        speed: 3,
        obstacles: [new Truck(GameBoard.getColumnPosition(1)), new Truck(GameBoard.getColumnPosition(7))]
    }), new RoadRow({
        row: 10,
        direction: Frogger.direction.RIGHT,
        speed: 12,
        obstacles: [new RaceCarTurbo(GameBoard.getColumnPosition(1)), new RaceCarTurbo(GameBoard.getColumnPosition(7))]
    }), new RoadRow({
        row: 11,
        speed: 4,
        obstacles: [new RoadCar(GameBoard.getColumnPosition(1)), new RoadCar(GameBoard.getColumnPosition(7))]
    }), new RoadRow({
        row: 12,
        direction: Frogger.direction.RIGHT,
        speed: 3,
        obstacles: [new Bulldozer(GameBoard.getColumnPosition(1)), new Bulldozer(GameBoard.getColumnPosition(7))]
    }), new RoadRow({
        row: 13,
        speed: 4,
        obstacles: [new RaceCar(GameBoard.getColumnPosition(2)), new RaceCar(GameBoard.getColumnPosition(6))]
    })];

    function render() {
        for (var index = 0, length = rows.length; index < length; index++) {
            var row = rows[index];
            row.render();
        }
    }

    function isCollision() {
        var collided = false;

        for (var index = 0, length = rows.length; index < length; index++) {
            var row = rows[index];
            if (Character.getRow() === row.getRow()) {
                collided = row.isCollision(Character.getPosition());
                if (collided) {
                    break;
                }
            }
        }

        if (collided) {
            Frogger.observer.publish("collision");
        }

        return collided;
    }

    function reset() {
        for (var index = 0, length = rows.length; index < length; index++) {
            var row = rows[index];
            row.reset();
        }
    }

    Frogger.observer.subscribe("reset", reset);
    Frogger.observer.subscribe("render-base-layer", render);
    Frogger.observer.subscribe("check-collisions", isCollision);
}());