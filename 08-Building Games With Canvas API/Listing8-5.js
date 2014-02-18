var GameBoard = (function() {
    var bgCanvas = document.getElementById("background-canvas"),
        bgContext = bgCanvas.getContext("2d"),
        background = document.createElement("img"),
        lives,
        rows = 15,
        columns = 12,
        gridSquare = {
            width: 80,
            height: 80
        },
        _timeRemainingAsPercentage = 100;

    function Life(left, top) {
        Frogger.ImageSprite.call(this, left, top);
    }

    Life.prototype = new Frogger.ImageSprite();
    Life.prototype.spriteLeft = 720;
    Life.prototype.spriteTop = 80;
    Life.prototype.width = 40;
    Life.prototype.height = 40;

    lives = [new Life(0, rows * gridSquare.height), new Life(40, rows * gridSquare.height), new Life(80, rows * gridSquare.height), new Life(120, rows * gridSquare.height), new Life(160, rows * gridSquare.height)];

    background.onload = function() {
        bgContext.drawImage(background, 0, 0, bgCanvas.width, bgCanvas.height);
    };
    background.src = "gameboard.gif";

    Frogger.observer.subscribe("player-lost-life", function() {
        lives.pop();
    });

    Frogger.observer.subscribe("time-remaining-change", function(newTimeRemainingPercentage) {
        _timeRemainingAsPercentage = newTimeRemainingPercentage;
    });

    function renderLives() {
        var index = 0,
            length = lives.length,
            life;

        for (; index < length; index++) {
            life = lives[index];

            life.renderAt(life.left, life.top);
        }
    }

    function renderTimeRemaining() {
        Frogger.drawingSurface.save();

        Frogger.drawingSurface.fillStyle = "#21DE00";
        Frogger.drawingSurface.fillRect((1 - _timeRemainingAsPercentage) * 10 * gridSquare.width, 15.5 * gridSquare.height, _timeRemainingAsPercentage * 10 * gridSquare.width, gridSquare.height / 2);

        Frogger.drawingSurface.restore();
    }

    function intersects(position1, position2) {
        var doesIntersect = false;

        if ((position1.left > position2.left && position1.left < position2.right) ||
            (position1.right > position2.left && position1.left < position2.right)) {
            doesIntersect = true;
        }

        return doesIntersect;
    }

    function render() {
        renderLives();
        renderTimeRemaining();
    }

    Frogger.observer.subscribe("render-base-layer", render);

    return {
        render: render,

        getRowPosition: function(row) {
            return row * gridSquare.height;
        },

        getColumnPosition: function(column) {
            return column * gridSquare.width;
        },

        getGridSize: function() {
            return gridSquare;
        },

        getCharacterBounds: function() {
            return {
                left: 0,
                right: (columns - 1) * gridSquare.width,
                top: 2 * gridSquare.height,
                bottom: 14 * gridSquare.height
            };
        },

        intersects: intersects
    };
}());

// Text Layer
(function() {
    var font = "67px Arcade Classic",
        gridHeight = 80,
        gameIsWon = false,
        gameOver = false,
        _score = 0,
        _highScore = 0;

    Frogger.observer.subscribe("game-won", function() {
        gameIsWon = true;
    });

    Frogger.observer.subscribe("game-over", function() {
        gameOver = true;
    });

    Frogger.observer.subscribe("reset", function() {
        gameOver = false;
        gameIsWon = false;
    });

    Frogger.observer.subscribe("score-change", function(newScore) {
        _score = newScore;
    });

    Frogger.observer.subscribe("high-score-change", function(newHighScore) {
        _highScore = newHighScore;
    });

    function renderScore() {
        Frogger.drawingSurface.save();
        Frogger.drawingSurface.textAlign = "end";

        Frogger.drawingSurface.font = font;
        Frogger.drawingSurface.fillStyle = "#DEDEF7";
        Frogger.drawingSurface.fillText("1-UP", GameBoard.getColumnPosition(3), gridHeight / 2);

        Frogger.drawingSurface.fillStyle = "#F00";
        Frogger.drawingSurface.fillText(_score, GameBoard.getColumnPosition(3), gridHeight);

        Frogger.drawingSurface.fillStyle = "#DEDEF7";
        Frogger.drawingSurface.fillText("HI-SCORE", GameBoard.getColumnPosition(8), gridHeight / 2);

        Frogger.drawingSurface.fillStyle = "#F00";
        Frogger.drawingSurface.fillText(_highScore, GameBoard.getColumnPosition(7.5), gridHeight);
        Frogger.drawingSurface.restore();
    }

    function renderGameOver() {
        Frogger.drawingSurface.save();

        Frogger.drawingSurface.font = font;
        Frogger.drawingSurface.fillStyle = "#DEDEF7";
        Frogger.drawingSurface.textAlign = "center";
        Frogger.drawingSurface.fillText("GAME OVER", canvas.width / 2, GameBoard.getRowPosition(9));

        Frogger.drawingSurface.restore();
    }

    function renderGameIsWon() {
        Frogger.drawingSurface.save();

        Frogger.drawingSurface.font = font;
        Frogger.drawingSurface.fillStyle = "#F00";
        Frogger.drawingSurface.textAlign = "center";
        Frogger.drawingSurface.fillText("YOU WIN!", canvas.width / 2, GameBoard.getRowPosition(9));

        Frogger.drawingSurface.restore();
    }

    function renderTimeLabel() {
        Frogger.drawingSurface.save();
        Frogger.drawingSurface.textAlign = "end";

        Frogger.drawingSurface.font = font;
        Frogger.drawingSurface.fillStyle = "#FF0";
        Frogger.drawingSurface.fillText("TIME", canvas.width, canvas.height);

        Frogger.drawingSurface.restore();
    }

    function render() {
        renderScore();
        renderTimeLabel();

        if (gameOver) {
            renderGameOver();
        }

        if (gameIsWon) {
            renderGameIsWon();
        }
    }

    Frogger.observer.subscribe("render-base-layer", render);
}());