// Define a code module to add text-based visuals to the game board, e.g. the score, high
// score, and any informative text for the player about the game state, such as "Game Over"
// or "You Win!"
(function(Frogger) {

    // Define the text size and font name to use for the text. You can find the Arcade
    // Classic font for download for free online at http://bit.ly/arcade_font
    var _font = "67px Arcade Classic",

        // Define variables to store the current game state locally in this module
        _score = 0,
        _highScore = 0,
        _gameWon = false,
        _gameOver = false,

        // Define a variable to store the initialized data from the game board module
        // defined previously - this will be populated later with data from that module
        _gameBoard = {};

    // Define a function to render the player's score and high score to the <canvas> element
    function renderScore() {

        // Select the font face and size
        Frogger.drawingSurface.font = _font;

        // Right-align text at the position we define to draw the text at
        Frogger.drawingSurface.textAlign = "end";

        // Write the text "1-UP", right-aligned to the 4th column position and ending half
        // a row down from the top of the game board in white (hex color value #FFF)
        Frogger.drawingSurface.fillStyle = "#FFF";
        Frogger.drawingSurface.fillText("1-UP", _gameBoard.columns[3], _gameBoard.grid.height / 2);

        // Write out the current score in red (hex color value #F00) right-aligned beneath
        // the "1-UP" text previously drawn to the <canvas>
        Frogger.drawingSurface.fillStyle = "#F00";
        Frogger.drawingSurface.fillText(_score, _gameBoard.columns[3], _gameBoard.grid.height);

        // Write the text "HI-SCORE", right-aligned to the 8th column position and ending
        // half a row down from the top of the game board in white (hex color value #FFF)
        Frogger.drawingSurface.fillStyle = "#FFF";
        Frogger.drawingSurface.fillText("HI-SCORE", _gameBoard.columns[8], _gameBoard.grid.height / 2);

        // Write out the current high score in red (hex color value #F00) right-aligned
        // beneath the "HI-SCORE" text previously drawn to the <canvas>
        Frogger.drawingSurface.fillStyle = "#F00";
        Frogger.drawingSurface.fillText(_highScore, _gameBoard.columns[8], _gameBoard.grid.height);
    }

    // Define a function to render the text "GAME OVER" to the <canvas>. This will only be
    // called when the game is over
    function renderGameOver() {

        // Use the Arcade Classic font as previously defined, and write the text centered
        // around the given drawing position in white
        Frogger.drawingSurface.font = _font;
        Frogger.drawingSurface.textAlign = "center";
        Frogger.drawingSurface.fillStyle = "#FFF";

        // Write the text center aligned within the <canvas> and at the 9th row position
        // from the top of the game board
        Frogger.drawingSurface.fillText("GAME OVER", Frogger.drawingSurfaceWidth / 2, _gameBoard.rows[9]);
    }

    // Define a function to render the text "YOU WIN!" to the <canvas> which will be called
    // when the player has won the game by reaching the home base position five times
    function renderGameWon() {

        // Use the Arcade Classic font as previously defined, and write the text centered
        // around the given drawing position in yellow (hex value #FF0)
        Frogger.drawingSurface.font = _font;
        Frogger.drawingSurface.textAlign = "center";
        Frogger.drawingSurface.fillStyle = "#FF0";

        // Write the text center aligned within the <canvas> and at the 9th row position
        // from the top of the game board
        Frogger.drawingSurface.fillText("YOU WIN!", Frogger.drawingSurfaceWidth / 2, _gameBoard.rows[9]);
    }

    // Define a function to render the "TIME" label in the bottom-right corner of the
    // game board
    function renderTimeLabel() {

        // Use the Arcade Classic font as previously defined, and write the text centered
        // around the given drawing position in yellow (hex value #FF0)
        Frogger.drawingSurface.font = _font;
        Frogger.drawingSurface.textAlign = "end";
        Frogger.drawingSurface.fillStyle = "#FF0";

        // Write the text right aligned within the <canvas> and in the bottom right corner
        // of the game board
        Frogger.drawingSurface.fillText("TIME", Frogger.drawingSurfaceWidth, Frogger.drawingSurfaceHeight);
    }

    // Define a function to render the text-based visuals to the game board as appropriate
    // depending on the current game state - we'll connect this up later to be called
    // once on every cycle of the game loop
    function render() {
        renderScore();
        renderTimeLabel();

        // Only render the "GAME OVER" text if the game is actually over
        if (_gameOver) {
            renderGameOver();
        }

        // Only render the "YOU WIN!" text if the players has won the game
        if (_gameWon) {
            renderGameWon();
        }
    }

    // When the game logic publishes a message declaring that the player has won the game,
    // set the local variable to indicate this also so that the "YOU WIN!" text will be
    // drawn onto the <canvas> during any following execution of the game loop
    Frogger.observer.subscribe("game-won", function() {
        _gameWon = true;
    });

    // When the game logic module publishes a message indicating that the game has been
    // lost, set the local variable to reflect this fact so that the "GAME OVER" text gets
    // written to the <canvas> element on the next cycle around the game loop
    Frogger.observer.subscribe("game-over", function() {
        _gameOver = true;
    });

    // Reset the local variables indicating the game state if the game logic has forced
    // a game state reset to occur
    Frogger.observer.subscribe("reset", function() {
        _gameOver = false;
        _gameWon = false;
    });

    // Update the local score variable when the player's score changes throughout the
    // course of the game. The updated score will then be written onto the <canvas> on
    // the next cycle of the game loop
    Frogger.observer.subscribe("score-change", function(newScore) {
        _score = newScore;
    });

    // Update the local high score variable when the game's high score changes throughout
    // the course of the game. The updated high score will then be drawn to the <canvas>
    // on the next cycle of the game loop
    Frogger.observer.subscribe("high-score-change", function(newHighScore) {
        _highScore = newHighScore;
    });

    // Subscribe to the "game-board-initialize" event fired by the previous code module,
    // storing the game board properties and settings in a local variable
    Frogger.observer.subscribe("game-board-initialize", function(gameBoard) {
        _gameBoard = gameBoard;

        // Start listening to the "render-base-layer" event, fired from within the game
        // loop, and execute the render() function when it occurs, drawing the text onto
        // the game board in the appropriate position for each cycle of the game loop
        Frogger.observer.subscribe("render-base-layer", render);
    });
}(Frogger));