var Frog = (function() {
    var currentDirection = direction.UP,
        characterSprite = new Image(),
        spriteWidth = 80,
        spriteHeight = 80,
        gridSize = GameBoard.getGridSize(),
        gridWidth = gridSize.width,
        gridHeight = gridSize.height,
        animFrame = 0,
        animFrameRate = 150,
        startPosition = {
            left: GameBoard.getColumnPosition(6),
            top: GameBoard.getRowPosition(14)
        },
        currentPosition = {
            left: startPosition.left,
            top: startPosition.top
        },
        sprites = {},
        _isDead = false;

    sprites[direction.UP] = [{
        left: 0,
        top: 0
    }, {
        left: spriteWidth,
        top: 0
    }];

    sprites[direction.RIGHT] = [{
        left: 2 * spriteWidth,
        top: 0
    }, {
        left: 3 * spriteWidth,
        top: 0
    }];

    sprites[direction.DOWN] = [{
        left: 4 * spriteWidth,
        top: 0
    }, {
        left: 5 * spriteWidth,
        top: 0
    }];

    sprites[direction.LEFT] = [{
        left: 6 * spriteWidth,
        top: 0
    }, {
        left: 7 * spriteWidth,
        top: 0
    }];

    sprites["DEAD"] = [{
        left: 8 * spriteWidth,
        top: 0
    }, {
        left: 9 * spriteWidth,
        top: 0
    }, {
        left: 10 * spriteWidth,
        top: 0
    }];

    characterSprite.src = "frog.gif";

    (function gameControl(window) {
        var LEFT_ARROW = 37,
            UP_ARROW = 38,
            RIGHT_ARROW = 39,
            DOWN_ARROW = 40;

        window.addEventListener("keydown", function(e) {
            if (e.keyCode === LEFT_ARROW) {
                Frog.move(direction.LEFT);
            } else if (e.keyCode === UP_ARROW) {
                Frog.move(direction.UP);
            } else if (e.keyCode === RIGHT_ARROW) {
                Frog.move(direction.RIGHT);
            } else if (e.keyCode === DOWN_ARROW) {
                Frog.move(direction.DOWN);
            }
        }, false);
    }(window));

    return {
        move: function(moveDirection) {
            if (!_isDead) {
                currentDirection = moveDirection;

                if (currentDirection === direction.LEFT) {
                    currentPosition.left -= gridWidth;
                } else if (currentDirection === direction.RIGHT) {
                    currentPosition.left += gridWidth;
                } else if (currentDirection === direction.UP) {
                    currentPosition.top -= gridHeight;
                } else if (currentDirection === direction.DOWN) {
                    currentPosition.top += gridHeight;
                }

                if (currentPosition.left <= GameBoard.getCharacterBounds().left) {
                    currentPosition.left = GameBoard.getCharacterBounds().left;
                } else if (currentPosition.left >= GameBoard.getCharacterBounds().right) {
                    currentPosition.left = GameBoard.getCharacterBounds().right;
                }

                if (currentPosition.top >= GameBoard.getCharacterBounds().bottom) {
                    currentPosition.top = GameBoard.getCharacterBounds().bottom;
                } else if (currentPosition.top <= GameBoard.getCharacterBounds().top) {
                    currentPosition.top = GameBoard.getCharacterBounds().top;
                }

                animFrame = 1;
                setTimeout(function() {
                    animFrame = 0;
                }, animFrameRate);
            }
        },

        reset: function() {
            currentPosition.left = startPosition.left;
            currentPosition.top = startPosition.top;
            currentDirection = direction.UP;
            animFrame = 0;
            _isDead = false;
        },

        render: function() {
            var sprite;

            if (!_isDead) {
                sprite = sprites[currentDirection][animFrame];

                context.drawImage(characterSprite, sprite.left, sprite.top, spriteWidth, spriteHeight, currentPosition.left, currentPosition.top, spriteWidth, spriteHeight);
            } else {
                animFrame++;
                if (animFrame < sprites["DEAD"].length) {
                    context.drawImage(characterSprite, sprites["DEAD"][animFrame].left, sprites["DEAD"][animFrame].top, spriteWidth, spriteHeight, currentPosition.left, currentPosition.top, spriteWidth, spriteHeight);
                }
            }
        },

        getRow: function() {
            return currentPosition.top / gridHeight;
        },

        setPosition: function(left) {
            currentPosition.left = left;
        },

        getLeft: function() {
            return currentPosition.left;
        },

        getPosition: function() {
            var left = currentPosition.left + (spriteWidth / 4);

            return {
                left: left,
                right: left + (spriteWidth / 2)
            };
        },

        loseLife: function() {
            _isDead = true;
        }
    };
}());