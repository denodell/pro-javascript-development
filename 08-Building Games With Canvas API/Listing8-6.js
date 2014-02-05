function MoverAndWrapper(options) {
    options = options || {};

    var that = this;

    this.options = {
        startRow: options.startRow || 0,
        startColumn: options.startColumn || 0,
        direction: options.direction || direction.LEFT,
        speed: options.speed || 1,
        spritePath: options.spritePath || "blank.gif",
        spriteWidth: options.spriteWidth || 80,
        spriteHeight: options.spriteHeight || 80,
        spritePosition: options.spritePosition || 0,
        spritePositionWidth: options.spritePositionWidth || 80
    };

    this.sprite = document.createElement("img");
    this.sprite.onload = function() {
        that.reset();
    };
    this.sprite.src = this.options.spritePath;
    this.reset();
}

MoverAndWrapper.prototype = {
    top: 0,
    left: 0,
    paused: false,

    reset: function() {
        this.paused = false;
        this.top = GameBoard.getRowPosition(this.options.startRow);
        this.left = GameBoard.getColumnPosition(this.options.startColumn);
    },

    pause: function() {
        this.paused = true;
    },

    renderAt: function(left, top) {
        context.drawImage(this.sprite, this.options.spritePosition * this.options.spritePositionWidth, 0, this.options.spriteWidth, this.options.spriteHeight, left, top, this.options.spriteWidth, this.options.spriteHeight);
    },

    moveTo: function(newLeftPosition) {
        this.left = newLeftPosition;
    },

    getWidth: function() {
        return this.options.spriteWidth;
    },

    getPosition: function() {
        return {
            left: this.left,
            right: this.left + this.options.spriteWidth
        };
    }
};