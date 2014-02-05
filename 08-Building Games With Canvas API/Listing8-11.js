function TurtleBase(options) {
    options = options || {};

    this.options = {
        startRow: options.startRow || 0,
        startColumn: options.startColumn || 0,
        spritePath: options.spritePath || "blank.gif",
        spriteWidth: options.spriteWidth || 0,
        spriteHeight: options.spriteHeight || 80,
        animationSequence: options.animationSequence || [0]
    };

    this.sprite = document.createElement("img");
    this.sprite.src = this.options.spritePath;

    this.reset();
}

TurtleBase.prototype = {
    sprite: null,
    refreshRate: 5,
    currentRefreshFrame: 0,
    currentFrameIndex: 0,
    top: 0,
    left: 0,

    reset: function() {
        this.top = GameBoard.getRowPosition(this.options.startRow);
        this.left = GameBoard.getColumnPosition(this.options.startColumn);
    },

    isUnderwater: function() {
        return this.currentFrameIndex === 3;
    },

    renderAt: function(left, top) {
        context.drawImage(this.sprite, this.options.animationSequence[this.currentFrameIndex] * this.options.spriteWidth, 0, this.options.spriteWidth, this.options.spriteHeight, left, top, this.options.spriteWidth, this.options.spriteHeight);
    },

    moveTo: function(left) {
        this.left = left;
    },

    getPosition: function() {
        return {
            left: this.left,
            right: this.left + this.options.spriteWidth
        };
    },

    getWidth: function() {
        return this.options.spriteWidth;
    }
};

function Turtle(startColumn) {
    TurtleBase.call(this, {
        spritePath: "turtle_2_sprites.png",
        startRow: 4,
        startColumn: startColumn,
        spriteWidth: 130,
        animationSequence: [0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 3, 3, 3, 2, 1, 0, 0, 0]
    });
}

Turtle.prototype = new TurtleBase();
Turtle.prototype.constructor = Turtle;

function Turtle2(startColumn) {
    TurtleBase.call(this, {
        spritePath: "turtle_3_sprites.png",
        startRow: 7,
        startColumn: startColumn,
        spriteWidth: 198,
        spriteHeight: 68,
        animationSequence: [0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4, 3, 2, 1, 0, 0, 0]
    });
}

Turtle2.prototype = new TurtleBase();
Turtle2.prototype.constructor = Turtle2;