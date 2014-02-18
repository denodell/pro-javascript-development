function Row(options) {
    options = options || {};

    this.direction = options.direction || Frogger.direction.LEFT;
    this.obstacles = options.obstacles || [];
    this.row = options.row || 0;
    this.speed = options.speed || 1;
}

Row.prototype = {
    render: function() {
        var index = 0,
            length = this.obstacles.length,
            left,
            obstaclesItem;

        for (; index < length; index++) {
            obstaclesItem = this.obstacles[index];
            left = obstaclesItem.getPosition().left + ((this.direction === Frogger.direction.RIGHT ? 1 : -1) * this.speed);
            if (left < -obstaclesItem.getWidth()) {
                left = canvas.width;
            } else if (left >= canvas.width) {
                left = -obstaclesItem.getWidth();
            }

            obstaclesItem.moveTo(left);
            obstaclesItem.renderAt(left, GameBoard.getRowPosition(this.row));
        }
    },

    getRow: function() {
        return this.row;
    },

    isCollision: function(characterPosition) {
        var index = 0,
            length = this.obstacles.length,
            obstaclesItem,
            isCollision = false;

        for (; index < length; index++) {
            obstaclesItem = this.obstacles[index];

            if (GameBoard.intersects(obstaclesItem.getPosition(), characterPosition)) {
                isCollision = true;
            }
        }

        return isCollision;
    },

    reset: function() {
        var index = 0,
            length = this.obstacles.length;

        for (; index < length; index++) {
            this.obstacles[index].reset();
        }
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
LogRow.prototype.isCollision = function(characterPosition) {
    return !Row.prototype.isCollision.call(this, characterPosition);
};
LogRow.prototype.render = function() {
    if (Character.getRow() === this.getRow()) {
        Character.setPosition(Character.getPosition().left + ((this.direction === Frogger.direction.RIGHT ? 1 : -1) * this.speed));
    }
    Row.prototype.render.call(this);

};

function TurtleRow(options) {
    LogRow.call(this, options);
}
TurtleRow.prototype = new LogRow();
TurtleRow.prototype.constructor = TurtleRow;
TurtleRow.prototype.isCollision = function(characterPosition) {
    var isCollision = LogRow.prototype.isCollision.call(this, characterPosition);
    return this.obstacles[0].isUnderwater() || isCollision;
};

function HomeRow(options) {
    options.speed = 0;
    Row.call(this, options);
}
HomeRow.prototype = new Row();
HomeRow.prototype.constructor = HomeRow;

HomeRow.prototype.isCollision = function(characterPosition) {
    var index = 0,
        length = this.obstacles.length,
        obstaclesItem,
        isCollision = true;

    for (; index < length; index++) {
        obstaclesItem = this.obstacles[index];

        if (!obstaclesItem.hasFrog && GameBoard.intersects(obstaclesItem.getPosition(), characterPosition)) {
            this.obstacles[index].hasFrog = true;
            this.obstacles.push(new HomeFrog(obstaclesItem.getPosition().left));
            Frogger.observer.publish("player-at-goal");
            isCollision = false;
        }
    }

    return isCollision;
};
