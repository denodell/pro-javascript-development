// Define a code module to define the types of obstacle rows that exist on the game board,
// representing a road-type row which will house vehicles, a water row containing log
// obstacles, a water row containing turtle obstacles, and a goal row containing the
// locations the player's character aims to reach to win the game
Frogger.Row = (function() {

    // Define a base row "class" containing the shared code required for each different
    // type of specialist row on the game board
    function Row(options) {
        options = options || {};

        // Define the direction of obstacles moving on this row, defaults to moving left
        this.direction = options.direction || Frogger.direction.LEFT;

        // Define the set of obstacles to place on this row and move
        this.obstacles = options.obstacles || [];

        // Define the top position, in pixels, of where this row sits on the game board
        this.top = options.top || 0;

        // Define the speed with which obstacles on this row move in the given direction
        // as a factor of the render rate set in game loop
        this.speed = options.speed || 1;
    }

    Row.prototype = {

        // Define a method to render each of the obstacles in the correct place on the
        // current row
        render: function() {
            var index = 0,
                length = this.obstacles.length,
                left,
                obstaclesItem;

            // Loop through each of the obstacles within this row
            for (; index < length; index++) {
                obstaclesItem = this.obstacles[index];

                // Update the left position, in pixels, of this obstacle based on its
                // current position along with the direction and speed of movement
                left = obstaclesItem.getPosition().left + ((this.direction === Frogger.direction.RIGHT ? 1 : -1) * this.speed);

                // Adjust the left position such that if the obstacle falls off one edge of
                // the game board, it then appears to return from the other edge
                if (left < -obstaclesItem.getWidth()) {
                    left = Frogger.drawingSurfaceWidth;
                } else if (left >= Frogger.drawingSurfaceWidth) {
                    left = -obstaclesItem.getWidth();
                }

                // Move the obstacle and draw it on the game board in the updated position
                obstaclesItem.moveTo(left);
                obstaclesItem.renderAt(left, this.top);
            }
        },

        // Define a method to return the top position, in pixels, of this row
        getTop: function() {
            return this.top;
        },

        // Define a method to detect whether the player's character is currently colliding
        // with an obstacle on this row
        isCollision: function(characterPosition) {
            var index = 0,
                length = this.obstacles.length,
                obstaclesItem,
                isCollision = false;

            // Loop through each of the obstacles on this row
            for (; index < length; index++) {
                obstaclesItem = this.obstacles[index];

                // If the player's character touches the current obstacle, a collision
                // has taken place and we return this fact to the calling code
                if (Frogger.intersects(obstaclesItem.getPosition(), characterPosition)) {
                    isCollision = true;
                }
            }

            return isCollision;
        },

        // Define a method to reset the obstacles on this row to their default state and
        // position on the game board
        reset: function() {
            var index = 0,
                length = this.obstacles.length;

            // Loop through each of the obstacles within this row, and call their reset()
            // methods in turn
            for (; index < length; index++) {
                this.obstacles[index].reset();
            }
        }
    };

    // Define a new "class" representing a road-type row, containing vehicle obstacles which
    // inherits from our base Row "class"
    function Road(options) {
        Row.call(this, options);
    }

    Road.prototype = new Row();
    Road.prototype.constructor = Road;

    // Define a new "class" representing a row containing logs floating on water which
    // inherits from our base Row "class"
    function Log(options) {
        Row.call(this, options);
    }

    Log.prototype = new Row();
    Log.prototype.constructor = Log;

    // Override the isCollision() method, reversing its behavior. If the player's character
    // touches a log it is safe, however it should be considered a collision if it touches
    // the water beneath rather than the obstacle itself
    Log.prototype.isCollision = function(characterPosition) {

        // Return the opposite Boolean state returned by a normal call to the isCollision()
        // method
        return !Row.prototype.isCollision.call(this, characterPosition);
    };

    // Override the render() method so that when the player's character lands on a log,
    // it gets transported along the water with the log
    Log.prototype.render = function() {

        // If the player's character is on this row, update its position based on the
        // direction and speed of motion of the log the player has landed on
        if (Frogger.Character.getTop() === this.getTop()) {
            Frogger.Character.setPosition(Frogger.Character.getPosition().left + ((this.direction === Frogger.direction.RIGHT ? 1 : -1) * this.speed));
        }

        // Call the inherited render() method to draw the log in its new position
        Row.prototype.render.call(this);

    };

    // Define a new "class" representing a row containing turtles swimming in the water
    // which inherits from our Log "class" as it shares similarities
    function Turtle(options) {
        Log.call(this, options);
    }

    Turtle.prototype = new Log();
    Turtle.prototype.constructor = Turtle;

    // Override the isCollision() method such that it behaves like the same method on
    // the Log "class" apart from when the turtle obstacle has dipped underwater, in which
    // case there will always be a collision if the player's character is on this row
    Turtle.prototype.isCollision = function(characterPosition) {
        var isCollision = Log.prototype.isCollision.call(this, characterPosition);
        return this.obstacles[0].isUnderwater() || isCollision;
    };

    // Define a new "class" representing the goal row the player's character is aiming for
    // in order to win the game, which inherits from our base Row "class"
    function Goal(options) {

        // The goals placed within this row never move so we always force the speed
        // property to be 0
        options.speed = 0;

        Row.call(this, options);
    }

    Goal.prototype = new Row();
    Goal.prototype.constructor = Goal;

    // Override the isCollision() method to detect if the player's character has reached
    // one of the available goals stored in this row
    Goal.prototype.isCollision = function(characterPosition) {
        var index = 0,
            length = this.obstacles.length,
            obstaclesItem,
            isCollision = true;

        // Loop through the goals in this row to find out if the player has reached one
        // of them
        for (; index < length; index++) {
            obstaclesItem = this.obstacles[index];

            // If this goal has not been reached before and the player's character is
            // positioned above the goal, fire the "player-at-goal" event so the game logic
            // module registers that the goal has been reached
            if (!obstaclesItem.isMet && Frogger.intersects(obstaclesItem.getPosition(), characterPosition)) {
                this.obstacles[index].isMet = true;
                Frogger.observer.publish("player-at-goal");
                isCollision = false;

                // Add the image of the goal-reached frog to the row within the goal
                // reached so the user can see that they have reached this goal before
                this.obstacles.push(new Frogger.Image.GoalFrog(obstaclesItem.getPosition().left));
            }
        }

        return isCollision;
    };

    // Return the "classes" defined in this code module for use in the rest of our code
    return {
        Road: Road,
        Log: Log,
        Turtle: Turtle,
        Goal: Goal
    };
}(Frogger));