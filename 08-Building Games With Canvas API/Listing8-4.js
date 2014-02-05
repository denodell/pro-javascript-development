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
        },
        font = "67px Arcade Classic";

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

    function renderScore() {
        context.save();
        context.textAlign = "end";

        context.font = font;
        context.fillStyle = "#DEDEF7";
        context.fillText("1-UP", 256, 40);

        context.fillStyle = "#F00";
        context.fillText("00000", 256, 80);

        context.fillStyle = "#DEDEF7";
        context.fillText("HI-SCORE", 576, 40);

        context.fillStyle = "#F00";
        context.fillText("00000", 512, 80);
        context.restore();
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
        context.textAlign = "end";

        context.font = font;
        context.fillStyle = "#FF0";
        context.fillText("TIME", canvas.width, canvas.height);

        context.fillStyle = "#21DE00";
        context.fillRect((1 - timeRemainingAsPercentage) * 10 * gridSquare.width, 15.5 * gridSquare.height, timeRemainingAsPercentage * 10 * gridSquare.width, gridSquare.height / 2);

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

    return {
        render: function() {
            if (isReady) {
                renderBackground();

                renderScore();
                renderTimeRemaining();
                renderLives();

                if (Game.getIsOver()) {
                    renderGameOver();
                }
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