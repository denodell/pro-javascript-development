// Define a code module to represent the player's character on the game board and to
// handle its movement and behavior according to the current game state
Frogger.Character = (function(Frogger) {

    // Define a variable to store the image representing the player's character
    var _character,

        // Define a variable to store the game board properties and settings
        _gameBoard = {},

        // Define a variable to denote the starting row of the player's character on the
        // game board
        _startRow = 14,

        // Define a variable to denote the starting columns of the player's character on
        // the game board - essentially centered
        _startColumn = 6,

        // Define a variable to store the current row the player's character has reached
        _currentRow = _startRow,

        // Define a Boolean variable to indicate whether the player's character is
        // currently frozen in place, as happens temporarily when the player loses a life
        // or reaches the goal
        _isFrozen = false;

    // Define a "class" to represent the player's frog character, inheriting from the
    // Frogger.ImageSprite "class". The left and top values passed in on instantiation
    // reflect the starting position in pixels of the player's character from the top-left
    // hand corner of the game board
    function Character(left, top) {
        Frogger.ImageSprite.call(this, left, top);

        // Register five animations to play when the player loses a life or when the
        // character is moved in any of four different directions - up, down, left or right
        this.registerAnimation({

            // When the player loses a life, switch between the three images found starting
            // at 640px from the left of the sprite map image at a rate of 350 milliseconds,
            // stopping on the last image
            "lose-life": {
                spriteLeft: 640,
                sequence: [0, 1, 2],
                rate: 350
            },

            // When the player's character moves up a row on the game board, switch between
            // the two images found starting at the left-hand edge of the sprite map
            "move-up": {
                spriteLeft: 0,
                sequence: [1, 0]
            },

            // When the player's character moves right on the game board, switch between
            // the two images found starting at 160px from left-hand edge of the sprite map
            "move-right": {
                spriteLeft: 160,
                sequence: [1, 0]
            },

            // When the player's character moves down on the game board, switch between
            // the two images found starting at 320px from left-hand edge of the sprite map
            "move-down": {
                spriteLeft: 320,
                sequence: [1, 0]
            },

            // When the player's character moves left on the game board, switch between
            // the two images found starting at 480px from left-hand edge of the sprite map
            "move-left": {
                spriteLeft: 480,
                sequence: [1, 0]
            }
        });
    }

    // Inherit from the Frogger.ImageSprite "class"
    Character.prototype = new Frogger.ImageSprite();
    Character.prototype.constructor = Character;

    // Define the individual images for the player's character sprite as being found at
    // position 0px x 0px within the sprite map image file
    Character.prototype.spriteLeft = 0;
    Character.prototype.spriteTop = 0;

    // Define a method to move the character up one row on the game board
    Character.prototype.moveUp = function() {

        // Move the top position of the character up by the height of one grid square
        // on the game board
        this.top -= _gameBoard.grid.height;

        // Ensure the character does not move outside of the bounds restricting its
        // movement around the game board - we don't want it appearing on top of the
        // score at the top of the screen
        if (this.top < _gameBoard.characterBounds.top) {
            this.top = _gameBoard.characterBounds.top;
        }

        // Play the animation named "move-up", making it look like the character is moving
        this.playAnimation("move-up");

        // Keep track of the current row the character sits upon
        _currentRow--;
    };

    // Define a method to move the character down one row on the game board
    Character.prototype.moveDown = function() {

        // Move the top position of the character down by the height of one grid square
        // on the game board
        this.top += _gameBoard.grid.height;

        // Ensure the character does not move outside of the bounds restricting its
        // movement around the game board - we don't want it appearing on top of the
        // countdown timer at the base of the screen
        if (this.top > _gameBoard.characterBounds.bottom) {
            this.top = _gameBoard.characterBounds.bottom;
        }

        // Play the animation named "move-down", making it look like the character is moving
        this.playAnimation("move-down");

        // Keep track of the current row the character sits upon
        _currentRow++;
    };

    // Define a method to move the character one column to the left on the game board
    Character.prototype.moveLeft = function() {

        // Move the position of the character on the game board left by the width of one
        // grid square on the game board
        this.left -= _gameBoard.grid.width;

        // Ensure the character does not move outside of the bounds restricting its
        // movement around the game board - we don't want it disappearing off the side
        if (this.left < _gameBoard.characterBounds.left) {
            this.left = _gameBoard.characterBounds.left;
        }

        // Play the animation named "move-left", making it look like the character is moving
        this.playAnimation("move-left");
    };

    // Define a method to move the character one column to the right on the game board
    Character.prototype.moveRight = function() {

        // Move the position of the character on the game board right by the width of one
        // grid square on the game board
        this.left += _gameBoard.grid.width;

        // Ensure the character does not move outside of the bounds restricting its
        // movement around the game board - we don't want it disappearing off the side
        if (this.left > _gameBoard.characterBounds.right) {
            this.left = _gameBoard.characterBounds.right;
        }

        // Play the animation named "move-right", making it look like the character is moving
        this.playAnimation("move-right");
    };

    // Define a function which returns the current position of the player's character in
    // pixels from the top of the game board
    function getTop() {

        // Look up the top position in pixels from the game board properties by the current
        // row the character is sitting upon
        return _gameBoard.rows[_currentRow];
    }

    // Define a function which hides the player's character from display
    function hide() {

        // Call the hide() method on the instance of the Character "class" that will
        // represent the player's character
        _character.hide();
    }

    // Define a function which moves the player's character in one of four possible
    // directions - up, down, left, or right
    function move(characterDirection) {

        // Only move the player's character if it is not deemed to be frozen in place
        if (!_isFrozen) {

            // Call the appropriate method on the Character instance based on the
            // direction the character is to move in
            if (characterDirection === Frogger.direction.LEFT) {
                _character.moveLeft();
            } else if (characterDirection === Frogger.direction.RIGHT) {
                _character.moveRight();
            } else if (characterDirection === Frogger.direction.UP) {
                _character.moveUp();
            } else if (characterDirection === Frogger.direction.DOWN) {
                _character.moveDown();
            }

            // Publish an event to the rest of the code modules, indicating that the
            // player's position has been moved by the player
            Frogger.observer.publish("player-moved");
        }
    }

    // Define a function to render the player's character on screen
    function render() {

        // Call the Character instance's renderAt() method, passing along its current
        // left and top position
        _character.renderAt(_character.left, _character.top);
    }

    // Define a function, to be executed when the player loses a life, which plays the
    // appropriate animation
    function loseLife() {
        _character.playAnimation("lose-life");
    }

    // Define a function to move the player's character to the given position in pixels
    // from the left-hand edge of the game board - this will be used when the character
    // is sitting on a moving object to keep the character aligned with that object
    function setPosition(left) {

        // Ensure the character does not move outside of its defined bounds on the game
        // board
        if (left > _gameBoard.characterBounds.right) {
            left = _gameBoard.characterBounds.right;
        } else if (left < _gameBoard.characterBounds.left) {
            left = _gameBoard.characterBounds.left;
        }

        // Move the character's position from the left-hand edge of the game board to match
        // the given position
        _character.moveTo(left);
    }

    // Define a function to reset the player's character's position on the game board
    function reset() {
        _character.reset();

        // Reset the local variable indicating the current row the character sits upon
        _currentRow = _startRow;
    }

    // Define a function to return the current position of the character on the game board
    function getPosition() {
        return _character.getPosition();
    }

    // Define a function to set the local _isFrozen variable to true, indicating that the
    // player's character's position on the game board should be frozen in place
    function freeze() {
        _isFrozen = true;
    }

    // Define a function to set the local _isFrozen variable to false, indicating that the
    // player's character is free to move around the game board
    function unfreeze() {
        _isFrozen = false;
    }

    // Define a function to be executed when the game board has initialized, passing along
    // the properties and settings from the game board code module
    function initialize(gameBoard) {
        _gameBoard = gameBoard;

        // Initialize an instance of the Character "class" to represent the player's
        // character, setting its start position on the game board
        _character = new Character(_gameBoard.columns[_startColumn], _gameBoard.rows[_startRow]);

        // Ensure the local render() function is executed when the "render-character"
        // event is fired from within the game loop to draw the player's character on
        // the screen
        Frogger.observer.subscribe("render-character", render);
    }

    // When the game logic module informs us that the player has lost a life, execute the
    // loseLife() function to play the appropriate animation
    Frogger.observer.subscribe("player-lost-life", loseLife);

    // When the game logic informs us the player's position needs to be reset, execute the
    // reset() function
    Frogger.observer.subscribe("reset", reset);

    // When the player has reached the goal, hide the player from the screen temporarily
    Frogger.observer.subscribe("player-at-goal", hide);

    // When the game logic tells us the player's character must stay in place on the
    // game board, we set the appropriate local variable to reflect this
    Frogger.observer.subscribe("player-freeze", freeze);

    // When the game logic tells us the player's character is free to move around the
    // game board again, we set the appropriate local variable to reflect this
    Frogger.observer.subscribe("player-unfreeze", unfreeze);

    // When the game board module initializes its properties and settings, execute the
    // initialize() function
    Frogger.observer.subscribe("game-board-initialize", initialize);

    // When the player presses the arrow keys on the keyboard, move the player's
    // character in the appropriate direction on the game board
    window.addEventListener("keydown", function(event) {

        // Define the key codes for the arrow keys
        var LEFT_ARROW = 37,
            UP_ARROW = 38,
            RIGHT_ARROW = 39,
            DOWN_ARROW = 40;

        // Execute the move() function, passing along the correct direction based on the
        // arrow key pressed. Ignore any other key presses
        if (event.keyCode === LEFT_ARROW) {
            move(Frogger.direction.LEFT);
        } else if (event.keyCode === RIGHT_ARROW) {
            move(Frogger.direction.RIGHT);
        } else if (event.keyCode === UP_ARROW) {
            move(Frogger.direction.UP);
        } else if (event.keyCode === DOWN_ARROW) {
            move(Frogger.direction.DOWN);
        }
    }, false);

    // When the player taps in certain places on the game board on their touch-sensitive
    // screen, move the player's character in the appropriate direction on the game board
    // according to where the screen has been tapped. This is useful since users with
    // touch screens are typically on mobile devices that do not have access to
    // physical keyboards to press the arrow keys to move the character.
    Frogger.canvas.addEventListener("touchstart", function(event) {

        // Get a reference to the position of the touch on the screen in pixels from the
        // top-left position of the touched element, in this case the game board
        var touchLeft = event.targetTouches[0].clientX,
            touchTop = event.targetTouches[0].clientY;

        // Execute the move() function, passing along the correct direction based on the
        // position tapped on the game board
        if (touchLeft < (Frogger.drawingSurfaceWidth / 8)) {
            move(Frogger.direction.LEFT);
        } else if (touchLeft > (3 * Frogger.drawingSurfaceWidth / 8)) {
            move(Frogger.direction.RIGHT);
        } else if (touchTop < (Frogger.drawingSurfaceHeight / 8)) {
            move(Frogger.direction.UP);
        } else if (touchTop > (3 * Frogger.drawingSurfaceHeight / 8)) {
            move(Frogger.direction.DOWN);
        }
    }, false);

    // Expose the local getTop(), getPosition() and setPosition() methods so they are
    // available to other code modules
    return {
        getTop: getTop,
        getPosition: getPosition,
        setPosition: setPosition
    };
}(Frogger));