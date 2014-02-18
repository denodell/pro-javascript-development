Frogger.ImageSprite = function(left, top) {
    this.startLeft = left || 0;
    this.startTop = top || 0;
    this.animations = {};
    this.reset();
};

Frogger.Animation = function(options) {
    this.sequence = options.sequence || [];
    this.rate = options.rate || 150;
    this.loop = options.loop || false;
    this.spriteLeft = options.spriteLeft || 0;
};

Frogger.Animation.prototype = {
    frame: 0,
    playing: false,
    timer: null,
    play: function() {
        var that = this;

        if (!this.playing) {
            this.playing = true;
            this.reset();
        }

        this.timer = setInterval(function() {
            that.incrementFrame();
        }, this.rate);
    },
    reset: function() {
        this.frame = 0;
    },
    incrementFrame: function() {
        if (this.playing) {
            this.frame++;
            if (this.frame === this.sequence.length - 1) {
                if (!this.loop) {
                    this.stop();
                } else {
                    this.reset();
                }
            }
        }
    },
    getSequenceValue: function() {
        return this.sequence[this.frame];
    },
    getSpriteLeft: function() {
        return this.spriteLeft;
    },
    stop: function() {
        clearInterval(this.timer);
        this.playing = false;
    }
};

Frogger.ImageSprite.prototype = {
    top: 0,
    left: 0,
    startLeft: 0,
    startTop: 0,
    sprite: (function() {
        var img = document.createElement("image");
        img.src = "spritemap.png";
        return img;
    }()),
    width: 80,
    height: 80,
    spriteTop: 0,
    spriteLeft: 0,
    animations: null,
    isHidden: false,
    currentAnimation: "",

    reset: function() {
        this.left = this.startLeft;
        this.top = this.startTop;
        this.resetAnimation();
        this.isHidden = false;
    },

    registerAnimation: function(animations) {
        var key,
            animation;

        for (key in animations) {
            animation = animations[key];

            this.animations[key] = new Frogger.Animation(animation);
        }
    },

    resetAnimation: function() {
        if (this.animations[this.currentAnimation]) {
            this.animations[this.currentAnimation].reset();
        }

        this.currentAnimation = "";
    },

    playAnimation: function(name) {
        this.currentAnimation = name;

        if (this.animations[this.currentAnimation]) {
            this.animations[this.currentAnimation].play();
        }
    },

    renderAt: function(left, top) {
        var animation = this.animations[this.currentAnimation],
            sequenceValue = animation ? animation.getSequenceValue() : 0,
            animationSpriteLeft = animation ? animation.getSpriteLeft() : 0,
            spriteLeft = this.spriteLeft + animationSpriteLeft + (this.width * sequenceValue);

        if (!this.isHidden) {
            Frogger.drawingSurface.drawImage(this.sprite, spriteLeft, this.spriteTop, this.width, this.height, left, top, this.width, this.height);
        }
    },

    moveTo: function(left, top) {
        this.left = left || 0;
        if (typeof top !== "undefined") {
            this.top = top || 0;
        }
    },

    getWidth: function() {
        return this.width;
    },

    getPosition: function() {
        return {
            left: this.left,
            right: this.left + this.width
        };
    },

    hide: function() {
        this.isHidden = true;
    }
};