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
    },

    pause: function() {

    },

    reset: function() {

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
    var index = 0,
        length = this.traffic.length,
        trafficItem,
        isCollision = true;

    for (; index < length; index++) {
        trafficItem = this.traffic[index];

        if (Utils.intersects(trafficItem.getPosition(), frogPosition)) {
            observer.publish("frog-at-home");
            isCollision = false;
        }
    }

    return isCollision;
};
