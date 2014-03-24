// Define a "class" for creating images to place on the game board. All the individual
// images are stored together in a single large image file called a Sprite Map. By knowing
// the position within this sprite file of the image to display, together with its width
// and height, we can pull out the individual images for display. By only loading in a
// single image file we improve the loading performance of the game
Frogger.ImageSprite = function(startPositionLeft, startPositionTop) {

    // Each instance stores its starting position on the game board so it can later be
    // reset to its initial position if necessary
    this.startLeft = startPositionLeft || 0;
    this.startTop = startPositionTop || 0;

    // Initialize an object property to later store any animations for this image
    this.animations = {};

    // Set this image to its initial state for display
    this.reset();
};

// Define a "class" for assigning animations to an ImageSprite instance to allow any image
// on the game board to appear to animate. An animation is a sequence of images which will
// be displayed in order over a fixed time period to give the impression of movement
Frogger.Animation = function(options) {
    options = options || {};

    // Store the rate to move between the images in the animation sequence, in milliseconds
    // - defaults to a rate of 150 milliseconds
    this.rate = options.rate || 150;

    // Store a Boolean value to indicate whether this animation is to loop or play once
    this.loop = options.loop || false;

    // Store the supplied position in pixels from the left-hand side of the spite map image
    // where the first image in this animation sequence is located
    this.spriteLeft = options.spriteLeft || 0;

    // Store the animation sequence which indicates a multiple of the image with as an
    // offset from the spriteLeft value. A sequence value of [0, 1, 2] would indicate there
    // are three images in this animation sequence located at the position stored in the
    // spriteLeft property, that position + the width of the sprite image, and that
    // position + double the width of the sprite image, respectively. It is therefore
    // expected that an animation sequence of images are stored horizontally beside each
    // other in order within the sprite map image file
    this.sequence = options.sequence || [];
};

// Define and initialize properties and methods to be inherited by each instance of the
// Frogger.Animation "class"
Frogger.Animation.prototype = {

    // Define a value to indicate the current frame shown from the animation sequence.
    // As the sequence property is an Array, this is effectively an index within that Array
    frame: 0,

    // Define a property to indicate whether the animation is currently playing - that is
    // that the frame index of the animation sequence is being actively incremented at the
    // rate supplied at initiation time
    playing: false,

    // Define a property to store a timer indicator to start and stop the incrementing of
    // the frame index on demand
    timer: null,

    // Define a function to start playing the animation - essentially incrementing the
    // frame index on a timer at the rate supplied upon instantiation
    play: function() {
        var that = this;

        // If the animation is not currently playing, then reset it to its initial state
        if (!this.playing) {
            this.reset();
            this.playing = true;
        }

        // Increment the current frame index of the animation on a timer at a rate given
        // by the supplied value upon instantiation, storing a reference to the timer in
        // the timer property so that it can be stopped at a later time
        this.timer = setInterval(function() {
            that.incrementFrame();
        }, this.rate);
    },

    // Define a function to rewind the current frame index of the animation sequence back
    // to the start
    reset: function() {
        this.frame = 0;
    },

    // Define a function to increment the current frame index of the animation sequence
    incrementFrame: function() {

        // Only increment the current frame if the animation should be playing
        if (this.playing) {

            // Increment the current frame index of the animation sequence
            this.frame++;

            // If we have reached the end of the animation sequence, stop the animation if
            // it was not intended to loop, otherwise reset the current frame index of the
            // animation back to the start
            if (this.frame === this.sequence.length - 1) {
                if (!this.loop) {
                    this.stop();
                } else {
                    this.reset();
                }
            }
        }
    },

    // Define a function to return the value stored in the animation sequence at the
    // current frame index. This value will be used later on to correctly identify which
    // individual image from the large sprite map to display within the <canvas> element
    getSequenceValue: function() {
        return this.sequence[this.frame];
    },

    // Define a function to return the number of pixels from the left-hand edge of the
    // sprite map of the first frame of this animation. This is used in conjunction with
    // the current value of the animation sequence and the image width to decide which
    // image to display within the <canvas> element
    getSpriteLeft: function() {
        return this.spriteLeft;
    },

    // Define a function to stop the timer from incrementing the current frame index, and
    // hence stop the animation from playing
    stop: function() {

        // Terminate the timer
        clearInterval(this.timer);

        // Indicate that the animation is no longer playing
        this.playing = false;
    }
};

