var Utils = (function() {
    return {
        intersects: function(position1, position2) {
            var intersects = false;

            if ((position1.left > position2.left && position1.left < position2.right) ||
                (position1.right > position2.left && position1.left < position2.right)) {
                intersects = true;
            }

            return intersects;
        }
    };
}());

function Row(options) {
    options = options || {};

    this.direction = options.direction || direction.LEFT;
    this.traffic = options.traffic || [];
    this.row = options.row || 0;
    this.speed = options.speed || 1;
}

Row.prototype = {
    render: function() {
        var index = 0,
            length = this.traffic.length,
            left,
            trafficItem;

        for (; index < length; index++) {
            trafficItem = this.traffic[index];
            left = trafficItem.getPosition().left + ((this.direction === direction.RIGHT ? 1 : -1) * this.speed);
            if (left < -trafficItem.getWidth()) {
                left = canvas.width;
            } else if (left >= canvas.width) {
                left = -trafficItem.getWidth();
            }

            trafficItem.moveTo(left);
            trafficItem.renderAt(left, GameBoard.getRowPosition(this.row));
        }
    },

    getRow: function() {
        return this.row;
    },

    isCollision: function(frogPosition) {
        var index = 0,
            length = this.traffic.length,
            trafficItem,
            isCollision = false;

        for (; index < length; index++) {
            trafficItem = this.traffic[index];

            if (Utils.intersects(trafficItem.getPosition(), frogPosition)) {
                isCollision = true;
            }
        }

        return isCollision;
    }
};

function RoadRow(options) {
    Row.call(this, options);
}
RoadRow.prototype = new Row();
RoadRow.prototype.constructor = RoadRow;

function LogRow(options) {
    Row.call(this, options);
}
LogRow.prototype = new Row();
LogRow.prototype.constructor = LogRow;
LogRow.prototype.isCollision = function(frogPosition) {
    return !Row.prototype.isCollision.call(this, frogPosition);
};
LogRow.prototype.render = function() {
    if (Frog.getRow() === this.getRow()) {
        Frog.setPosition(Frog.getLeft() + ((this.direction === direction.RIGHT ? 1 : -1) * this.speed));
    }
    Row.prototype.render.call(this);

};

function TurtleRow(options) {
    LogRow.call(this, options);
}
TurtleRow.prototype = new LogRow();
TurtleRow.prototype.constructor = TurtleRow;
TurtleRow.prototype.isCollision = function(frogPosition) {
    var isCollision = LogRow.prototype.isCollision.call(this, frogPosition);
    return this.traffic[0].isUnderwater() || isCollision;
};

function HomeRow(options) {
    options.speed = 0;
    Row.call(this, options);
}
HomeRow.prototype = new Row();
HomeRow.prototype.constructor = HomeRow;
HomeRow.prototype.isCollision = function(frogPosition) {
    if (frogPosition.left > canvas.width/2) {
        console.log("WIN!");
    }

    return false;
};

var Rows = (function() {
    var rows = [new HomeRow({
        row: 2
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
        speed: 5,
        traffic: [new ShortLog(1), new ShortLog(7)]
    }), new LogRow({
        row: 5,
        direction: direction.RIGHT,
        speed: 5,
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
        direction: direction.RIGHT,
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
        }
    };
}());