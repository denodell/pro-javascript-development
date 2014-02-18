var Frogger = {

    // Get a reference to the <canvas> element's 2-D drawing surface
    drawingSurface: (function() {

        // Locate the main <canvas> element on the page
        var canvas = document.getElementById("canvas");
        return canvas.getContext("2d");
    }()),

    // Define an object containing references to directions the characters in our game can
    // move in. We define it here globally for use across our whole code base
    direction: {
        UP: "up",
        DOWN: "down",
        LEFT: "left",
        RIGHT: "right"
    },

    // Define the observer design pattern methods subscribe() and publish() to allow
    // application-wide communication without the need for tightly-coupled modules. See
    // Chapter 5 for more information on this design pattern.
    observer: (function() {
        var events = {};

        return {
            subscribe: function(eventName, callback) {

                if (!events.hasOwnProperty(eventName)) {
                    events[eventName] = [];
                }

                events[eventName].push(callback);
            },

            publish: function(eventName) {
                var data = Array.prototype.slice.call(arguments, 1),
                    index = 0,
                    length = 0;

                if (events.hasOwnProperty(eventName)) {
                    length = events[eventName].length;

                    for (; index < length; index++) {
                        events[eventName][index].apply(this, data);
                    }
                }
            }
        };
    }())
};

// Define the game logic module which keeps track of the game state, the players's score,
// the number of lives remaining, handles collisions between the player's character and
// other obstacles and ensures the game graphics are drawn onto the <canvas> at the
// right moment
(function(Frogger) {

    // Define a variable to hold the current player's score
    var _score = 0,

        // Define and initialize a variable to hold the high score achieved in the game
        _highScore = 1000,

        // Define the number of lives the player has remaining before the game is over
        _lives = 5,

        // Define the number of milliseconds the player has to get their character to
        // the goal (60 seconds). If they take too long, they will lose a life
        _timeTotal = 60000,

        // Define a variable to store the current time remaining for the player to reach
        // the goal
        _timeRemaining = _timeTotal,

        // Define the refresh rate of the graphics on the <canvas> element (one draw every
        // 50 milliseconds). Attempting to redraw too frequently can cause the browser to
        // slow down so choose this value carefully to maintain a good balance between
        // fluid animation and smooth playability
        _refreshRate = 50,

        // Define a variable to store the number of times the player's character has
        // reached the goal
        _timesAtGoal = 0,

        // Define a variable to indicate the number of times the player's character needs
        // to reach the goal for the game to be won
        _maxTimesAtGoal = 5,

        // Define a Boolean variable to indicate whether the player's movement is currently
        // frozen in place
        _isPlayerFrozen = false;

    // Define a function to be called to count down the time remaining for the player to
    // reach the goal without forfeiting a life
    function countDown() {
        if (_timeRemaining > 0) {

            // This function will be called as frequently as the _refreshRate variable
            // dictates so we reduce the number of milliseconds remaining by the
            // _refreshRate value for accurate timing
            _timeRemaining -= _refreshRate;

            // Publish the fact that the remaining time has changed, passing along the
            // new time remaining as a percentage - which will help when we come to display
            // the remaining time on the game board itself
            Frogger.observer.publish("time-remaining-change", _timeRemaining / _timeTotal);
        } else {

            // If the remaining time reaches zero, we take one of the player's remaining
            // lives
            loseLife();
        }
    }

    // Define a function to be called when all the player's lives have gone and the game
    // is declared over
    function gameOver() {

        // Pause the player's movements as they are no longer in the game
        freezePlayer();

        // Inform other code modules in this application that the game is over
        Frogger.observer.publish("game-over");
    }

    // Define a function to be called when the player has reached the goal
    function gameWon() {

        // Inform other code modules that the game has been won
        Frogger.observer.publish("game-won");
    }

    // Define a function to be called when the player loses a life
    function loseLife() {

        // Decrease the number of lives the player has remaining
        _lives--;

        // Pause the player's movements
        freezePlayer();

        // Inform other code modules that the player has lost a life
        Frogger.observer.publish("player-lost-life");

        if (_lives === 0) {

            // Declare the game to be over if the player has no lives remaining
            gameOver();
        } else {

            // If there are lives remaining, wait 2000 milliseconds (2 seconds) before
            // resetting the player's character and other obstacles to their initial
            // positions on the game board
            setTimeout(reset, 2000);
        }
    }

    // Define a function to be called when the player's character is required to be frozen
    // in place, such as when the game is over or when the player has lost a life
    function freezePlayer() {

        // Set the local variable to indicate the frozen state
        _isPlayerFrozen = true;

        // Inform other code modules - including that which controls the player's
        // character - that the player is now be frozen
        Frogger.observer.publish("player-freeze");
    }

    // Define a function to be called when the player's character is free to move after
    // being previously frozen in place
    function unfreezePlayer() {

        // Set the local variable to indicate the new state
        _isPlayerFrozen = false;

        // Inform other code modules that the player's character is now free to move around
        // the game board
        Frogger.observer.publish("player-unfreeze");
    }

    // Define a function to be called when the game board needs to be reset, such as when
    // the player loses a life
    function reset() {

        // Reset the variable storing the current time remaining to its initial value
        _timeRemaining = _timeTotal;

        // Release the player's character if it has been frozen in place
        unfreezePlayer();

        // Inform other code modules to reset themselves to their initial conditions
        Frogger.observer.publish("reset");
    }

    // Define a function to kick-start the application and run the game loop, which renders
    // each frame of the game graphics and checks for collisions between the player's
    // character and any obstacles on the game board
    function start() {

        // Inform other code modules of the initial state of the game's high score
        Frogger.observer.publish("high-score-change", _highScore);

        //
        setInterval(function() {
            Frogger.drawingSurface.clearRect(0, 0, canvas.width, canvas.height);

            if (!_isPlayerFrozen) {
                countDown();
                Frogger.observer.publish("check-collisions");
            }

            Frogger.observer.publish("render-base-layer");
            Frogger.observer.publish("render-character");

        }, _refreshRate);
    }

    Frogger.observer.subscribe("game-load", start);

    Frogger.observer.subscribe("player-at-goal", function() {
        _score += 1000;
        Frogger.observer.publish("score-change", _score);

        if (_score > _highScore) {
            _highScore = _score;
            Frogger.observer.publish("high-score-change", _highScore);
        }
        _timesAtGoal++;
        freezePlayer();
        if (_timesAtGoal < _maxTimesAtGoal) {
            setTimeout(reset, 2000);
        } else {
            gameWon();
        }
    });

    Frogger.observer.subscribe("player-moved", function() {
        _score += 20;
        Frogger.observer.publish("score-change", _score);

        if (_score > _highScore) {
            _highScore = _score;
            Frogger.observer.publish("high-score-change", _highScore);
        }
    });

    Frogger.observer.subscribe("collision", loseLife);
}(Frogger));