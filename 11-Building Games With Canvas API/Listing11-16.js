// Define a namespace to store the individual obstacles and images to place on the game
// board as "classes" representing the individual images from the sprite map for each
Frogger.Image = (function(Frogger) {

    // Define a race car obstacle whose starting position on the x-axis can be set when
    // instantiated
    function RaceCar(left) {
        Frogger.ImageSprite.call(this, left);
    }

    // The race car is defined as the image found in the sprite map at position 0px x 80px
    // respectively from the left and top edges of the sprite map image file
    RaceCar.prototype = new Frogger.ImageSprite();
    RaceCar.prototype.constructor = RaceCar;
    RaceCar.prototype.spriteLeft = 0;
    RaceCar.prototype.spriteTop = 80;

    // Define a bulldozer obstacle
    function Bulldozer(left) {
        Frogger.ImageSprite.call(this, left);
    }

    // The bulldozer is the image found at position 80px x 80px within the sprite map
    Bulldozer.prototype = new Frogger.ImageSprite();
    Bulldozer.prototype.constructor = Bulldozer;
    Bulldozer.prototype.spriteLeft = 80;
    Bulldozer.prototype.spriteTop = 80;

    // Define a turbo race car obstacle
    function TurboRaceCar(left) {
        Frogger.ImageSprite.call(this, left);
    }

    // The turbo race car is the image found at position 160px x 80px within the sprite map
    TurboRaceCar.prototype = new Frogger.ImageSprite();
    TurboRaceCar.prototype.constructor = TurboRaceCar;
    TurboRaceCar.prototype.spriteLeft = 160;
    TurboRaceCar.prototype.spriteTop = 80;

    // Define a road car obstacle
    function RoadCar(left) {
        Frogger.ImageSprite.call(this, left);
    }

    // The road car is the image found at position 240px x 80px within the sprite map
    RoadCar.prototype = new Frogger.ImageSprite();
    RoadCar.prototype.constructor = RoadCar;
    RoadCar.prototype.spriteLeft = 240;
    RoadCar.prototype.spriteTop = 80;

    // Define a truck obstacle
    function Truck(left) {
        Frogger.ImageSprite.call(this, left);
    }

    // The truck is the image found at position 320px x 80px within the sprite map, with a
    // width of 122px as opposed to the standard 80px width of the other individual images
    Truck.prototype = new Frogger.ImageSprite();
    Truck.prototype.constructor = Truck;
    Truck.prototype.spriteLeft = 320;
    Truck.prototype.spriteTop = 80;
    Truck.prototype.width = 122;

    // Define a short log obstacle
    function ShortLog(left) {
        Frogger.ImageSprite.call(this, left);
    }

    // The short log is the image found at position 0px x 160px within the sprite map, with
    // a width of 190px
    ShortLog.prototype = new Frogger.ImageSprite();
    ShortLog.prototype.constructor = ShortLog;
    ShortLog.prototype.spriteLeft = 0;
    ShortLog.prototype.spriteTop = 160;
    ShortLog.prototype.width = 190;

    // Define a medium log obstacle
    function MediumLog(left) {
        Frogger.ImageSprite.call(this, left);
    }

    // The medium log is the image found at position 0px x 240px within the sprite map,
    // with a width of 254px
    MediumLog.prototype = new Frogger.ImageSprite();
    MediumLog.prototype.constructor = MediumLog;
    MediumLog.prototype.spriteLeft = 0;
    MediumLog.prototype.spriteTop = 240;
    MediumLog.prototype.width = 254;

    // Define a long log obstacle
    function LongLog(left) {
        Frogger.ImageSprite.call(this, left);
    }

    // The long log is the image found at position 240px x 160px within the sprite map,
    // with a width of 392px
    LongLog.prototype = new Frogger.ImageSprite();
    LongLog.prototype.constructor = LongLog;
    LongLog.prototype.spriteLeft = 240;
    LongLog.prototype.spriteTop = 160;
    LongLog.prototype.width = 392;

    // Define a turtle obstacle. There are two types of turtle obstacle on the game board,
    // one representing a group of two turtles and one representing a group of three
    // turtles. Both types of turtle obstacle have some shared behavior which is defined
    // in this "class" which acts as a base for both obstacles to inherit from.
    function Turtle(left) {
        Frogger.ImageSprite.call(this, left);
    }

    Turtle.prototype = new Frogger.ImageSprite();
    Turtle.prototype.constructor = Turtle;

    // The turtles will animate and appear to dip underwater on occasion. We need to
    // know when the turtle is underwater so that if the player's character is positioned
    // above the turtle at that point, they will lose a life. This will be handled by the
    // collision detection code later, but for now we just need to create a method to
    // tell us when the turtle in underwater
    Turtle.prototype.isUnderwater = function() {
        var isUnderwater = false,

            // Get a reference to the current animation of the turtle diving underwater
            // and resurfacing
            animation = this.animations[this.currentAnimation];

        // The turtle is deemed to be underwater when it is showing the furthestmost image
        // from the sprite map in the animation sequence. This is represented by the
        // largest number in the animation frame sequence which we can get using the
        // Math.max() method in JavaScript. If the current animation sequence value matches
        // this furthestmost image in the sprite map, the turtle is underwater.
        if (animation.getSequenceValue() === Math.max.apply(Math, animation.sequence)) {
            isUnderwater = true;
        }

        return isUnderwater;
    };

    // Define an obstacle representing a group of two turtles together
    function TwoTurtles(left) {
        Turtle.call(this, left);
    }

    // Inherit from the Turtle base "class" defined previously
    TwoTurtles.prototype = new Turtle();
    TwoTurtles.prototype.constructor = TwoTurtles;

    // The group of two turtles is the image found at position 320px x 240px within the
    // sprite map, with a width of 130px
    TwoTurtles.prototype.spriteLeft = 320;
    TwoTurtles.prototype.spriteTop = 240;
    TwoTurtles.prototype.width = 130;

    // Override the reset() method to define and auto-play the animation of the turtle
    // diving and surfacing
    TwoTurtles.prototype.reset = function() {
        Turtle.prototype.reset.call(this);

        // Register the dive and surface animation which plays each frame in the sequence
        // at a frame rate of 200 milliseconds, and loops once it reaches the end of the
        // sequence. The numbers in the sequence represent the multiples of offset of the
        // width of the individual image to grab the animating image from - essentially
        // switching between a number of side-by-side images from the sprite map file to
        // give the illusion of movement
        this.registerAnimation({
            "diveAndSurface": {
                sequence: [0, 1, 2, 3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                loop: true,
                rate: 200
            }
        });

        // Play the animation straight away
        this.playAnimation("diveAndSurface");
    };

    // Define an obstacle representing a group of three turtles together
    function ThreeTurtles(left) {
        Turtle.call(this, left);
    }

    // Inherit from the Turtle base "class" defined previously
    ThreeTurtles.prototype = new Turtle();
    ThreeTurtles.prototype.constructor = ThreeTurtles;

    // The group of three turtles is the image found at position 0px x 320px within the
    // sprite map, with a width of 200px
    ThreeTurtles.prototype.spriteLeft = 0;
    ThreeTurtles.prototype.spriteTop = 320;
    ThreeTurtles.prototype.width = 200;

    // Register the dive and surface animation as before, but animating over a greater
    // number of frames and at a slower animation rate than with the group of two turtles
    ThreeTurtles.prototype.reset = function() {
        Turtle.prototype.reset.call(this);

        this.registerAnimation({
            "diveAndSurface": {
                sequence: [0, 1, 2, 3, 3, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                loop: true,
                rate: 300
            }
        });

        this.playAnimation("diveAndSurface");
    };

    // Define a "class" representing the frog image displayed when the player's character
    // reaches the goal
    function GoalFrog(left) {
        Frogger.ImageSprite.call(this, left);
    }

    // The goal frog is the image found at position 640px x 80px within the sprite map
    GoalFrog.prototype = new Frogger.ImageSprite();
    GoalFrog.prototype.constructor = GoalFrog;
    GoalFrog.prototype.spriteLeft = 640;
    GoalFrog.prototype.spriteTop = 80;

    // Override the moveTo() method so that this image cannot be moved from its place
    // on the game board once it has been placed down
    GoalFrog.prototype.moveTo = function() {};

    // Define a "class" representing the goal the player will be aiming to meet with at
    // the far end of the game board from their start position
    function Goal(left) {
        Frogger.ImageSprite.call(this, left);
    }

    // Since the goal is drawn onto the game board as part of the background <canvas>
    // we do not need to draw it again here, so we specify the image position as being
    // a transparent block from the sprite map image so effectively nothing is actually
    // drawn to the canvas. We can still take advantage of the other features of the
    // ImageSprite "class", however, to simplify collision checking later on, which
    // will tell us when the player's character has reached a goal
    Goal.prototype = new Frogger.ImageSprite();
    Goal.prototype.constructor = Goal;
    Goal.prototype.spriteLeft = 800;
    Goal.prototype.spriteTop = 320;

    // Override the moveTo() method so that the goal cannot be moved from its place
    // on the game board once it has been placed down
    Goal.prototype.moveTo = function() {};

    // Add a custom property to this "class" to denote whether the goal instance has been
    // met by the player's character
    Goal.prototype.isMet = false;

    // Expose the "classes" defined in this module to the wider code base within the
    // Frogger.Image namespace
    return {
        RaceCar: RaceCar,
        Bulldozer: Bulldozer,
        RoadCar: RoadCar,
        TurboRaceCar: TurboRaceCar,
        Truck: Truck,
        ShortLog: ShortLog,
        MediumLog: MediumLog,
        LongLog: LongLog,
        TwoTurtles: TwoTurtles,
        ThreeTurtles: ThreeTurtles,
        GoalFrog: GoalFrog,
        Goal: Goal
    };
}(Frogger));