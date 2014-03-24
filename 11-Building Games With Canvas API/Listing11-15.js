// Define a code module to draw the game board background image to the background <canvas>
// element. We will draw the image once only since it is static and will not change - all
// graphical elements that could change are drawn to the main <canvas> element instead.
(function(Frogger) {

    // To draw an image file onto the <canvas> we need to create a new <img> element to
    // contain the image first
    var _background = document.createElement("img");

    // Once the image has loaded, draw the image onto the background <canvas> element's
    // drawing surface, starting at the top-left corner and covering the full width and
    // height of the drawing surface
    _background.addEventListener("load", function() {
        Frogger.backgroundDrawingSurface.drawImage(_background, 0, 0, Frogger.drawingSurfaceWidth, Frogger.drawingSurfaceHeight);
    }, false);

    // Setting the "src" attribute of the <img> causes the file to load immediately, which
    // is why it was essential to configure our "load" event handler first. We load the
    // file named "gameboard.gif" which contains the background of the game board. This
    // will only be drawn once since we are not within the game loop at this point. By
    // splitting the background out into a separate element, we avoid needing to redraw
    // the background each time the game loop executes since it is static.
    _background.src = "gameboard.gif";
}(Frogger));

// Define a code module to show the number of lives the player has remaining, and how much
// time remains before automatically losing a life, within the <canvas> element
(function(Frogger) {

    // Define an array, to be populated later, which will represent the number of lives the
    // player has remaining
    var _lives = [],

        // Define a variable indicating the time remaining on the countdown before the
        // player automatically loses a life, represented as a percentage, starting at
        // 100% and counting down to 0
        _timeRemainingAsPercentage = 100,

        // Define a variable for storing the game board properties and settings
        _gameBoard;

    // Define a subclass of Frogger.ImageSprite to represent the individual image found
    // at position 720px from the left and 80px from the top of the sprite map image which
    // is 40px wide by 40px tall and depicts a small frog to be used to denote a remaining
    // life
    function Life(left, top) {

        // The left and top parameters indicate the starting position of this instance of
        // the Life "class". We pass those parameters directly onto the parent
        // Frogger.ImageSprite() constructor function
        Frogger.ImageSprite.call(this, left, top);
    }

    // Inherit properties and methods from the Frogger.ImageSprite "class"
    Life.prototype = new Frogger.ImageSprite();
    Life.prototype.constructor = Life;

    // Set the dimensions and location of the remaining life image from within the larger
    // sprite map image file
    Life.prototype.spriteLeft = 720;
    Life.prototype.spriteTop = 80;
    Life.prototype.width = 40;
    Life.prototype.height = 40;

    // Define a function to be executed when the game board has initialized, passing along
    // the properties and settings from the game board code module
    function initialize(gameBoard) {

        // Define a variable representing the position from the top of the game board
        // to display the remaining lives
        var lifePositionTop;

        // Store the game board properties and settings in a local variable within this
        // code module
        _gameBoard = gameBoard;

        // Set the lifePositionTop variable to the appropriate position in the bottom-left
        // corner of the game board
        lifePositionTop = (_gameBoard.numRows - 1) * _gameBoard.grid.height;

        // Define five lives for the player by populating the _lives array with five
        // instances of the Life "class", each one initialized with its starting position
        // from left to right along the bottom-left corner of the game board
        _lives = [

            // Each life is displayed at the same position from the top of the game board
            // and each spaced horizontally according to the width of the individual
            // image so they sit right beside each other
            new Life(0, lifePositionTop),
            new Life(1 * Life.prototype.width, lifePositionTop),
            new Life(2 * Life.prototype.width, lifePositionTop),
            new Life(3 * Life.prototype.width, lifePositionTop),
            new Life(4 * Life.prototype.width, lifePositionTop)
        ];

        // Listen for the "render-base-layer" event fired from within the game loop and
        // execute the render() function, defined further down, when it is called
        Frogger.observer.subscribe("render-base-layer", render);
    }

    // Define a function to render the number of lives remaining on the game board
    function renderLives() {
        var index = 0,
            length = _lives.length,
            life;

        // Loop through the number of remaining lives stored in the _lives array, and
        // call the renderAt() method of each of the Life "class" instances contained
        // within, drawing the life on the game board at the appropriate position
        for (; index < length; index++) {
            life = _lives[index];

            life.renderAt(life.left, life.top);
        }
    }

    // Define a function to render the time remaining as a green rectangular bar along the
    // bottom edge of the game board
    function renderTimeRemaining() {

        // Define the width of the rectangle. When full, this will be the width of 10
        // columns on the game board. As the time remaining decreases, the width will
        // decrease accordingly
        var rectangleWidth = _timeRemainingAsPercentage * _gameBoard.rows[10],

            // Define the height of the rectangle, which will always be half of one grid
            // square on the game board
            rectangleHeight = _gameBoard.grid.height / 2,

            // Define the left-hand edge, in pixels, where the rectangle should be drawn
            // from on the <canvas>. Since the countdown should appear to be decreasing
            // from the left to the right, this will be the inverse of the time remaining
            // percentage, multiplied by the full width of the rectangle
            rectangleLeft = (1 - _timeRemainingAsPercentage) * _gameBoard.rows[10],

            // Define the top edge, in pixels, where the rectangle should be drawn from
            // on the <canvas> element. This will be the bottom edge of the game board so
            // we need to subtract the desired height of the rectangle from the height
            // of the game board itself
            rectangleTop = Frogger.drawingSurfaceHeight - rectangleHeight;

        // Set the drawing context to draw in green (hex color #0F0)
        Frogger.drawingSurface.fillStyle = "#0F0";

        // Draw the rectangle on the game board at the given positions
        Frogger.drawingSurface.fillRect(rectangleLeft, rectangleTop, rectangleWidth, rectangleHeight);
    }

    // Define a function to draw the remaining lives and time remaining on the game board,
    // executed when the "render-base-layer" event is fired from within the game loop
    function render() {
        renderLives();
        renderTimeRemaining();
    }

    // When the game logic module informs us that the player has lost a life, we remove
    // the last entry from the _lives array, which removes the right-most life image from
    // the bottom-left corner of the canvas, indicating the correct number of lives
    // remaining
    Frogger.observer.subscribe("player-lost-life", function() {
        _lives.pop();
    });

    // When the game logic module informs us that the time remaining for the player to
    // reach the goal has changed, we store the new value returned as a percentage
    Frogger.observer.subscribe("time-remaining-change", function(newTimeRemainingPercentage) {
        _timeRemainingAsPercentage = newTimeRemainingPercentage;
    });

    // When the game board initializes its properties and settings, execute the
    // initialize() function
    Frogger.observer.subscribe("game-board-initialize", initialize);
}(Frogger));