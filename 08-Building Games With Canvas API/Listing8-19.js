// Define a code module to add rows containing obstacles to the game board for the player
// to avoid or make contact with in order to progress from the bottom to the top of the
// game board in order to win the game by reaching each of the five goals without losing
// all their lives or the allocated time running out
(function(Frogger) {

    // Define variables to store the populated rows on the game board, and the properties
    // and settings of the game board itself
    var _rows = [],
        _gameBoard = {};

    // Define a function to be called when the game board has initialized onto which we
    // place our rows and obstacles
    function initialize(gameBoard) {
        _gameBoard = gameBoard;

        // Add elevent rows of obstacles to the game board
        _rows = [

            // Add a goal row to the 3rd row on the game board (the rows start from index
            // 0), containing five goals positioned in the respective places according to
            // the designation on the game board background image
            new Frogger.Row.Goal({
                top: _gameBoard.rows[2],
                obstacles: [new Frogger.Image.Goal(33, 111), new Frogger.Image.Goal(237, 315), new Frogger.Image.Goal(441, 519), new Frogger.Image.Goal(645, 723), new Frogger.Image.Goal(849, 927)]
            }),

            // Add a row of medium-length logs to the 4th row on the game board, moving
            // right at a rate of 5 pixels per each time the game loop is called to
            // render this row within the <canvas>
            new Frogger.Row.Log({
                top: _gameBoard.rows[3],
                direction: Frogger.direction.RIGHT,
                speed: 5,

                // Add three medium-sized log obstacles to the game board, spaced out evenly
                obstacles: [new Frogger.Image.MediumLog(_gameBoard.columns[1]), new Frogger.Image.MediumLog(_gameBoard.columns[6]), new Frogger.Image.MediumLog(_gameBoard.columns[10])]
            }),

            // Add a row of turtles, grouped in twos, on the 5th row of the game board,
            // moving left (the default direction) at a rate of 6 pixels on each turn of the
            // game loop
            new Frogger.Row.Turtle({
                top: _gameBoard.rows[4],
                speed: 6,

                // Add four obstacles spaced out across the width of the game board
                obstacles: [new Frogger.Image.TwoTurtles(_gameBoard.columns[0]), new Frogger.Image.TwoTurtles(_gameBoard.columns[3]), new Frogger.Image.TwoTurtles(_gameBoard.columns[6]), new Frogger.Image.TwoTurtles(_gameBoard.columns[9])]
            }),

            // Add a row of long-length logs to the 6th row on the game board, moving right
            // at a rate of 7 pixels on each turn of the game loop
            new Frogger.Row.Log({
                top: _gameBoard.rows[5],
                direction: Frogger.direction.RIGHT,
                speed: 7,

                // Add two long-length log obstacles to this row
                obstacles: [new Frogger.Image.LongLog(_gameBoard.columns[1]), new Frogger.Image.LongLog(_gameBoard.columns[10])]
            }),

            // Add a row of short-length logs to the 7th row of the game board, moving right
            // at a rate of 3 pixels each time the game loop is called
            new Frogger.Row.Log({
                top: _gameBoard.rows[6],
                direction: Frogger.direction.RIGHT,
                speed: 3,

                // Add three short-length logs to this row
                obstacles: [new Frogger.Image.ShortLog(_gameBoard.columns[1]), new Frogger.Image.ShortLog(_gameBoard.columns[6]), new Frogger.Image.ShortLog(_gameBoard.columns[10])]
            }),

            // Add a row of turtles, grouped in threes, on the 8th row of the game board,
            // moving left at a rate of 5 pixels each time the game loop is called
            new Frogger.Row.Turtle({
                top: _gameBoard.rows[7],
                speed: 5,
                obstacles: [new Frogger.Image.ThreeTurtles(_gameBoard.columns[0]), new Frogger.Image.ThreeTurtles(_gameBoard.columns[3]), new Frogger.Image.ThreeTurtles(_gameBoard.columns[7]), new Frogger.Image.ThreeTurtles(_gameBoard.columns[10])]
            }),

            // Add a set of truck-style vehicle obstacles to the 10th row of the game
            // board (the 9th row is considered a "safe" row that contains no obstacles)
            new Frogger.Row.Road({
                top: _gameBoard.rows[9],
                speed: 3,
                obstacles: [new Frogger.Image.Truck(_gameBoard.columns[1]), new Frogger.Image.Truck(_gameBoard.columns[7])]
            }),

            // Add a set of turbo race car obstacles to the 11th row of the game board,
            // moving right at a fast rate
            new Frogger.Row.Road({
                top: _gameBoard.rows[10],
                direction: Frogger.direction.RIGHT,
                speed: 12,
                obstacles: [new Frogger.Image.TurboRaceCar(_gameBoard.columns[1]), new Frogger.Image.TurboRaceCar(_gameBoard.columns[7])]
            }),

            // Add a set of simple road car obstacles to the 12th row of the game board
            new Frogger.Row.Road({
                top: _gameBoard.rows[11],
                speed: 4,
                obstacles: [new Frogger.Image.RoadCar(_gameBoard.columns[1]), new Frogger.Image.RoadCar(_gameBoard.columns[7])]
            }),

            // Add a set of bulldozer-style obstacles to the 13th row of the game board
            new Frogger.Row.Road({
                top: _gameBoard.rows[12],
                direction: Frogger.direction.RIGHT,
                speed: 3,
                obstacles: [new Frogger.Image.Bulldozer(_gameBoard.columns[1]), new Frogger.Image.Bulldozer(_gameBoard.columns[7])]
            }),

            // Add a set of race car obstacles to the 14th row of the game board, which is
            // one row above where the player's character's starting position is
            new Frogger.Row.Road({
                top: _gameBoard.rows[13],
                speed: 4,
                obstacles: [new Frogger.Image.RaceCar(_gameBoard.columns[2]), new Frogger.Image.RaceCar(_gameBoard.columns[6])]
            })
        ];

        // With the rows and obstacles initialized, connect the local render() function to
        // the "render-base-layer" event fired from within the game loop to draw those
        // obstacles onto the game board
        Frogger.observer.subscribe("render-base-layer", render);
    }

    // Define a function to render each of the defined rows of obstacles onto the game board
    function render() {
        var row,
            index = 0,
            length = _rows.length;

        // Loop through each row calling its render() method, which in turn calls the
        // render() method of each of the obstacles stored within it
        for (; index < length; index++) {
            row = _rows[index];
            row.render();
        }
    }

    // Define a function to detect whether a collision has occured between the player's
    // character and the obstacles within each row
    function isCollision() {
        var collided = false,
            row,
            index = 0,
            length = _rows.length;

        // Loop through each row calling its isCollision() method, which determines
        // whether the obstacles on that row come into contact with the player's
        // character on the game board
        for (; index < length; index++) {
            row = _rows[index];

            if (Frogger.Character.getTop() === row.getTop()) {
                collided = row.isCollision(Frogger.Character.getPosition());
                if (collided) {
                    break;
                }
            }
        }

        // If a collision has occured, trigger the "collision" event which the game logic
        // module uses to cause the player to lose a life
        if (collided) {
            Frogger.observer.publish("collision");
        }

        return collided;
    }

    // Define a function to reset each of the rows to reset to their initial state
    function reset() {
        var row;

        // Loop through each row calling its reset() method, which in turn calls the
        // reset() method of each of the obstacles within that row
        for (var index = 0, length = _rows.length; index < length; index++) {
            row = _rows[index];
            row.reset();
        }
    }

    // When the game logic wishes the game board to reset, call the local reset() function
    Frogger.observer.subscribe("reset", reset);

    // When the game loop wishes to check for collisions, call the local isCollision()
    // function, which will fire a "collision" event if a collision occurs
    Frogger.observer.subscribe("check-collisions", isCollision);

    // When the game board has initialized its properties and settings, call the local
    // initialize() function to place the rows and obstacles onto the game board
    Frogger.observer.subscribe("game-board-initialize", initialize);
}(Frogger));