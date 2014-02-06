var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    direction = {
        UP: "up",
        DOWN: "down",
        LEFT: "left",
        RIGHT: "right"
    },
    observer = (function() {
        var events = {};

        return {

            subscribe: function(eventName, callback) {

                if (!events.hasOwnProperty(eventName)) {
                    events[eventName] = [];
                }

                events[eventName].push(callback);
            },

            unsubscribe: function(eventName, callback) {
                var index = 0,
                    length = 0;

                if (events.hasOwnProperty(eventName)) {
                    length = events[eventName].length;

                    for (; index < length; index++) {
                        if (events[eventName][index] === callback) {
                            events[eventName].splice(index, 1);
                            break;
                        }
                    }
                }
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
    }());

var Game = (function() {
    var _score = 0,
        _highScore = 0,
        _lives = 5,
        _timeRemaining = 60000,
        _timeTotal = _timeRemaining,
        _refreshRate = 50,
        _frogsInHome = 0,
        _states = {
            PLAY: 'PLAY'
        },
        _state = _states.PLAY,
        _isPaused = false,
        _isOver = false;

    observer.subscribe("frog-at-home", function() {
        _score += 1000;
        if (_score > _highScore) {
            _highScore = _score;
        }
        _frogsInHome++;
        pause();
        if (_frogsInHome <= 5) {
            setTimeout(reset, 2000);
        } else {
            gameWon();
        }
    });

    observer.subscribe("frog-moved", function() {
        _score += 20;
        if (_score > _highScore) {
            _highScore = _score;
        }
    });

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

    function gameWon() {
        observer.publish("game-won");
    }

    function loseLife() {
        pause();
        _lives--;
        Rows.pause();
        Frog.loseLife();

        if (_lives === 0) {
            gameOver();
        } else {
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
        Rows.reset();
        Frog.reset();

        play();
    }

    return {
        start: function() {
            setInterval(function() {
                if (!_isPaused) {
                    countDown();

                    if (Rows.isCollision()) {
                        loseLife();
                    }

                    GameBoard.render();
                    Rows.render();
                    Frog.render();
                    TextLayer.render();
                }
            }, _refreshRate);
        },

        getScore: function() {
            return _score;
        },

        getHighScore: function() {
            return _highScore;
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

        win: function() {
            _score = _score + 100;
        },

        getIsOver: function() {
            return _isOver;
        }
    };
}());