// Define and initialize properties and methods to be inherited by each instance of the
// Frogger.ImageSprite "class" to enable individual images from a larger sprite map to be
// drawn onto the <canvas> element
Frogger.ImageSprite.prototype = {

    // Define properties to store the current position in pixels of the image on the
    // game board from the top and left-hand edges
    top: 0,
    left: 0,

    // Define properties to store the initial position in pixels of the images on the game
    // board from the top and left-hand edges so that the image can be returned to its
    // initial position at a later stage if needed
    startLeft: 0,
    startTop: 0,

    // Define a property containing a reference to a new <img> tag holding the single
    // large sprite map image. Because this is an object, it will be shared across all
    // instances of the Frogger.ImageSprite "class", saving on memory usage
    sprite: (function() {
        var img = document.createElement("img");
        img.src = "spritemap.png";
        return img;
    }()),

    // Define properties to define the default width and height, in pixels, of an
    // individual image within the large sprite map image file
    width: 80,
    height: 80,

    // Define properties denoting the location of the top and left positions, in pixels,
    // of the individual image within the large sprite map image. Together with the width
    // and height properties, we are able to pull out an individual image from the sprite
    // map to display within the <canvas> element
    spriteTop: 0,
    spriteLeft: 0,

    // Declare no animations by default
    animations: null,

    // Define a property indicating the name of the currently playing animation, if any
    currentAnimation: "",

    // Define a property to indicate whether the individual image represented by this
    // object instance is currently hidden from display
    isHidden: false,

    // Define a function to reset this image back to its initial position and to reset any
    // associated animation of that image
    reset: function() {

        // Reset the top and left position of the image on the game board back to its
        // initial position defined upon instantiation
        this.left = this.startLeft;
        this.top = this.startTop;

        // Reset any associated animations to their initial state
        this.resetAnimation();

        // Declare this image no longer to be hidden
        this.isHidden = false;
    },

    // Define a function to associate one or more animation with this image - data is
    // passed in as an object literal with each key representing the name of the animation
    registerAnimation: function(animations) {
        var key,
            animation;

        // Loop through the supplied object literal data indicating the animations to
        // register
        for (key in animations) {
            animation = animations[key];

            // Create instances of the Frogger.Animation "class" for each item in the
            // supplied data object. Each item's data is passed to the "class" upon
            // instantiation to define its animation sequence, animation rate, and other
            // initial properties
            this.animations[key] = new Frogger.Animation(animation);
        }
    },

    // Define a function to reset any currently playing animation back to its initial state
    resetAnimation: function() {
        if (this.animations[this.currentAnimation]) {

            // If an animation is currently playing, then call its reset() method to
            // restore it to its initial state
            this.animations[this.currentAnimation].reset();
        }

        // Once reset, there should be no currently playing animation
        this.currentAnimation = "";
    },

    // Define a function to play a specific animation sequence by name. The name must
    // correspond with one provided to the registerAnimation() method previously
    playAnimation: function(name) {

        // Set the current animation to the provided name
        this.currentAnimation = name;

        if (this.animations[this.currentAnimation]) {

            // If an animation is found by the supplied name, then call its play() method
            // to begin incrementing its current frame index using its internal timer
            this.animations[this.currentAnimation].play();
        }
    },

    // Define a function to draw the individual image onto the <canvas> element at the
    // supplied left and top positions, in pixels. If an animation is currently playing,
    // ensure the correct image is displayed based on that animation's current sequence
    // value
    renderAt: function(left, top) {

        // Locate the animation that is currently playing, if any
        var animation = this.animations[this.currentAnimation],

            // If an animation is playing, get its current sequence value based on its
            // internal frame index. If no animation is playing, assume a sequence value
            // of 0. This value will be multiplied by the width of the individual image
            // within the sprite map to identify the exact image to show based on the
            // animation's current frame index
            sequenceValue = animation ? animation.getSequenceValue() : 0,

            // If an animation is playing, get the location of the animation's initial
            // frame as an offset in pixels from the left-hand edge of the sprite map image.
            // We make an assumption that the top offset of the animation images is the
            // same as the main image itself represented in this object instance - meaning
            // that all frames of the animation should be positioned together with the main
            // non-animating image on the same row of the sprite map image
            animationSpriteLeft = animation ? animation.getSpriteLeft() : 0,

            // Calculate the offset in pixels from the left-hand edge of the sprite map
            // image where the individual image to display is to be found, based on whether
            // an animation is currently playing or not. If no animation is playing, the
            // offset will be the same as that stored in the spriteLeft property of this
            // object instance
            spriteLeft = this.spriteLeft + animationSpriteLeft + (this.width * sequenceValue);

        // If the image is not currently to be considered hidden, then extract the individual
        // image from the sprite map and draw it onto the <canvas> drawing surface at the
        // top and left positions, in pixels, as provided to this method, when called
        if (!this.isHidden) {
            Frogger.drawingSurface.drawImage(this.sprite, spriteLeft, this.spriteTop, this.width, this.height, left, top, this.width, this.height);
        }
    },

    // Define a function to set the stored left and top offset positions, in pixels,
    // indicating where on the game board the image should be displayed. These values are
    // then used in the renderAt() method to draw the image at this position
    moveTo: function(left, top) {
        this.left = left || 0;

        // Since most images are moved left and right in this game, rather than up and down,
        // we let the top offset value be optional
        if (typeof top !== "undefined") {
            this.top = top || 0;
        }
    },

    // Define a function return the width of the individual image we are extracting from
    // the large sprite map image
    getWidth: function() {
        return this.width;
    },

    // Define a function to return the left and right positions, in pixels, of the image
    // which we can use later to perform collision detection with other obstacles on the
    // game board
    getPosition: function() {
        return {
            left: this.left,

            // The right position is derived as the left position plus the width of the
            // individual image
            right: this.left + this.width
        };
    },

    // Define a function to hide this image from the game board by effectively stopping
    // the drawing of the image to the <canvas> within the renderAt() method
    hide: function() {
        this.isHidden = true;
    }
};