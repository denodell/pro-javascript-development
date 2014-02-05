var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    direction = {
        UP: "up",
        DOWN: "down",
        LEFT: "left",
        RIGHT: "right"
    };

var Game = (function() {
    var _score = 0,
        _lives = 5,
        _timeRemaining = 60000,
        _timeTotal = _timeRemaining,
        _refreshRate = 50,
        _states = {
            PLAY: 'PLAY'
        },
        _state = _states.PLAY,
        _isPaused = false,
        _isOver = false;

    function countDown() {
        if (_timeRemaining > 0) {
            _timeRemaining -= _refreshRate;
        } else {
            loseLife();
        }
    }

    function gameOver() {
        pause();
        _isOver = true;
    }

    function loseLife() {
        _lives--;
        if (_lives === 0) {
            gameOver();
        } else {
            Cars.pause();
            Logs.pause();
            Frog.loseLife();
            setTimeout(reset, 2000);
        }
    }

    function pause() {
        _isPaused = true;
    }

    function play() {
        _isPaused = false;
    }

    function reset() {
        _timeRemaining = _timeTotal;
        _isOver = false;
        Frog.reset();
        Cars.reset();
        Logs.reset();

        play();
    }

    return {
        start: function() {
            setInterval(function() {
                if (!_isPaused) {
                    countDown();

                    GameBoard.render();

                    Rows.render();
                    if (Rows.isCollision()) {
                        loseLife();
                    }

                    Frog.render();
                }
            }, _refreshRate);
        },

        getScore: function() {
            return _score;
        },

        getState: function() {
            return _state;
        },

        states: _states,

        isState: function(state) {
            return _state === state;
        },

        getLives: function() {
            return _lives;
        },

        getTimeRemainingAsPercentage: function() {
            return _timeRemaining / _timeTotal;
        },

        reset: reset,

        loseLife: loseLife,

        getIsPaused: function() {
            return _isPaused;
        },

        getIsOver: function() {
            return _isOver;
        }
    };
}());