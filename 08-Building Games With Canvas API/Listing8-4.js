var GameBoard = (function() {
    var background = document.createElement("img"),
        lives = document.createElement("img"),
        livesPattern,
        isReady = false,
        rows = 15,
        columns = 12,
        gridSquare = {
            width: 80,
            height: 80
        };

    background.onload = function() {
        isReady = true;
    };
    background.src = "gameboard.gif";

    lives.onload = function() {
        livesPattern = context.createPattern(lives, "repeat");
    };
    lives.src = "lives.png";

    function renderBackground() {
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
    }

    function renderLives() {
        context.save();

        context.translate(0, GameBoard.getRowPosition(15));
        context.fillStyle = livesPattern;
        context.fillRect(0, 0, 36 * Game.getLives(), 42);

        context.restore();
    }

    function renderTimeRemaining() {
        var timeRemainingAsPercentage = Game.getTimeRemainingAsPercentage();

        context.save();

        context.fillStyle = "#21DE00";
        context.fillRect((1 - timeRemainingAsPercentage) * 10 * gridSquare.width, 15.5 * gridSquare.height, timeRemainingAsPercentage * 10 * gridSquare.width, gridSquare.height / 2);

        context.restore();
    }

    return {
        render: function() {
            if (isReady) {
                renderBackground();
                renderLives();
                renderTimeRemaining();
            }
        },

        getRowPosition: function(row) {
            return row * gridSquare.height;
        },

        getColumnPosition: function(column) {
            return column * gridSquare.width;
        },

        getGridSize: function() {
            return gridSquare;
        },

        getColumnCount: function() {
            return columns;
        },

        getCharacterBounds: function() {
            return {
                left: 0,
                right: (columns - 1) * gridSquare.width,
                top: 2 * gridSquare.height,
                bottom: 14 * gridSquare.height
            };
        }
    };
}());

var TextLayer = (function() {
    var font = "67px Arcade Classic",
        gridHeight = 80,
        gameIsWon = false;

    observer.subscribe("game-won", function() {
        gameIsWon = true;
    });

    function renderScore() {
        context.save();
        context.textAlign = "end";

        context.font = font;
        context.fillStyle = "#DEDEF7";
        context.fillText("1-UP", GameBoard.getColumnPosition(3), gridHeight / 2);

        context.fillStyle = "#F00";
        context.fillText(Game.getScore(), GameBoard.getColumnPosition(3), gridHeight);

        context.fillStyle = "#DEDEF7";
        context.fillText("HI-SCORE", GameBoard.getColumnPosition(8), gridHeight / 2);

        context.fillStyle = "#F00";
        context.fillText(Game.getHighScore(), GameBoard.getColumnPosition(7.5), gridHeight);
        context.restore();
    }

    function renderGameOver() {
        context.save();

        context.font = font;
        context.fillStyle = "#DEDEF7";
        context.textAlign = "center";
        context.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

        context.restore();
    }

    function renderGameIsWon() {
        context.save();

        context.font = font;
        context.fillStyle = "#F00";
        context.textAlign = "center";
        context.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2);

        context.restore();
    }

    function renderTimeLabel() {
        context.save();
        context.textAlign = "end";

        context.font = font;
        context.fillStyle = "#FF0";
        context.fillText("TIME", canvas.width, canvas.height);

        context.restore();
    }

    return {
        render: function() {
            renderScore();
            renderTimeLabel();

            if (Game.getIsOver()) {
                renderGameOver();
            }

            if (gameIsWon) {
                renderGameIsWon();
            }
        }
    };
}());