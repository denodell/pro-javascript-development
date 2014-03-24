// Define a code module to define the parameters of the game board itself, the number of
// rows and columns within the grid, along with their relative positions in pixels, and
// the bounds within which the player's character may move
(function(Frogger) {

    // Define the width and height of each square on the game board grid, in pixels. The
    // game board is divided into rows with different obstacles on each, and columns within
    // which the player's character can move
    var _grid = {
            width: 80,
            height: 80
        },

        // Define the number of rows on the game board. The top two rows contain the score,
        // the next two contain the home base the player is attempting to reach. There then
        // follow five rows of water-based obstacles before reaching a 'safe' row where the
        // player's character may take refuge without obstacles. There then follow five rows
        // of road-based obstacles before another 'safe' row, which is where the player's
        // character starts its game from. The final row holds the remaining time and number
        // of lives remaining. There are 17 rows, therefore, though since we start counting
        // rows at position 0, the total number of rows is said to be 16 using the grid
        // square defined previously
        _numRows = 16,

        // Define the number of columns on the game board, from left to right, based on the
        // game board grid defined previously. The total number of columns is 12 but since
        // we count position 0 as a column, we represent the number as 11 instead
        _numColumns = 11,

        // Define the limits of movement of the player's character on the game board in
        // pixels, returning the left-, right-, top- and bottom-most positions the
        // character can be placed. This is to ensure the player is not able to move
        // their character onto the parts of the game board that show the score, the time
        // remaining, etc.
        _characterBounds = {
            left: 0,
            right: _numColumns * _grid.width,
            top: 2 * _grid.height,
            bottom: (_numRows - 2) * _grid.height
        },

        // Define an array containing the pixel positions of each of the 17 rows as
        // measured from the left-most edge of the game board - each is essentially a
        // multiple of the grid width. This allows easy access to pixel positions by
        // row number.
        _rows = (function() {
            var output = [],
                index = 0,
                length = _numRows;

            for (; index < length; index++) {
                output.push(index * _grid.width);
            }

            return output;
        }()),

        // Define an array containing the pixel positions of each of the 12 columns as
        // measured from the top-most edge of the game board - each is essentially a
        // multiple of the grid height. This allows easy access to pixel positions by
        // column number.
        _columns = (function() {
            var output = [],
                index = 0,
                length = _numColumns;

            for (; index < length; index++) {
                output.push(index * _grid.height);
            }

            return output;
        }());

    // Listen for the "game-load" event, which will be fired once all our code modules
    // are configured
    Frogger.observer.subscribe("game-load", function() {

        // Publish the "game-board-initialize" event, passing along relevant information
        // about the game board for other code modules to use to ensure they draw their
        // images to the correct place on the board, and allow the character to only
        // move between certain limits as defined in this code module
        Frogger.observer.publish("game-board-initialize", {

            // Pass across the number of rows and columns the board consists of
            numRows: _numRows,
            numColumns: _numColumns,

            // Pass across arrays representing the pixel positions of each of the rows
            // and columns on the board to simplify the drawing of images onto the <canvas>
            // element in the correct place
            rows: _rows,
            columns: _columns,

            // Pass across the width and height of each grid square on the game board
            grid: {
                width: _grid.width,
                height: _grid.height
            },

            // Pass across the object containing the left, right, top and bottom positions
            // in pixels which the player's character is allowed to move within on the
            // game board
            characterBounds: _characterBounds
        });
    });
}(Frogger));